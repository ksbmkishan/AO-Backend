const mongoose = require('mongoose');

const AstroCompanionSchema = mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    images: {
        type: [String],
        default: []
    },
    type: {
        type: String,
        enum: ["NUMEROLOGY", "VIVAH", "MUNDAN", "ANNAPRASHAN", "VIDYARAMBH", "KARNAVEDHA", "DEV_PRATISHTHA", "GRIHA_PRAVESH", "GRAHA_ROG_NIVARAN", "SOLAR_ECLIPS", "LUNAR_ECLIPS", "RAHU_KAAL", "KAALSARPA_DOSH", "LEARN_ASTROLOGY", "ASTROKUNJ_BHAVISHYAVANI", "SHARE_MARKET", "PANCHA_DEVTA", "SHRI_HARIVISHNU", "MAHAVIDYAS", "MAHAMRI", "BRAHMA_VIDYA", "SHRI_HANUMAT_MAHAVIR", "YOG"],
        default: ''
    }
}, { collection: 'AstroCompanion', timestamps: true })

const AstroCompanion = mongoose.model('AstroCompanion', AstroCompanionSchema)

module.exports = AstroCompanion