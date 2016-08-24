/* eslint-disable import/default */
import passport from 'passport';
import {signin, signup} from './controllers/auth';
import passportConfig from './services/passport';

const requireAuth = passport.authenticate('jwt', {session: false });
const requireSignIn = passport.authenticate('local', {session: false });

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


    //POST REQUEST
    app.post('/signin', requireSignIn, signin);
    app.post('/signup', signup);

}
