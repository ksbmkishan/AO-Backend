const mongoose = require("mongoose");

const bhagwanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, 
  subImages: [{ type: String }], 
});

const Bhagwan = mongoose.model("Bhagwan", bhagwanSchema);

module.exports = Bhagwan;