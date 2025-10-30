const mongoose = require('mongoose');

const devPrathisthaMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    devPrathisthaMuhurat_image: {
        type: String,
        required: false,
    }
}, { collection: 'DevPrathisthaMuhurat ', timestamps: true });

const DevPrathisthaMuhurat  = mongoose.model('DevPrathisthaMuhurat ', devPrathisthaMuhuratSchema);

module.exports = DevPrathisthaMuhurat ;
