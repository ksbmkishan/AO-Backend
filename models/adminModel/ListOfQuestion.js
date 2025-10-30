const mongoose = require('mongoose');
const listOfQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AskAstrologer'
    }
});

const ListOfQuestion = mongoose.model('ListOfQuestion', listOfQuestionSchema);

module.exports = ListOfQuestion;