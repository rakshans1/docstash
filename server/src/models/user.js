import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import jwt from 'jwt-simple';
import secret from '../config/secret';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  picture: {type: String, default: ''},
  date_created: {type: Date, default: Date.now},
  reset_token: {type: String , required: false},
  facebook_profile_id: {type: String, required: false},
  google_profile_id: {type: String, required: false},
  access_token: String,
  refresh_token: String,
  last_updated : {type: Date, default: Date.now()}
});

userSchema.pre('save', function(next) {
  // console.log(this);
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

//statics are directly available in model
userSchema.statics.tokenForUser = (user) =>{
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, secret.secret);
  //                              subject           issued at time
}

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // console.log(this);
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
}

userSchema.methods.gravatar = (email) => {
  const size = 100;
  if (!email) return 'https://gravatar.com/avatar/?s=' +size + '&d=retro';
  const md5 = crypto.createHash('md5').update(email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' +size+'&d=retro';
}


const model = mongoose.model('user', userSchema);

export default  model;
