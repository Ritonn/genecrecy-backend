const mongoose = require('mongoose');

const mariagesSchema = mongoose.Schema({
  person1: { type: mongoose.Schema.Types.ObjectId, ref: 'persons' },
  person2: { type: mongoose.Schema.Types.ObjectId, ref: 'persons' },
  isActive: Boolean,
  state: {
    type: String,
    enum: ['fiançailles', 'mariage', 'divorce'],
    default: 'mariage',
  },
  mariage_date: Date,
  mariage_place: String,
}, { timestamps: true });

const Mariage = mongoose.model('mariages', mariagesSchema);

module.exports = Mariage;