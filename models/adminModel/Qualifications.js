const mongoose = require('mongoose');

const QualificationsSchema = new mongoose.Schema({
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer'
    },
  higherQualification: {
    type: String,
    default: ''
  },
  qualificationType:{
    type: String,
    default: ''
  },
  instituteName:{
    type: String,
    default: ''
  },
  documents: {
    type: String,
    default: "",
  },


},{ collection: 'Qualifications', timestamps: true });

const Qualifications = mongoose.model('Qualifications', QualificationsSchema);

module.exports = Qualifications;

