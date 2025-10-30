const mongoose = require("mongoose");

const videoCallHistorySchema = mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LinkedProfile",
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
      default: null
    },
    durationInSeconds: {
      type: Number,
      default: 0,
    },
    callPrice: {
      type: Number,
      default: 0,
    },
    commissionPrice: {
      type: Number,
      default: 0,
    },
    totalCallPrice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String, 
      default: "Created", 
    },
    transactionId: {
      type: String,
      default: "",
    },
    callId: {
      type: String,
      default: "",
    },
  },
  { collection: "VideoCallHistory", timestamps: true }
);

// const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)

module.exports = mongoose.model("VideoCallHistory", videoCallHistorySchema);
