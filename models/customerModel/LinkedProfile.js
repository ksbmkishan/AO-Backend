const mongoose = require('mongoose');

const LinkedProfileSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customers' 
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    timeOfBirth: {
        type: Date, 
        default: null 
    },
    placeOfBirth: {
        type: String,
        default: ''
    },
    maritalStatus: {
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
    status: {
        type: Number,
        default: 0
    },
    topic_of_concern: {
        type: String
    },
    description:{
        type: String,
        default: ''
    }
}, { collection: 'LinkedProfile', timestamps: true });

const LinkedProfile = mongoose.model('LinkedProfile', LinkedProfileSchema);

module.exports = LinkedProfile;