const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
categoryName: {
    hindi: String,
    english: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
}, {collection: 'ChatbotQACategory'});

module.exports = mongoose.model("ChatbotQACategory", CategorySchema);
