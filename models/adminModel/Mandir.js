const mongoose = require('mongoose');

const mandirSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  description: String,
  description_hi: String,
}, { collection: 'Mandir', timestamps: true });

const Mandir = mongoose.model('Mandir', mandirSchema);

module.exports = Mandir;
