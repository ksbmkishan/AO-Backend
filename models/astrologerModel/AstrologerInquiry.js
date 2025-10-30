const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    language: {
        type: String, 
        required: false
    }
}, { _id: false });

const astrologerInquirySchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    },    
    language : [languageSchema],

    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],

    expertise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expertise'
    }],

    mainExpertise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainExpertise'
    },
}, { collection: 'AstrologerInquiry', timestamps: true })

const AstrologerInquiry = mongoose.model('AstrologerInquiry', astrologerInquirySchema)

module.exports = AstrologerInquiry