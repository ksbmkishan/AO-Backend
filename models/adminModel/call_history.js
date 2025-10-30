const mongoose = require('mongoose')
const challHistorySchema = mongoose.Schema({
    call_id: {
        type: String,
        default: ''
    },
    user: {
        type: String,
        default: ''
    },
    astrologer: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    },
    charges: {
        type: String,
        default: ''
    },
    recording: {
        type: String,
        default: ''
    },
    date: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
}, { collection: 'CallHistory', timestamps: true })

const CallHistoryModel = mongoose.model('CallHistory', challHistorySchema)

module.exports = CallHistoryModel