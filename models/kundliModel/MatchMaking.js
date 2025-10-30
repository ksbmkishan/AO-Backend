const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Customers = require('../customerModel/Customers');

const MatchMakingSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    male_name: {
        type: String,
        default: ''
    },
    // gender: {
    //     type: String,
    //     default: ''
    // },
    male_timeOfBirth:{
        type: Date,
        default: null
    },
    male_dateOfBirth:{
        type: Date,
        default: null
    },
    male_placeOfBirth: {
        type: String,
        default: ''
    },
    female_name: {
        type: String,
        default: ''
    },
    female_timeOfBirth:{
        type: Date,
        default: null
    },
    female_dateOfBirth:{
        type: Date,
        default: null
    },
    female_placeOfBirth: {
        type: String,
        default: ''
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

const MatchMaking = mongoose.model('MatchMaking', MatchMakingSchema);

module.exports = MatchMaking;