const mongoose = require('mongoose');

const waitingListSchema = mongoose.Schema({    
    astrologer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer'
    }],
    customer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers' // Reference to the MainExpertise model
    }] 

}, { collection: 'WaitingList', timestamps: true })

const WaitingList = mongoose.model('WaitingList', waitingListSchema)

module.exports = WaitingList