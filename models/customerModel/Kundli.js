const mongoose = require("mongoose");

const kundliSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    name: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    tob: {
      type: Date,
      default: null,
    },
    place: {
      type: String,
      default: '',
    },
    lat: {
      type: Number,
      default: 0,
    },
    lon: {
      type: Number,
      default: 0,
    }
  },
  { collection: "Kundli", timestamps: true }
);

module.exports = mongoose.model("Kundli", kundliSchema);
