import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
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

const model = mongoose.model('user', userSchema);

export default  model;
