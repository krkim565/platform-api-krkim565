/* eslint-disable linebreak-style */
import mongoose, { Schema } from 'mongoose';
import bcryptjs from 'bcryptjs';


// create a PostSchema with a title field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

UserSchema.pre('save', function beforeyYourModelSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  // generate salt
  if (!user.isModified('password')) return next();
  // eslint-disable-next-line consistent-return
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      return next();
    });
  });
  return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // eslint-disable-next-line consistent-return
  bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};
// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
