const mongoose = require('mongoose');

const rahukaalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    rahukaal_image: {
        type: String,
        required: false,
    }
}, { collection: 'Rahukaal ', timestamps: true });

const Rahukaal  = mongoose.model('Rahukaal ', rahukaalSchema);

module.exports = Rahukaal ;
