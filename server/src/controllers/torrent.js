/* eslint-disable import/default */
import events from 'events';
import async from 'async';
import parse from 'parse-torrent';
import Archive from 'zip-stream';
import request from 'request';
import torrentStream from 'torrent-stream';
import fs from 'fs';
import rm from 'rimraf';
import path from 'path';
import secret from '../config/secret';

import File from '../services/files';
// eslint-disable-next-line
import backend from '../services/backend';

const torrents = new events.EventEmitter();
export default torrents;

torrents.filesDownloading = 0;

let list = torrents.list = [];

//==============
//every second, check the status of all active torrents
setInterval(() => {
    let changed = false;
    let filesDownloading = 0;

    for (let i = 0; i < list.length; i++) {
        let t = list[i];

        if (!t.$engine)
            continue;

        //check torrent speed
        let swarm = t.$engine.swarm;

        let status = {
            down: swarm.downloaded,
            downps: swarm.downloadSpeed(),
            up: swarm.uploaded,
            upps: swarm.uploadSpeed()
        };

        for (let k in status) {
            if (status[k] !== t.status[k]) {
                changed = true;
            }
        }

        if (t.zipping) {
            filesDownloading++;
        }

        //check file status
        t.files.forEach((f) => {
            if (f.uploading) {
                filesDownloading++;
            }
        });
        t.status = status;
    }

    if (torrents.filesDownloading !== filesDownloading) {
        torrents.filesDownloading = filesDownloading;
        changed = true;
    }

    if (changed) {
        torrents.emit("update");
    }
}, 5000);
//==============

const TMP_DIR = path.resolve(secret.TMP_DIR);
const TS_DIR = path.join(TMP_DIR, "torrent");

//=============
//helpers

const findTorrent = (hash) => {
    for (let i = 0; i < list.length; i++) {
        let t = list[i];
        if (t.hash === hash)
            return t;
        }
    return null;
};

const findFile = (torrent, path) => {
    for (let i = 0; i < torrent.files.length; i++) {
        let f = torrent.files[i];
        if (f.path === path)
            return f;
        }
    return null;
}

//========

const load = (t, email, next) => {
    if (!t)
        return next("Invalid Torrent");
    if (!t.infoHash)
        next("Missing Hash");

    let torrent = findTorrent(t.infoHash);
    if (torrent)
        return next("Torrent already exists");
    torrent = {
        email: email,
        $engine: null,
        hash: t.infoHash,
        name: t.name,
        length: null,
        trackers: t.announce,
        magnet: parse.toMagnetURI(t),
        files: [],
        status: {}
    };
    list.push(torrent);
    torrents.emit("update");

    //loaded, now open it
    torrents.open({
        hash: torrent.hash
    }, next);
};

//on start, reopen existing torrents
setTimeout(() => {
    if (!fs.existsSync(TS_DIR))
        return;
    let files = fs.readdirSync(TS_DIR);
    if (!files)
        return;
    files.filter((f) => {
        return /\.torrent$/.test(f);
    }).forEach((f) => {
        const buff = fs.readFileSync(path.join(TS_DIR, f));
        load(parse(buff), (err) => {
            if (!err)
                console.log("Restored torrent", f);
            }
        );
    });
});

torrents.load = (data, next) => {
    if (data.magnet) {
        load(parse(data.magnet), data.email, next);
    } else if (data.torrent) {
        request({
            method: "GET", url: data.torrent, gzip: true, encoding: null //buffer!
        }, (err, res, body) => {
            if (err)
                return next("Invalid Torrent Url");
            let t;
            try {
                t = parse(body);
            } catch (e) {
                return next("Failed to parse torrent");
            }
            load(t, data.email, next);
        });
    } else {
        return next("Invalid request");
    }
};

torrents.open = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent missing");
    if (torrent.$engine)
        return next("Torrent already open");

    //dont wait - open torrent stream, mark openning and callback
    let engine = torrentStream(torrent.magnet, {
        connections: 100,
        uploads: 0, //todo should upload, though it is very cpu/mem eater
        tmp: TMP_DIR,
        verify: true,
        dht: true
    });

    torrent.$engine = engine;
    torrent.openning = true;
    torrents.emit("update");
    next(null);

    engine.on('error', (err) => {
        //todo destroy torrent
        console.log("torrent '%s' error: %s ", torrent.name, err);
    });

    engine.on('ready', () => {
        //overwrite magnet name with real name
        torrent.name = engine.torrent.name;
        torrent.length = engine.torrent.length;
        torrent.files = engine.files.map((f, i) => {
            return new File(f, i, torrent);
        });
        torrent.openning = false;
        torrent.open = true;
        torrents.emit("update");
    });
};

