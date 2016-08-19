import passport from 'passport';
import User from '../models/user';
import secret from '../config/secret';
import {Strategy, ExtractJwt} from 'passport-jwt';
import LocalStrategy from 'passport-local';

const JwtStrategy = Strategy;

const localOptions ={
  usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({email: email}, (err, user) => {
    if (err) return done(err);

    if (!user) return done(null, false);


    user.comparePassword(password, (err, isMatch) => {
      if(err) return done(err);

      if(!isMatch) return done(null, false);

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
