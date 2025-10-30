const mongoose = require("mongoose");

const QASchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ChatbotQACategory" },
  questions: {
    hindi: String,
    english: String,
  },
  answer: {
    hindi: String,
    english: String,
  },
  keywords: [String],
}, {collection: 'ChatbotQA'});

module.exports = mongoose.model("ChatbotQA", QASchema);
