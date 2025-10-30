const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref:"Customers",required: true }, // optional: can be session ID or user ID
  question: { type: String, required: true },
  answer: { type: String },
  createdAt: { type: Date, default: Date.now }
}, {collection:'UserChatHistory'});

module.exports = mongoose.model("UserChatHistory", chatHistorySchema);


// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     enum: ['user', 'assistant', 'system'],
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const chatHistorySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customers", required: true },
//   conversation: [messageSchema], // store the full message thread
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// }, {
//   collection: 'UserChatHistory'
// });

// module.exports = mongoose.model("UserChatHistory", chatHistorySchema);

