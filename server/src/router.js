/* eslint-disable import/default */
import passport from 'passport';
import * as auth from './controllers/auth';
import passportConfig from './services/passport';

const requireAuth = passport.authenticate('jwt', {session: false });
const requireSignIn = passport.authenticate('local', {session: false });
const google = passport.authenticate('google', {scope: ['email']});
const googleCallback = passport.authenticate('google', {session: false, scope: 'https://www.googleapis.com/auth/plus.login'});
const facebook = passport.authenticate('facebook', {session: false, scope: ['email'] });
const facebookCallback = passport.authenticate('facebook', {session: false, scope: [] });

export default function(app) {
    //GET REQUEST
    app.get('/', requireAuth, (req, res) => {
      // console.log(req.user);
      res.send('hi ' + req.user.name);
    });

    app.get('/user', requireAuth, (req, res) => {
      const user = {
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture
      }
      res.send(user);
    });


    //Auth Controllers
    app.post('/signin', requireSignIn, auth.signin);
    app.post('/signup', auth.signup);
    app.get('/auth/google', google, auth.googleSignIn);
    app.get('/auth/google/callback', googleCallback, auth.googleSignInCallback);
    app.get('/auth/facebook/', facebook , auth.facebookSignIn);
    app.get('/auth/facebook/callback', facebookCallback, auth.facebookSignInCallback);
}
