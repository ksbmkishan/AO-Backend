const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    title_hi: { type: String, default: ''},
    image: { type: String, required: true },
    description: { type: String, required: true },
    description_hi: { type: String, default: ''},
    aarti: { type: String},
    aarti_mp3: { type: String, default: ''},
    aartilyrics: { type: String},
    chalisa: { type: String },
    chalisa_mp3: { type: String, default: ''},
    chalisalyrics: { type: String },
    mantralink: { type: String },
    mantralink_mp3: { type: String, default: ''},
    mantralyrics: { type: String },
    bhajan: { type: String},
    bhajan_mp3: { type: String, default: ''},
    bhjanlyrics: { type: String},
    bulkAudioUpload: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
        url_mp4: { type: String, default: ''},
        url_mp3: { type: String, default: ''},
        title: { type: String, required: true },
        artist: { type: String, required: true },
        artwork: { type: String, required: true },
      },
    ],
    bulkImageUpload: { type: [String], default: [] },
    temple: { type: String, required: true, enum: ["Sanatan", "Navgrah"] },
    vr_mode: [ 
      {
 
        vr_title: { type: String }, // VR title (e.g., "EntryGate", "Garbhgrah")
        vr_image: { type: String }, // Image for the VR area
        tags: { type: [String], default: [] }, // Tags for the VR experience
        vr_type: { type: String, enum: ["3D", "360", "AR", "VR"], default: "VR" },
        vr_darshan_fake_user: {type: Number, default: 0}, // Fake user count for VR darshan
        vr_darshan_real_user: {type: Number, default: 0}, // Real user count for VR darshan
        vr_visible_puja: {type: Number, default: 0},
      } 
    ],
     temple_vr_darshan: {
      price: { type: Number, default: 0 }, // e.g., 199.99
      type: { type: String, enum: ["Add", "Deduct"], default: "Deduct" },
    },
  },
  {
    timestamps: true 
  }
);

const ContentDarshan = mongoose.model("Content", ContentSchema);

module.exports = ContentDarshan;
