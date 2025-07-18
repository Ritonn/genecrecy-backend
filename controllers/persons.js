const { getPeople, newPerson, findPersonId, pendingPeople } = require('../repository/persons');

const getFamily = async (req, res) => {
    const family = await getPeople();
    if (!family) {
        res.json({ result: false, error: "No people found" })
    } else {
        res.json({ result: true, family })
    }
}

const getPersonId = async (req, res) => {

    const { prenom, nom } = req.body;

    if (!prenom || !nom) {
        res.status(400).json({ error: "Un ou plusieurs champs manquant(s)" })
    }

    const data = await findPersonId(prenom, nom);

    if (!data) {
        res.json({ result: false, error: "Aucune personne trouvée" })
        return;

    } else {

        let filteredData = [];
        for (let i = 0; i < data.length; i++) {
            const obj = {
                id: data[i]._id,
                prenom: data[i].prenom,
                nom: data[i].nom,
                dateNaissance: data[i].dateNaissance.slice(0, 10)
            }
            filteredData.push(obj);
        }
        res.json({ result: true, data: filteredData })
    }


}

const submitPerson = async (req, res) => {

    const {
        prenom,
        nom,
        estNeFamille,
        dateNaissance,
        estDecede,
        dateDeces,
        estMarie,
        dateMariage,
        idPere,
        idMere,
        idConjoint
    } = req.body;

    // Validation
    if (!nom || !prenom || !dateNaissance) {
        return res.status(400).json({
            error: 'Données manquantes ou invalides'
        });
    }

    const data = await newPerson(req.body);

    if (!data) {
        res.json({ result: false, error: "Aucune personne trouvée" })
        return;

    } else {
        res.json({ result: true, data })
    }

}

const getPendingPeople = async (req, res) => {
    const people = await pendingPeople();

    if (!people) {
        res.json( {error: "Aucun membre en attente de validation trouvé"})
    }

    res.json({result: true, data: people})
}


module.exports = { getFamily, submitPerson, getPersonId, getPendingPeople };