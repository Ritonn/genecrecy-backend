var express = require('express');
var router = express.Router();

require('../models/connection');
const { getFamily } = require('../controllers/persons');

router.get('/', getFamily);

router.post('/', (req, res) => {
//   if (!checkBody(req.body, ['username', 'password'])) {
//     res.json({ result: false, error: 'Des champs sont vides ou manquants...' });
//     return;
//   }

  // Check if the user has not already been registered
  Person.findOne({ firstname: req.body.firstname }).then(data => {
    if (data === null) {

      const newPerson = new Person({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });

      newPerson.save().then(data => {
        res.json({ result: true, person: data });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "Cette personne existe déjà !" });
    }
  });
});


module.exports = router;
