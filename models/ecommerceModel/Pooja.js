const mongoose = require('mongoose');
const PoojaSchema = new mongoose.Schema({
    pujaName: {
        type: String,
        default: ""
    },
    shortDescription: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    price:{
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: ""
    },
    
    bannerImages: {
        type: [String],
        default: null
    },
    type: {
        type: String,
        enum: ["PUJA", "SPELL"],
        default: "PUJA"
    }
}, { collection: "Pooja", timestamps: true });

const Pooja = mongoose.model('Pooja', PoojaSchema);

module.exports = Pooja;