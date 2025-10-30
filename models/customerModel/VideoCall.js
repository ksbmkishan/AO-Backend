const mongoose = require("mongoose");

const VideoCallSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    astrologerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Astrologer",
    },
    callId: {
        type: String,
    },
    videcallPrice: {
        type: String,
    },
    videocommissionPrice: {
        type: String,
    },
    status: {
        type: String,
    },
    totalPrice: {
        type: String,
        default: 0
    }
  },
  { collection: "VideoCall", timestamps: true }
);

module.exports = mongoose.model("VideoCall", VideoCallSchema);