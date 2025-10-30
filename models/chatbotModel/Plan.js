const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  messages: { type: Number, required: true },
  divyaRashi: { type: String, required: true },
}, {collection: "Plan"});

module.exports = mongoose.model('Plan', planSchema);
