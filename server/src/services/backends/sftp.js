// import async from 'async';
import {Client} from 'ssh2';
import secret from '../../config/secret';

const conn = new Client();

exports.init = function() {
  const connSetting = {
    host: secret.ssh2.host,
    port: secret.ssh2.port,
    username: secret.ssh2.username,
    password: secret.ssh2.password
  };
  conn.on('ready', (err) => {
    if(err) {
      console.log("ssh2 login failed: %s", err);
      process.exit(1);
    }
    console.log("ssh login success");
  }).connect(connSetting);
};

//upload will be called to upload a downloading torrent file
exports.upload = function(torrentFile, done) {
  console.log(torrentFile);
  done();
};
