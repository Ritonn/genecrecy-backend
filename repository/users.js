require('../models/connection');

const bcrypt = require('bcrypt');
const uid2 = require('uid2');
const User = require('../models/users');

const checkUser = async (username, email) => {
    const usernameCheck = await User.findOne({ username});

    if (!usernameCheck) {
        const emailCheck = await User.findOne({email});
        if (!emailCheck) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false
    }
}

const createUser = async (username, email, password) => {
    let hash = "";
    hash = bcrypt.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hash,
        token: uid2(32),
        roles: ["member"]
    })

    return await newUser.save();

}

module.exports = { createUser, checkUser};