import User from '../models/user';
import mailer from './mail';
import secret from '../config/secret'


function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export const signin = (req, res, next) => {
  res.send({ token: User.tokenForUser(req.user) });
}

export const signup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!validateEmail(email)){
    return res.status(422).send({error: 'Invalid Email'});
  }
  if ( ! email || !password) {
    return res.status(422).send({error: 'You must Provide Email and Password'});
  }

  User.findOne({email: email}, (err, existingUser) => {
    if (err) return  next(err);

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use' });
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.picture = user.gravatar(email);
    // // console.log(user);
    // // user.save();
    user.save((err) => {
      if (err) return next(err);
    //
    //   // res.json(user);
      res.json({ token: User.tokenForUser(user)});
    });
    mailer(name, email);
  });
}

export const googleSignIn = (req, res, next) => {
  const passport = req._passport.instance;
  passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}, (err, user, info) => {
  })(req, res, next);
}

export const googleSignInCallback = (req, res, next) => {
  if(req.user.token) {
  return res.redirect(secret.client + '/auth?code=' + req.user.token);
  } else {
    const token = User.tokenForUser(req.user);
    return res.redirect( secret.client + '/auth?code=' + token);
  }
}

export const facebookSignIn = (req, res, next ) => {
  res.send('Facebook Login Successful');
}

export const facebookSignInCallback = (req, res, next) => {
  if(req.user.token) {
  return res.redirect(secret.client + '/auth?code=' + req.user.token);
  } else {
    const token = User.tokenForUser(req.user);
    return res.redirect( secret.client + '/auth?code=' + token);
  }
}
