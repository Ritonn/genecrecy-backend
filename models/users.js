const mongoose = require('mongoose');

const AVAILABLEROLES = ["member", "admin", "moderator"]

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
  },

  roles: {
    type: [String],
    required: true,
    enum: AVAILABLEROLES
  },
}, { timestamps: true });

const User = mongoose.model('users', usersSchema);

module.exports = User;