import User from '../models/user';
import * as mailer from './mail';
import secret from '../config/secret'
import randomstring from 'randomstring';
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
const JwtStrategy = Strategy;

function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const signin = (req, res, next) => {
    res.send({
        token: User.tokenForUser(req.user)
    });
}

export const signup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!validateEmail(email)) {
        return res.status(422).send({error: 'Invalid Email'});
    }
    if (!email || !password) {
        return res.status(422).send({error: 'You must Provide Email and Password'});
    }

    User.findOne({
        email: email
    }, (err, existingUser) => {
        if (err)
            return next(err);

        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'});
        }

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.picture = user.gravatar(email);
        // // console.log(user);
        // // user.save();
        user.save((err) => {
            if (err)
                return next(err);

            //
            //   // res.json(user);
            res.json({token: User.tokenForUser(user)});
        });
        mailer.newUserEmail(name, email);
    });
}

export const googleSignIn = (req, res, next) => {
    passport.authenticate('google', {
        scope: ['openid profile email https://www.googleapis.com/auth/drive'],
        accessType: 'offline',
        approvalPrompt: 'force',
        callbackURL: "/auth/google/callback/" + req.params.id
    }, (err, user, info) => {})(req, res, next);
}

export const facebookSignIn = (req, res, next) => {
    passport.authenticate('facebook', {
        session: false,
        scope: ['email'],
        callbackURL: "/auth/facebook/callback/" + req.params.id
    }, (err, user, info) => {})(req, res, next);
}

export const CallbackWeb = (req, res, next) => {
    if (req.user.token) {
        return res.redirect(secret.client + '/auth?code=' + req.user.token);
    } else {
        const token = User.tokenForUser(req.user);
        return res.redirect(secret.client + '/auth?code=' + token);
    }
}

export const CallbackMobile = (req, res, next) => {
    if (req.user.token) {
        return res.redirect('docstash://auth?code=' + req.user.token);
    } else {
        const token = User.tokenForUser(req.user);
        return res.redirect('docstash://auth?code=' + token);
    }
}

export const resetPassword = (req, res, next) => {
    const email = req.body.email;
    User.findOne({
        email: email
    }, (err, existingUser) => {
        if (err) {
            res.status(422).send({error: 'No user Found'});
            return next(err);
        }
        if (existingUser) {
            const name = existingUser.name;
            const password = randomstring.generate({length: 8, charset: 'alphabetic'});
            existingUser.password = password;
            existingUser.save((err) => {
                if (err)
                    return next(err);
                res.status(200).send("password Reset Complete");
            });
            mailer.resetPasswordEmail(name, email, password);
        }
    });
}
