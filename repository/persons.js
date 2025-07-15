const { ObjectId } = require('mongodb');
const Person = require('../models/persons');

// Extrait les attributs à afficher
// function extractAttributes(person) {
//   const excludedFields = ['_id', 'id', 'prenom', 'nom', 'enfants', 'conjoints', 'idPere', 'idMere'];
//   const attributes = {};

//   for (const [key, value] of Object.entries(person._doc)) {
//     if (!excludedFields.includes(key)) {
//       attributes[key] = value instanceof Date
//         ? value.toISOString().split('T')[0]
//         : value;
//     }
//   }

//   return attributes;
// }

// Fonction récursive
// async function buildTree(id) {
//   const person = await Person.findById(id);

//   if (!person) return null;

//     const normalizeId = (id) =>
//     typeof id === 'object' && id.$oid ? new ObjectId(id.$oid) :
//     typeof id === 'string' ? new ObjectId(id) :
//     id;

//     // Conjoints : récupérer chaque document
//     const conjointsDocs = await Promise.all(
//         (person.conjoints || []).map(cid => Person.findOne({ _id: cid }))
//     );

//     const conjointNodes = conjointsDocs
//         .filter(Boolean)
//         .map(conjoint => ({
//         name: `${conjoint.prenom} ${conjoint.nom}`,
//         attributes: extractAttributes(conjoint),
//         _conjoint: true, // flag pour personnaliser l'affichage
//         children: [],
//         }));

//     const children = await Promise.all(
//     (person.enfants || []).map((childId) => buildTree(normalizeId(childId)))
//     );


//     return {
//     name: `${person.prenom || ''} ${person.nom || ''}`,
//     attributes: extractAttributes(person),
//     conjointData: conjointsDocs[0] ? {
//         name: `${conjointsDocs[0].prenom} ${conjointsDocs[0].nom}`,
//         attributes: extractAttributes(conjointsDocs[0])
//     } : null,
//     children: children.filter(Boolean),
//     };
// }

// Handler Express
// async function handler(req, res) {
//   const { id } = req.params;

//   try {
//     const tree = await buildTree(id);
//     console.log(tree);
//     res.status(200).json(tree);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// 
//

const getPeople = async() => {
    return await Person.find({})
}



module.exports = { getPeople };
