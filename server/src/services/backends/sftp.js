let Client = require('ssh2-sftp-client');
import secret from '../../config/secret';

exports.vars = ["SSH_HOST", "SSH_USERNAME", "SSH_PASSWORD", "SSH_PORT", "SSH_ROOT"];

let sftp = new Client();

exports.init = function() {
    const sshOptions = {
        host: secret.sftp.SSH_HOST,
        port: secret.sftp.SSH_PORT,
        username: secret.sftp.SSH_USERNAME,
        password: secret.sftp.SSH_PASSWORD
    }
    sftp.connect(sshOptions).then(() => console.log("SSH login success")).catch((err) => {
        console.log("SSH login failed: %s", err);
        process.exit(1);
    });

};

//upload will be called to upload file
exports.upload = (stream, dir, fileName,length, drive , done) => {
    if (dir === undefined) dir =   secret.sftp.SSH_ROOT;
    sftp.put(stream, `${dir}${fileName}`, true).then(() => done()).catch((err) => done(err));
};

//Get file from backend
exports.get = (fileName, done) => {
    const dir = secret.sftp.SSH_ROOT;
    sftp.get(`${dir}${fileName}`, true, null)
    .then((res) => {
      // console.log(res)
      done(null, res)
    })
    .catch((err) => {
      if (err) done("File Not Found");
    });
}
//list will be called to list all stored files
exports.list = (torrent, done) => {
  let parent = null;
    if (torrent) {
      parent = `${secret.sftp.SSH_ROOT}torrents`;
    } else {
      parent = secret.sftp.SSH_ROOT;
    }
    sftp.list(parent).then((data) => {
        var files = [];
        data.forEach(f => {
            const tmp = {
                name: f.name
            }
            files.push(tmp);
        });
        done(null, files);
    }).catch((err) => {
        if (err)
            console.log(err);
        }
    );
};

exports.remove = (path, done) => {
    sftp.rmdir(secret.sftp.SSH_ROOT + path, true).then(() => done(null)).catch((err) => done(err));
};

exports.mkdir = (dir, email, torrent, cb) => {
  let parent = null;
  if (torrent) {
    parent = `${secret.sftp.SSH_ROOT}torrents`;
  } else {
     parent = secret.sftp.SSH_ROOT;
  }
  sftp.mkdir(parent + dir, true).then((data) => cb(null, parent + dir)).catch((err) => cb(err));
}
