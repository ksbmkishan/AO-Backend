const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: ""
    }
},{collection: "Prompt", timestamps: true });

const Prompt = mongoose.model('Prompt', PromptSchema);

module.exports = Prompt;