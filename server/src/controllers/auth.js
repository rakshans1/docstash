import User from '../models/user';
import jwt from 'jwt-simple';
import secret from '../config/secret';
import mailer from './mail';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, secret.secret);
  //                              subject           issued at time
}
function validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
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
      res.json({ token: tokenForUser(user)});
    });
    mailer(name, email);
  });
}
