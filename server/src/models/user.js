import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  picture: {type: String, default: ''}
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
