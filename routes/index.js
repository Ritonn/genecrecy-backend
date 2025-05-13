const express = require('express');
const router = express.Router();
const { handler } = require('../repository/persons');
const { Person } = require('../models/persons')

router.get('/people', function (req, res) {
  Person.find({})
    .then(response => response.json())
    .then((data) => {
      console.log('bonjour');
      res.json({result: true, data: data});
    }) 
});

// Route avec ID dynamique
router.get('/api/arbre/:id', handler);

module.exports = router;