torrents.close = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent Missing");
    if (!torrent.$engine)
        return next("Torrent not open");

    torrent.$engine.destroy(() => {
        //ensuring all files are stopped
        if (torrent.files) {
            torrent.files.forEach((f) => {
                f.cancel();
            });
        }

        torrent.files = null;
        torrent.open = false;
        torrent.$engine = null;
        torrents.emit("update");
        next(null);
    });
};

torrents.remove = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent Missing");
    if (torrent.$engine)
        return next("Torrent still open");
    const i = list.indexOf(torrent);
    list.splice(i, 1);
    torrents.emit("update");

    //clear torrent files and torrent
    rm(path.join(TS_DIR, torrent.hash), (err) => {
        if (err)
            console.log("Failed to delete: %s", torrent.hash);
        }
    );
    rm(path.join(TS_DIR, torrent.hash + ".torrent"), (err) => {
        if (err)
            console.log("Failed to delete: %s.torrent", torrent.hash);
        }
    );
    next(null);
}

torrents.downloadFile = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent Missing");
    const file = findFile(torrent, data.path);
    if (!file)
        return next("File Missing");
    if (file.downloading)
        return next("Already Downloading");

    //callback to front end early since upload can take sometime..
    //front end receives updates via websockets
    next(null);
    file.uploading = true;
    torrents.emit("update");

    var dirs = file.path.split("/");
    var name = dirs.length === 1
        ? dirs
        : dirs.pop();
    var dir = null;
    dir = `${secret.sftp.SSH_ROOT}torrents/`;
    //call back when all dirs made
    // backend.mkdir(dirs, torrent.email, true , (err, dir, drive) => {
        // if (err)
            // return console.error("Backend Error: %s", err);
    //pass copy of file to backend
        upload(dir, name, file, null)
    // });

    function upload(dir, name, file, drive) {
      name = name.length === 0
          ? file.path
          : name;
      var createReadStream = file.createReadStream.bind(file);
      const stream = createReadStream();
      backend.upload(stream, dir, name, file.length, drive, (err) => {
          file.uploading = false;
          //receive result from backend
          if (err && err !== "cancelled") {
              file.downloadError = "Backend Error";
              torrents.emit("update");
              return console.error("Backend Error: %s", err);
          }
          torrents.emit("update");

          //success, now re-list
          backend.list('torrent', (err, files) => {
              if (err)
                  return console.error("Failed to list");
              torrents.emit("update", files);
          });
      });

    }


};

torrents.cancelFile = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent Missing");
    const file = findFile(torrent, data.path);
    if (!file)
        return next("File Missing");
    if (!file.downloading)
        return next("Not Downloading");

    const success = file.cancel();
    next(success
        ? null
        : "Failed to close file");
};

torrents.zipAll = (data, next) => {
    const torrent = findTorrent(data.hash);
    if (!torrent)
        return next("Torrent Missing");
    const files = torrent.files;
    const archive = new Archive();

    archive.on('error', (err) => {
        console.error("Zip error", err);
    });

    async.series(files.map((f, i) => {
        return (cb) => {
            archive.entry(f.createReadStream(), {
                name: f.path
            }, (err) => {
                if (err)
                    return cb(err);
                cb(null);
            });
        };
    }), (err) => {
        if (err) {
            torrent.zipping = false;
            torrents.emit("update");
            return console.error("Zip archive error:", err);
        }
        archive.finish();
    });

    torrent.zipping = true;
    torrents.emit("update");

    //callback to front end since upload take sometime
    //user receive updates via websockets
    next(null);

    //pass zip stream to backend
    backend.upload({
        email: torrent.email,
        path: torrent.name,
        length: files.reduce((len, f) => {
            return len + f.length;
        }, 0),
        createReadStream: () => {
            return archive;
        }
    }, (err) => {
        torrent.zipping = false;
        torrents.emit("update");
        if (err)
            return console.error("Zip upload error: ", err);
        backend.list('torrent', (err, files) => {
            if (err)
                return console.error("Failed To list");
            torrents.emit("update", files);
        });
    });
};

torrents.trash = (data, next) => {
    if (!data.path)
        return next("Path Missing");
    backend.remove(data.path, (err) => {
        if (err)
            return next("Failed to trash:", err);

        backend.list('torrent', (err, files) => {
            if (err)
                return next("Failed to trash", err);
            torrents.emit("update", files);
            next(null);
        });
    });
};
