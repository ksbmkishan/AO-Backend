const mongoose = require('mongoose');

const nnaprashanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    annaprashan_image: {
        type: String,
        required: false,
    }
}, { collection: 'Annaprashan', timestamps: true });

const Annaprashan   = mongoose.model('Annaprashan', nnaprashanSchema);

module.exports = Annaprashan  ;
