var express = require('express');
var router = express.Router();

require('../models/connection');
const { getFamily, submitPerson, getPersonId } = require('../controllers/persons');

router.get('/', getFamily);

router.post('/', submitPerson);
router.post('/search', getPersonId);


module.exports = router;
