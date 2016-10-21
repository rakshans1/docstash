import passport from 'passport';
import User from '../models/user';
import secret from '../config/secret';
import {Strategy, ExtractJwt} from 'passport-jwt';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oauth';
import FacebookStrategy from 'passport-facebook';

const JwtStrategy = Strategy;

const localOptions = {
    usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({
        email: email
    }, (err, user) => {
        if (err)
            return done(err);

        if (!user)
            return done(null, false);

        user.comparePassword(password, (err, isMatch) => {
            if (err)
                return done(err);

            if (!isMatch)
                return done(null, false);

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
        if (err)
            return done(err, false);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

const googleLogin = new GoogleStrategy.OAuth2Strategy({
    clientID: secret.google.clientID,
    clientSecret: secret.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({
            email: profile.emails[0].value
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.access_token = accessToken;
                user.save(err => {
                    if (err)
                        return done(err);
                    return done(null, user);
                });
            } else {
                const user = new User();
                user.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.email = profile.emails[0].value;
                user.picture = profile.photos[0].value;
                user.google_profile_id = profile.id;
                user.access_token = accessToken;
                user.refresh_token = refreshToken;
                user.token = User.tokenForUser(user);
                user.save((err) => {
                    if (err) {
                        done(err);
                    }
                    return done(null, user);
                });
            }
        })
    })
});

const fbLogin = new FacebookStrategy.Strategy({
    clientID: secret.facebook.FACEBOOK_APP_ID,
    clientSecret: secret.facebook.FACEBOOK_SECRET_KEY,
    profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({
            email: profile.emails[0].value
        }, (err, usr) => {
            if (err) {
                return done(err);
            }
            if (usr) {
                return done(null, usr);
            } else {
                const profilePic = ` https://graph.facebook.com/${profile.id}/picture?type=large`;
                const user = new User();
                user.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.email = profile.emails[0].value;
                user.picture = profilePic;
                user.facebook_profile_id = profile.id;
                user.access_token = accessToken;
                user.token = User.tokenForUser(user);
                user.save((err) => {
                    if (err) {
                        done(err);
                    }
                    return done(null, user);
                });
            }
        });
    });

});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(googleLogin);
passport.use(fbLogin);
