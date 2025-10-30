const mongoose = require('mongoose');

const subSkillSchema = new mongoose.Schema({
  subskill: {
    type: String,
    required: true,
    unique: true // Ensures each subskill name is unique
  },
  description: String,
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills'
}
},{ collection: 'SubSkills', timestamps: true });

const SubSkills = mongoose.model('SubSkills', subSkillSchema);

module.exports = SubSkills;


