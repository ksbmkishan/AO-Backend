const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 5000
  }
},{ collection: 'PrivacyPolicy', timestamps: true });

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);

module.exports = PrivacyPolicy;
