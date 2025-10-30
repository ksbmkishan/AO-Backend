const mongoose = require("mongoose");

const AstrologerRequestsSchema = mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },
    chat_price: {
      type: String,
      default: 0,
    },
    call_price: {
      type: String,
      default: 0,
    },
    startTime: {
      type: Date,
      default: "",
    },
    endTime: {
      type: Date,
      default: "",
    },
    preferredDays: [
      {
        type: String,
        default: "",
      },
    ],
  },
  { collection: "AstrologerRequests", timestamps: true }
);


module.exports = mongoose.model("AstrologerRequests", AstrologerRequestsSchema);
