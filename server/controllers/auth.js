const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = require('../config/secret');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, secret.secret);
  //                              subject           issued at time
}

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if ( ! email || !password) {
    return res.status(422).send({error: 'You must Provide Email and Password'});
  }

  User.findOne({email: email}, (err, existingUser) => {
    if (err) return  next(err);

    if (existingUser) {
      return res.status(422).send({error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password
    });
    // console.log(user);
    // user.save();
    user.save((err) => {
      if (err) return next(err);

      res.json(user);
      // res.json({ token: tokenForUser(user)});
    });

  });
}
