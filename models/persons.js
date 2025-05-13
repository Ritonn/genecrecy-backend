const mongoose = require('mongoose');

const personsSchema = mongoose.Schema({
  id: Number,
  prenom: String,
  nom: String,
  estNeFamille: Boolean,
  idGeneration: Number,
  dateNaissance: Date,
  lieuNaissance: String,
  estDecede: Boolean,
  dateDeces: Date,
  estMarie: Boolean,
  idPere: { type: mongoose.Schema.Types.ObjectId, ref: 'persons' },
  idMere: { type: mongoose.Schema.Types.ObjectId, ref: 'persons' },
  enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'persons' }],
  conjoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'persons' }],
}, { timestamps: true });

const Person = mongoose.model('person', personsSchema);

module.exports = Person;