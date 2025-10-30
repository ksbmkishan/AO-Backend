const mongoose = require("mongoose");

const PanchangMonthSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    year:  { type: Number, default:  ''},
    name: { type: String, default: "" },
    lang: { type: String, default: ""}
  },
  { timestamps: true }
);

const PanchangMonth = mongoose.model("PanchangMonth", PanchangMonthSchema);

module.exports = PanchangMonth;
