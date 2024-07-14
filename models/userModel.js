const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add username'],
    },
    email: {
      type: String,
      required: [true, 'Please add the email'],
      unique: [true, 'Email already taken!'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password!'],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('User', userSchema);
