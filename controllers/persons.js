const { getPeople, newPerson } = require('../repository/persons');

const getFamily = async (req, res) => {
    const family = await getPeople();
    if (!family) {
        res.json({ result: false, error: "No people found"})
    } else {
        res.json({result: true, family})
    }
}

const createPerson = async (req, res) => {
//   if (!checkBody(req.body, ['username', 'password'])) {
//     res.json({ result: false, error: 'Des champs sont vides ou manquants...' });
//     return;
//   }

  // Check if the user has not already been registered
  const data = await newPerson();
  
  if (data) {
    res.json({ result: true, person: data });
    } else {
    // User already exists in database
    res.json({ result: false, error: "Cette personne existe déjà !" });
    }
}


module.exports = { getFamily, createPerson };