const mongoose = require('mongoose');

const askQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false,
        unique: true
    }
}, { collection: 'AskQuestion', timestamps: true });

const AskQuestion = mongoose.model('AskQuestion', askQuestionSchema);

module.exports = AskQuestion;

