import google from 'googleapis';
import Googleauth from 'google-auth-library';
import User from '../../models/user';

//this backend will be used if *all* of these env 'vars' are present
exports.vars = ["clientSecret", "clientID"];

var oauth2Client;

exports.init = function(config) {
  var OAuth2 = google.auth.OAuth2;
  oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret);
  console.log("Google login Succes");
};

//upload will be called to upload a downloading torrent file
exports.upload = function(torrentFile, callback) {
  var token = "ya29.Ci9kA30pGpm1jnVsotYR2N5jpXP0PprNsUQpmE1pOklmX6kzNoGktogJz_rwESgMNQ";
  var refresh_token = "1/Bj21qx6uvegPMgpzhUEISg0Cry7nQJWPBdvzVAYbCDU";
  // User.findOne({email: torrentFile.email}, (err, existingUser) => {
  //   if (err) callback(err);
  //   token = existingUser.access_token;
  // });
  debugger;
  console.log(token);
  oauth2Client.setCredentials({
    access_token: token,
    refresh_token: refresh_token
  });
  console.log(torrentFile);
  var drive = google.drive({ version: 'v3', auth: oauth2Client });
  mkdirp(drive);
  // drive.files.create({
  //   resource: {
  //     name: 'Test',
  //     mimeType: 'text/plain'
  //   },
  //   media: {
  //     mimeType: 'text/plain',
  //     body: 'Hello World'
  //   }
  // });

};

//list will be called to list all stored files
exports.list = function(callback) {

};

//removes a file at the given path (torrentFile.path)
exports.remove = function(path, callback) {

};


function mkdirp(drive, dirs, parent, cb) {
  var fileMetadata = {
    'name' : 'Torrent',
    'mimeType' : 'application/vnd.google-apps.folder'
  };
  drive.files.create({
    resource: fileMetadata,
    fields: 'id'
  }, (err, file) => {
    if (err) cb(err);
    console.log('Folder Id: ', file.id);
  });
}
