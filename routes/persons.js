var express = require('express');
var router = express.Router();

require('../models/connection');
const { getFamily, createPerson } = require('../controllers/persons');

router.get('/', getFamily);

router.post('/', createPerson);


module.exports = router;
