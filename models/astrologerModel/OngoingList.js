const mongoose = require('mongoose');

const ongoingListSchema = mongoose.Schema({    
    astrologer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astrologer'
    }],
    customer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers' // Reference to the MainExpertise model
    }],
    endTime: {
        type: Date, 
    }

}, { collection: 'OngoingList', timestamps: true })

const OngoingList = mongoose.model('OngoingList', ongoingListSchema)

module.exports = OngoingList