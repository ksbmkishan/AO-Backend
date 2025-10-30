const mongoose = require('mongoose')

const languageSchema = mongoose.Schema({
    languageName: {
        type: String,
        default: ''
    }
}, { collection: 'Language', timestamps: true })

// const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)

module.exports = mongoose.model('Language', languageSchema);
