const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Customers = require('../customerModel/Customers');

const NumerologySchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    name: {
        type: String,
        default: ''
    },
    time:{
        type: String,
        default: null
    },
    date:{
        type: Date,
        default: null
    },
    latitude: {
        type: Number,
        default: 0
    },
    longitude: { 
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now  // Use Date.now to set the default value to the current timestamp
    }
})

const Numerology = mongoose.model('Numerology', NumerologySchema);

module.exports = Numerology;