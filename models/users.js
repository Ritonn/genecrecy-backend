const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  roletype: String,
}, { timestamps: true });

const User = mongoose.model('users', usersSchema);

module.exports = User;