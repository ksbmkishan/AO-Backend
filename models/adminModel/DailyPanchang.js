const mongoose = require('mongoose');

const dailyPanchangSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
}, { collection: 'DailyPanchang', timestamps: true });

const DailyPanchang = mongoose.model('DailyPanchang', dailyPanchangSchema);

module.exports = DailyPanchang;
