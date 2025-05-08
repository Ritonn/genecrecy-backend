const mongoose = require('mongoose');

const personsSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  dead: Boolean,
  deathdate: Date,
  estMarie: Boolean,
  idConjoint: { type: mongoose.Schema.Types.ObjectId, ref: 'persons' },
  isBornFamily: Boolean,
  idFamille: { type: mongoose.Schema.Types.ObjectId, ref: 'mariages' },
}, { timestamps: true });

const Person = mongoose.model('person', personsSchema);

module.exports = Person;