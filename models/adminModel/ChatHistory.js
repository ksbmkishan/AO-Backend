const mongoose = require("mongoose");

const chatHistorySchema = mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LinkedProfile",
    },
    transactionId: {
      type: String,
      default: "",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    durationInSeconds: {
      type: Number,
      default: 0,
    },
    chatPrice: {
      type: Number,
      default: 0,
    },
    commissionPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "Created",
    },
    totalChatPrice: {
      type: Number,
      default: 0,
    },
  },
  { collection: "ChatHistory", timestamps: true }
);

// const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
