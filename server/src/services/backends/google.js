import google from 'googleapis';
import User from '../../models/user';
import mime from 'mime';

//this backend will be used if *all* of these env 'vars' are present
exports.vars = ["clientSecret", "clientID"];

var oauth2Client;

exports.init = function(config) {
    var OAuth2 = google.auth.OAuth2;
    oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret);
    console.log("Google login Succes");
};

//upload will be called to upload a downloading torrent file
exports.upload = function(stream, parent , name, length, drive, done) {
  var fileMetadata = {
      'name': name,
      parents: [parent]
  };

  var media = {
      mimeType: mime.lookup(name),
      body: stream
  };

  drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
  }, function(err, file) {
      if (err)
          return done(err);
      done();
  });
};

//list will be called to list all stored files
exports.list = function(done) {
    // drive = google.drive({ version: 'v3', auth: oauth2Client });
};

//removes a file at the given path (torrentFile.path)
exports.remove = function(path, done) {};

function mkdirp(drive, dirName, parent, done) {
    var fileMetadata
    if (!parent) { //create a prent docstash folder in drive to strore all files in it
        fileMetadata = {
            'name': dirName,
            'mimeType': 'application/vnd.google-apps.folder'
        };
    } else {
        fileMetadata = {
            'name': dirName,
            'mimeType': 'application/vnd.google-apps.folder',
            parents: [parent]
        }
    }
    drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    }, (err, file) => {
        if (err)
            return done(err);
        done(null, file);
    });
}


exports.mkdir = (dirs, email, cb) => {
  var drive;
  User.findOne({
      email: email
  }, (err, existingUser) => {
      if (err)
          done(err);
      oauth2Client.setCredentials({access_token: existingUser.access_token, refresh_token: existingUser.refresh_token});

      drive = google.drive({version: 'v3', auth: oauth2Client});

      //create root folder if it does not exist
      if (existingUser.drive_folder === undefined) {
          mkdirp(drive, "Docstash-files", null, (err, dir) => {
              if (err)
                  return cb(err);
              existingUser.drive_folder = dir.id;
              existingUser.save();
              var parent = dir.id;
              mkdirp(drive, dirs, parent, (err, dir) => { //after root dir is created make dir for current torrent
                  if (err)
                      return cb(err);
                  cb(null, dir.id, drive);
              });
          });
      } else {
          var parent = existingUser.drive_folder;
          mkdirp(drive, dirs, parent, (err, dir) => {
              if (err)
                  return cb(err);
              cb(null, dir.id, drive);
          });
      }
  });
}
