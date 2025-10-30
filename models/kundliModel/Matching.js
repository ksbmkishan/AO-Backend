const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Customers = require('../customerModel/Customers');

const MatchingSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    MaleName: {
        type: String,
        default: ''
    },
    Malegender: {
        type: String,
        default: 'Male'
    },
    MaletimeOfBirth:{
        type: Date,
        default: null
    },
    MaledateOfBirth:{
        type: Date,
        default: null
    },
    MaleplaceOfBirth: {
        type: String,
        default: ''
    },
    Malelatitude: {
        type: Number,
        default: 0
    },
    Malelongitude: { 
        type: Number,
        default: 0
    },
    FemaleName: {
        type: String,
        default: ''
    },
    Femalegender: {
        type: String,
        default: 'Female'
    },
    FemaletimeOfBirth:{
        type: Date,
        default: null
    },
    FemaledateOfBirth:{
        type: Date,
        default: null
    },
    FemaleplaceOfBirth: {
        type: String,
        default: ''
    },
    Femalelatitude: {
        type: Number,
        default: 0
    },
    Femalelongitude: { 
        type: Number,
        default: 0
    },
    timeZone: {
        type: String,
        default: '5.5'
    }
})

const Matching = mongoose.model('Matching', MatchingSchema);

module.exports = Matching;