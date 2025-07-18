const { getPeople, newPerson, findPersonId } = require('../repository/persons');

const getFamily = async (req, res) => {
    const family = await getPeople();
    if (!family) {
        res.json({ result: false, error: "No people found"})
    } else {
        res.json({result: true, family})
    }
}

const getPersonId = async (req, res) => {

    const {prenom, nom} = req.body;
    
    if (!prenom || !nom) {
        res.status(400).json({ error: "Un ou plusieurs champs manquant(s)"})
    }

    const data = await findPersonId(prenom, nom);

    if (!data) {
        res.json({result: false, error: "Aucune personne trouvée"})
        return;
        
    } else {

        let filteredData = [];
            for (let i = 0; i< data.length; i++) {
                const obj = {
                    id: data[i]._id,
                    prenom: data[i].prenom,
                    nom: data[i].nom,
                    dateNaissance: data[i].dateNaissance.slice(0,10)
                }
                filteredData.push(obj);
            }
        res.json({result: true, data: filteredData})
    }


}

const submitPerson = async (req, res) => {

    const {prenom, nom, dateNaissance, pere, mere} = req.body;

    // Validation
    if (!nom || !prenom || !dateNaissance || !parentIds || !Array.isArray(parentIds)) {
      return res.status(400).json({ 
        error: 'Données manquantes ou invalides' 
      });
    }

    const data = await newPerson(prenom, nom, dateNaissance, pere, mere);


}


module.exports = { getFamily, submitPerson, getPersonId };