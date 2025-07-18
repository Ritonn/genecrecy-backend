const { ObjectId } = require('mongodb');
const Person = require('../models/persons');


const getPeople = async () => {
    const people = await Person.find({
        $or : [
            {status: {$exists: false}},
            {status: "validated"}
        ]
    });
    return people;
}

const pendingPeople = async () => {
    return await Person.find({status: "pending"})
        .populate('idPere idMere enfants conjoints');
}

const findPersonId = async (prenom, nom) => {

    const prenomRegex = new RegExp(prenom, 'i');
    const nomRegex = new RegExp(nom, 'i');

    const data = await Person.find({
        prenom: { $regex: prenomRegex },
        nom: { $regex: nomRegex },
    });

    console.log('Personnes trouvées : ', data);

    if (!data) {
        return
    }

    return data;
}

const newPerson = async (person) => {

    try {
        // Extraire tous les champs de l'objet person
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
        } = person ;

        const peopleCheck = await Person.findOne({ prenom, nom, status: "pending" });
        if (peopleCheck) {
            return null;
        } else {
            // Validation des IDs de référence (optionnel mais recommandé)
            const validationPromises = [];
            
            if (idPere) {
                validationPromises.push(Person.findById(idPere));
            }
            if (idMere) {
                validationPromises.push(Person.findById(idMere));
            }
            if (idConjoint) {
                validationPromises.push(Person.findById(idConjoint));
            }
            
            // Vérifier que tous les IDs référencés existent
            if (validationPromises.length > 0) {
                const results = await Promise.all(validationPromises);
                const hasInvalidRef = results.some(result => result === null);
                
                if (hasInvalidRef) {
                    throw new Error('Une ou plusieurs références d\'ID sont invalides');
                }
            }

            let generation = 0;
            if (person.estNeFamille) {
                const pere = await Person.findById(idPere);
                generation = pere.idGeneration + 1;
            } else {
                const conjoint = await Person.findById(idConjoint);
                generation = conjoint.idGeneration;
            }
            
            
            // Créer l'objet complet avec tous les champs + status "pending"
            const personWithStatus = {
                prenom,
                nom,
                estNeFamille,
                idGeneration: generation,
                dateNaissance,
                estDecede,
                dateDeces,
                estMarie,
                dateMariage,
                idPere: idPere || null,
                idMere: idMere || null,
                conjoints: [idConjoint] || null,
                status: "pending"
            };

            // Créer une nouvelle instance de Person avec les données complètes
            const newPersonInstance = new Person(personWithStatus);

            // Sauvegarder en base de données
            return await newPersonInstance.save();
        }
    } catch (error) {
        console.error('Erreur lors de la création de la personne:', error);
        throw error; // Propager l'erreur pour la gestion dans le controller
    }

}



module.exports = { getPeople, newPerson, findPersonId, pendingPeople };
