/* eslint-disable import/default no-unused-vars */
import passport from 'passport';
import {signin, signup} from './controllers/auth';
import passportConfig from './services/passport';

const requireAuth = passport.authenticate('jwt', {session: false });
const requireSignIn = passport.authenticate('local', {session: false });

export default function(app) {
    app.get('/', requireAuth, (req, res) => {
      res.send('hi');
    });
    app.post('/signin', requireSignIn, signin);
    app.post('/signup', signup);
}
