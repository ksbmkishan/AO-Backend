const mongoose = require('mongoose');

const astrologersDetailSchema = mongoose.Schema({
    astrologer_name: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    country_code: {
        type: String,
        default: ''
    },
    phone_no: {
        type: String,
        default: ''
    },
    alternate_no: {
        type: String,
        default: ''
    },
    currency: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills'
    }],
    language: [{
        type: String,
        default: ''
    }],
    experience: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    pincode: {
        type: String,
        default: ''
    },
    remedies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Remedies'
    }],
    offers: [{
        type: String,
        default: ''
    }],
    main_experties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainExpertise'
    }],
    expertise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expertise'
    }],
    youtube_link: {
        type: String,
        default: ''
    },
    followere: {
        type: String,
        default: ''
    },
    free_min: {
        type: String,
        default: ''
    },
    portal: {
        type: String,
        default: ''
    },
    profile_picture: {
        type: String,
        default: ''
    },
    id_proof: {
        type: String,
        default: ''
    },
    bank_proof: {
        type: String,
        default: ''
    },
    account_no: {
        type: String,
        default: ''
    },
    account_type: {
        type: String,
        default: ''
    },
    ifsc_code: {
        type: String,
        default: ''
    },
    account_holder: {
        type: String,
        default: ''
    },
    pan_no: {
        type: String,
        default: ''
    },
    adhar_no: {
        type: String,
        default: ''
    },
    consultation_price: {
        type: String,
        default: ''
    },
    call_price: {
        type: String,
        default: ''
    },
    call_commision_price: {
        type: String,
        default: ''
    },
    chat_price: {
        type: String,
        default: ''
    },
    chat_commision_price: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    isSignupCompleted: {
        type: Number,
        default: 0
    },
    isOnline: {
        type: Boolean,
        default: false // Default status is offline
      },
      isLive: {
        type: Boolean,
        default: false // Default status is offline
      },

    preferredDays: [daySchema],

    startTime: {
        type: String,  
    },
    endTime: {
        type: String, 
    },
    

    

}, { collection: 'AstrologersDetails', timestamps: true })

const AstrologersDetails = mongoose.model('AstrologersDetails', astrologerSchema)

module.exports = AstrologersDetails