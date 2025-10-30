const mongoose = require('mongoose');

const remediesSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    description_hi: {
        type: String,
        default: ""
    }
}, { collection: 'Remedies', timestamps: true });

const Remedies = mongoose.model('Remedies', remediesSchema);

module.exports = Remedies;
