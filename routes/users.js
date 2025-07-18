var express = require('express');
var router = express.Router();

const { signIn, signUp, createPerson } = require('../controllers/users');

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
