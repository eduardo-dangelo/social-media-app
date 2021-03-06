const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const lodash = require('lodash');

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  dob: String,
  description: String,
  // posts: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'post'
  // }],
});

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.update = function(value) {
  const user = this;
  return user.findById(value.id)
    .populate('users')
    .then(user => {
      if (value.firstName) {
        user.firstName = value.firstName;
      }

      if (value.lastName) {
        user.lastName = value.lastName;
      }

      if (value.dob) {
        user.dob = value.dob;
      }

      return Promise.all([user.save()])
        .then(([user]) => user);
    })
    .catch((error) => {
      return error;
    });
}

UserSchema.statics.loadUser = function(id) {
  return this.findById(id)
    // .populate('user')
    .then(user => user);
}

// UserSchema.statics.loadPosts = function(id) {
//   const Post = mongoose.model('post');
//   return this.findById(id)
//     .then(user => {
//       const post = Post()
//       user.posts.push(post)
//       return Promise.all([post.save(), user.save()])
//         .then(([post, user]) => user);
//     });
// }

UserSchema.statics.findPosts = function(post) {
  return this.findById(post.user.id)
    .populate('posts')
    .then(user => user.posts);
}

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model('user', UserSchema);
