const mongoose = require("mongoose");

const LiveStreamingSchema = new mongoose.Schema(
  {
    astrologerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer",
    },

    liveId: {
      type: String,
      default: "",
    }, 

    startTime: {
      type: Date,
      default: null,
    },

    voiceCallPrice: {
      type: Number,
      default: 0,
    },

    vedioCallPrice: {
      type: Number,
      default: 0,
    },

    commissionVedioCallPrice: {
      type: Number,
      default: 0,
    },

    sessionTime: {
      type: Number,
      default: 0,
    },

    liveDuration: {
      type: Number,
      default: 0,
    },

    endTime: {
      type: Date,
      default: null,
    },

    totalVoiceCall: {
      type: Number,
      default: 0,
    },

    totalVedioCall: {
      type: Number,
      default: 0,
    },

    totalGiftShared: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Created', 'Ongoing', 'Completed'],
      default: "Created",
    },
  },
  { collection: "LiveStreaming", timestamps: true }
);

const LiveStreaming = mongoose.model("LiveStreaming", LiveStreamingSchema);

module.exports = LiveStreaming;
