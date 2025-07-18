const mongoose = require('mongoose');

const STATUS = ["pending", "approved", "refused"]

const personsSchema = mongoose.Schema({
  id: Number,
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
  required: true
  },
  estNeFamille: Boolean,
  idGeneration: Number,
  dateNaissance: {
    type: String,
    required: true
  },
  lieuNaissance: String,
  estDecede: Boolean,
  dateDeces: Date,
  estMarie: Boolean,
  idPere: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  idMere: { type: mongoose.Schema.Types.ObjectId, ref: 'person' },
  enfants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'person' }],
  conjoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'person' }],
  status: {
    type: String,
    required: false,
    enum: STATUS,
  }
}, { timestamps: true });

const Person = mongoose.model('person', personsSchema);

module.exports = Person;