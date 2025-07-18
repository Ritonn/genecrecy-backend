var express = require('express');
var router = express.Router();

require('../models/connection');
const { getFamily, submitPerson, getPersonId, getPendingPeople } = require('../controllers/persons');

router.get('/', getFamily);
router.get('/pending', getPendingPeople)

router.post('/', submitPerson);
router.post('/search', getPersonId);


module.exports = router;
