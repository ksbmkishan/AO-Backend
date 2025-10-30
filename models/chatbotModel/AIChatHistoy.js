// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   role: { type: String, enum: ['user', 'assistant'], required: true },
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const chatHistorySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
//   conversationId: { type: String, required: false },
//   messages: [messageSchema],
//   createdAt: { type: Date, default: Date.now },
// }, { collection: 'UserAIChatHistory' });

// module.exports = mongoose.model("UserAIChatHistory", chatHistorySchema);


const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  contentHindi: { type: String, required: false }, // For storing Hindi translation
  contentEnglish: { type: String, required: false }, // For storing English translation
  timestamp: { type: Date, default: Date.now },
});

const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
  conversationId: { type: String, required: false },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
}, { collection: 'UserAIChatHistory' });

module.exports = mongoose.model("UserAIChatHistory", chatHistorySchema);
