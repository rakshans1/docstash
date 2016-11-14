import async from 'async';
import mega from 'mega';

//this backend will be used if *all* of these env 'vars' are present
exports.vars = ["MEGA_EMAIL", "MEGA_PASS"];

let storage = null;

//if these 'vars' are present, 'init' will be called on module load
exports.init = function(config) {
    storage = mega({
        email: config.mega.MEGA_EMAIL,
        password: config.mega.MEGA_PASS
    }, function(err) {
        if (err) {
            console.log("Mega login failed: %s", err);
            process.exit(1);
        }
        console.log("Mega login success");
    });
};

//upload will be called to upload a downloading torrent file
exports.upload = function(stream, dir, name, length, drive, callback) {
        if (dir === undefined) dir = storage.root;
        var upload = storage.upload({name: name, size: length, target: dir});

        stream.pipe(upload);

        upload.on("error", function(err) {
            callback(err);
        });

        //callback when stream has been fully uploaded
        upload.on("complete", function(f) {
            console.log("uploaded", f.name);
            callback(null);
        });
};
//Get file from backend
exports.get = (fileName, done) => {
  var dir = storage.root;
  var f = null;
  for (var i = 0; i < dir.children.length; i++) {
      var c = dir.children[i];
      if (c.name === fileName) {
          f = c;
          break;
      }
  }
  if (!f)
      return done("Missing");

  var dl = f.download()
  done(null, dl);
}
//list will be called to list all stored files
exports.list = function(torrent, callback) {
    // storage.reload(function(err) {
    //     if (err)
    //         return callback("Mega list-dir failed: " + err);
    //
    //     var fetches = [];
    //     var files = [];
    //
    //     eachFile(done);
    //
    //     function done(f) {
    //         if (torrent && f.nodeId === 'Fg9HiKiQ'){
    //           return eachFile(done)
    //         }
    //         if (f.directory){
    //           return;
    //         }
    //         var path = getPath(f);
    //         var tcldFile = {
    //             name: path
    //         };
    //         fetches.push(function fetchUrl(cb) {
    //             f.link(function(err, url) {
    //                 if (err)
    //                     return cb(err);
    //                 tcldFile.url = url;
    //                 cb(null);
    //             });
    //         });
    //         //url is null until it is fetched
    //         files.push(tcldFile);
    //     }
    //
    //     //fetch all links, 6 at a time
    //     async.parallelLimit(fetches, 6, function(err) {
    //         if (err)
    //             return callback("Mega fetch-url failed: " + err);
    //
    //         // console.log("list success", files);
    //         callback(null, files);
    //     });
    // });
};

//removes a file at the given path (torrentFile.path)
exports.remove = function(path, callback) {
  storage.reload(err => {
    if(err) callback('Cant delete file')
    var dir = storage.root;
    var f = null;
    for (var i = 0; i < dir.children.length; i++) {
        var c = dir.children[i];
        if (c.name === path) {
            f = c;
            break;
        }
    }

  if (!f)
      return callback("Missing");
  f.delete(function(err) {
      if (err)
          return callback(err);
      callback(null);
  });
});
};

//========

function eachFile(fn) {
    Object.keys(storage.files).forEach(function(id) {
        var f = storage.files[id];
        fn(f);
    });
}

// function getRoot() {
// }

function getPath(f) {
    var path = "";
    while (f) {
        var name = f.name;
        if (name === "Cloud Drive")
            break;
        if (f.directory)
            name += "/";
        path = name + path;
        f = f.parent;
    }
    return path;
}

exports.mkdir = (dirs, email, torrent, cb) => {
    let parent = null;
    if (torrent) {
      parent = '"Fg9HiKiQ"';
    } else {
      parent = storage.root;
    }
    var d = dirs.shift();
    storage.mkdir({
        name: d,
        target: parent
    }, function(err, dir) {
        if (err)
            return cb(err);
        if (dirs.length > 0) //dont callback yet!
            mkdir(dirs, dir, cb);
        else
            cb(null, dir);
        }
    );
}
