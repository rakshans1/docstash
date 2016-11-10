/* eslint-disable import/default */
/* eslint-disable no-unused-vars */
import passport from 'passport';
import * as auth from './controllers/auth';
import passportConfig from './services/passport';

import * as user from './controllers/user'
import * as shortner from './controllers/shortner';
import torrents from './controllers/torrent';
import search from './controllers/search';
import backend from './services/backend';
import ws from './services/ws';
import secret from './config/secret'

import upload from './controllers/upload';

import twitter from './controllers/twitter';

import weather from './controllers/weather';
import units from './util/units';

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});
const googleCallbackWeb = passport.authenticate('google', {
    session: false,
    scope: ['openid profile email https://www.googleapis.com/auth/drive'],
    accessType: 'offline',
    approvalPrompt: 'force',
    callbackURL: "/auth/google/callback/web"
});
const googleCallbackMobile = passport.authenticate('google', {
    session: false,
    scope: ['openid profile email https://www.googleapis.com/auth/drive'],
    accessType: 'offline',
    approvalPrompt: 'force',
    callbackURL: "/auth/google/callback/mobile"
});
const facebookCallbackWeb = passport.authenticate('facebook', {
    session: false,
    scope: [],
    callbackURL: "/auth/facebook/callback/web"
});
const facebookCallbackMobile = passport.authenticate('facebook', {
    session: false,
    scope: [],
    callbackURL: "/auth/facebook/callback/mobile"
});

export default function(app, jsonParser) {
    //Home Controllers
    app.get('/', requireAuth, (req, res) => {
        res.send('hi ' + req.user.name);
    });

    app.get('/load', (req, res) => {
      let ram = Math.floor(process.memoryUsage().rss / 1000000).toString()
      let uptime = Math.floor(process.uptime() / 60).toString()
        res.send('Ram Used : ' + ram + ' MB Uptime: ' + uptime + ' min');
    });

    app.post('/weather', jsonParser, weather);

    //User info Controllers
    app.get('/user', requireAuth, (req, res) => {
        const user = {
            name: req.user.name,
            email: req.user.email,
            picture: req.user.picture,
            storage: units(req.user.storage)
        }
        res.send(user);
    });

    //Auth Controllers
    app.post('/signin', jsonParser, requireSignIn, auth.signin);
    app.post('/signup', jsonParser, auth.signup);
    app.post('/resetpassword', jsonParser, auth.resetPassword);
    app.get('/auth/google/:id', auth.googleSignIn);
    app.get('/auth/google/callback/web', googleCallbackWeb, auth.CallbackWeb);
    app.get('/auth/google/callback/mobile', googleCallbackMobile, auth.CallbackMobile);
    app.get('/auth/facebook/:id', auth.facebookSignIn);
    app.get('/auth/facebook/callback/web', facebookCallbackWeb, auth.CallbackWeb);
    app.get('/auth/facebook/callback/mobile', facebookCallbackMobile, auth.CallbackMobile);

    //Shortner Controllers
    app.post('/short',jsonParser, shortner.post);
    app.get('/s/:hash',jsonParser, shortner.get);

    //Torrent Controllers
    api('torrents', torrents);

    //Torrent Search Controllers
    api('search', search);

    // Upload Controllers
    app.post('/upload', requireAuth, upload);

    //User Setting Controllers
    app.post('/user/changepassword',jsonParser, requireAuth, user.changePassword );

    function api(name, module) {
        Object.keys(module).forEach((key) => {
            const fn = module[key];
            if (typeof fn !== "function")
                return;

            //dont call modules with request/response,
            //instead call with 'body' and 'callback(err, data)'
            const endpoint = '/api/' + name + '/' + key;
            app.post(endpoint,jsonParser, (req, res) => {
                fn(req.body, (err, data) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.send(data || "OK");
                    }
                });
            });
        });
    } //api function end

    let storedFiles = {};

    const update = function(newFiles) {
        //optionnaly update stored files
        if (newFiles)
            storedFiles = newFiles;

        //broadcast state
        ws.send({
            torrents: torrents.list,
            filesDownloading: torrents.filesDownloading,
            uploads: storedFiles,
            twitter: {
                count: twitter.tweetCount,
                sentiment: twitter.tweetTotalSentiment,
                phrase: twitter.monitoringPhrase,
                tweets: twitter.tweets
            }
        });
    };
    torrents.on("update", update);
    twitter.on("update", update);

    //periodically scan for new stored files
    function list() {
        backend.list(function(err, files) {
            if (!err)
                update(files);
            }
        );
    }
    setTimeout(list, 1000 * 10);
    setInterval(list, 15 * 60 * 1000);

    //Twitter Sentiment  { tweet: hi}
    // app.post('/sentiment', twitter.sentimentTwitter);
    app.post('/twitter',jsonParser, twitter.watchTwitter);

    if (process.env.NODE_ENV === "undefined") {
        const apilist = require('./util/apilist');
        apilist(app._router.stack);
    }
} //main function end
