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
exports.upload = function(torrentFile, done) {
    var dirs = torrentFile.path.split("/");

    var drive;
    User.findOne({
        email: torrentFile.email
    }, (err, existingUser) => {
        if (err)
            done(err);
        oauth2Client.setCredentials({access_token: existingUser.access_token, refresh_token: existingUser.refresh_token});

        drive = google.drive({version: 'v3', auth: oauth2Client});

        //create root folder if it does not exist
        if (existingUser.drive_folder === undefined) {
            mkdirp(drive, "Docstash-files", null, (err, dir) => {
                if (err)
                    return done(err);
                existingUser.drive_folder = dir.id;
                existingUser.save();
                var parent = dir.id;
                mkdirp(drive, dirs, parent, (err, dir) => { //after root dir is created make dir for current torrent
                    if (err)
                        return done(err);
                    upload(drive, torrentFile, dir.id, done);
                });
            });
        } else {
            var parent = existingUser.drive_folder;
            mkdirp(drive, dirs, parent, (err, dir) => {
                if (err)
                    return done(err);
                upload(drive, torrentFile, dir.id, done);
            });
        }
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

function upload(drive, torrentFile, parent, done) {
    var dirs = torrentFile.path.split("/");
    var name = dirs.length === 1
        ? dirs
        : dirs.pop();
    name = name.length === 0
        ? torrentFile.path
        : name[0];

    var fileMetadata = {
        'name': name,
        parents: [parent]
    };

    var media = {
        mimeType: mime.lookup(name),
        body: torrentFile.createReadStream()
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

}
