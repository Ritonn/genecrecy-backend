const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  roletype: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;