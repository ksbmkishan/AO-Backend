const mongoose = require("mongoose");

const welcomeMessageSchema = new mongoose.Schema({
welcomeMessage: {
    hindi: String,
    english: String,
  },
}, {collection: 'ChatbotWelcomeMessage'});

module.exports = mongoose.model("ChatbotWelcomeMessage", welcomeMessageSchema);
