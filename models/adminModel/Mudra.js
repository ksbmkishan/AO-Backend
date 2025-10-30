const mongoose = require('mongoose');

const mudraSchema = new mongoose.Schema(
  {
    sno: {
      type: String,
      unique: true, // Ensure uniqueness for the sno field
    },
    gifts: {
      type: String,
    },
    credit: {
      type: Number,
      default: 0,
      min: [0, "Credit cannot be negative"], 
    },
    debited: {
      type: Number,
      default: 0,
      min: [0, "Debited amount cannot be negative"], 
    },
    amount: {
      type: Number,
    },
    dateTime: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: String, // Add the userId field
      required: true, // Make it required to ensure it is always provided
    },
  },
  {
    collection: 'Mudra', // Specify the collection name
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Mudra = mongoose.model('Mudra', mudraSchema);

module.exports = Mudra;
