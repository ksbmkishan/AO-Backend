const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        required: true
    }
},{ collection: 'Day', timestamps: true });

const Day = mongoose.model('Day', daySchema);

module.exports = Day;