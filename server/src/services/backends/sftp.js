let Client = require('ssh2-sftp-client');
import secret from '../../config/secret';


exports.vars = ["SSH_HOST", "SSH_USERNAME", "SSH_PASSWORD", "SSH_PORT", "SSH_ROOT"];


let sftp = new Client();



exports.init = function() {
const sshOptions = {
  host: secret.ssh.SSH_HOST,
  port: secret.ssh.SSH_PORT,
  username: secret.ssh.SSH_USERNAME,
  password: secret.ssh.SSH_PASSWORD
}
sftp.connect(sshOptions)
  .then(() => console.log("SSH login success"))
  .catch((err) => {
    console.log("SSH login failed: %s", err);
    process.exit(1);
  });

};

//upload will be called to upload a downloading torrent file
exports.upload = function(torrentFile, done) {
	var dirs = torrentFile.path.split("/");
	var name = dirs.length === 1 ? dirs :dirs.pop();
  // eslint-disable-next-line
  var dir = null;
  var root = secret.ssh.SSH_ROOT;

  //call back when all dirs made
  mkdirp(dirs, root, function(err, dir) {
    if(err) return done(err);
    upload(dir);
  });


  //before we can upload, we need to mkdirp
  function mkdirp(dirs, parent, cb) {
    const d = dirs.shift();
    sftp.mkdir(parent + d, true)
      .then((data) => cb(null, parent + d ))
      .catch((err) => cb(err));
  }

  function upload(dir) {
    name = name.length === 0 ? torrentFile.path : name;
		const stream = torrentFile.createReadStream();
		sftp.put(stream, dir +'/'+ name, true)
			.then(() => done())
			.catch((err) => done(err));
	}
};


//list will be called to list all stored files
exports.list = function(done) {
	sftp.list(secret.ssh.SSH_ROOT)
		.then((data) => {
      var files = [];
      data.forEach(f => {
        const tmp = {
          name: f.name
        }
        files.push(tmp);
      });
      done(null, files);
		})
    .catch((err) => {
      if(err) console.log(err);
    });
};


exports.remove = function(path, done) {
  sftp.rmdir(secret.ssh.SSH_ROOT +  path, true)
    .then(() => done(null))
    .catch((err) => done(err));
};
