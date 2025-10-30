const mongoose = require("mongoose");

const PoojaVRItemSchema = new mongoose.Schema(
    {
        itemName: { type: String },
        itemImage: { type: String },
        itemPrice: { type: Number },
        keywords: { type: [String], default: [] },
        duration: { type: Number, default: 0 },
        payment: {
            type: String,
            enum: ["add", "deduct"],
            required: true
        },
        animationType:  {type: String, default:  ''},
        audio: {type: String}
    },
    { collection: 'VRPoojaItems', timestamps: true }
);

const PoojaVRItem = mongoose.model("VRPoojaItems", PoojaVRItemSchema);

module.exports = PoojaVRItem;
