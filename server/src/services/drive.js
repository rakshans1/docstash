var google = require('googleapis');
var Googleauth = require('google-auth-library');

import secret from '../config/secret';

const token = "ya29.Ci9jAwb1t6iYX5QX8bhpWNSS4HejMFcAL8HrGpmLzFN3dhO5n1S-Y3og1N21C3hoYQ";

authorize(listFiles);

function authorize(callback) {
    var clientSecret = secret.google.clientSecret;
    var clientId = secret.google.clientID;
    var auth = new Googleauth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret);
}

oauth2Client.setCredentials({access_token: token});

function listFiles(auth) {
    var service = google.drive('v3');
    service.files.list({
        auth: auth,
        pageSize: 10,
        fields: "nextPageToken, files(id, name)"
    }, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.files;
        if (files.length === 0) {
            console.log('No files found.');
        } else {
            console.log('Files:');
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
        }
    });
}
