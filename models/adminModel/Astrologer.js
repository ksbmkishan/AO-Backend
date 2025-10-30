const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const astrologerSchema = mongoose.Schema(
  {
    astrologerName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    alternateNumber: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
      unique: true
    },
    profileImage: {
      type: String,
      default: "",
    },
    chat_price: {
      type: Number,
      default: 0,
    },
    call_price: {
      type: Number,
      default: 0,
    },
    video_call_price: {
      type: Number,
      default: 0,
    },
    commission_video_call_price: {
      type: Number,
      default: 0,
    },
    normal_video_call_price:{
      type: Number,
      default: 0
    },
    commission_normal_video_call_price:{
      type: Number,
      default: 0
    },
    experience: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    zipCode: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    confirm_password: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Number,
      default: 0,
    },
    isSignupCompleted: {
      type: Number,
      default: 0,
    },
    country_phone_code: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      enum: ["INR", "USD"],
    },
    address: {
      type: String,
      default: "",
    },
    free_min: {
      type: Number,
      default: "",
    },
    id_proof_image: {
      type: String,
      default: "",
    },
    pan_proof_image: {
      type: String,
      default: "",
    },
    bank_proof_image: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      default: "",
    },
    fcmToken: {
      type: String,
      default: "",
    },
    webFcmToken: {
      type: String,
      default: "",
    },
    nextOnline: {
      type: Object,
      default: {
        date: null,
        time: null
      }
    },
    unique_id: {
      type: String,
      default: "",
    },
    isOtpVerified: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false, // Default status is offline
    },
    isLive: {
      type: Boolean,
      default: false, // Default status is offline
    },
    preferredDays: [
      {
        type: String,
        default: "",
      },
    ],

    language: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    avg_rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0
    },
    consultation_price: {
      type: String,
      default: 0,
    },
    commission_call_price: {
      type: String,
      default: 0,
    },
    commission_chat_price: {
      type: String,
      default: 0,
    },
    commission_remark: {
      type: String,
      default: "",
    },
    startTime: {
      type: Date,
      default: "",
    },
    endTime: {
      type: Date,
      default: "",
    },
    skill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
      },
    ],
    subSkill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSkills",
      },
    ],

    expertise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expertise",
      },
    ],

    mainExpertise: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MainExpertise", // Reference to the MainExpertise model
      },
    ],
    remedies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Remedies", // Reference to the Remedies model
      },
    ],
    workingOnOtherApps: {
      type: String, // Assuming it's an array of strings, adjust type if it's different
      default: "No",
    },
    activeBankAcount: {
      type: String,
      default: "No",
    },
    activeBankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BankAccount",
    },
    bankAcount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
      },
    ],
    panCard: {
      type: String,
      default: "",
    },
    wallet_balance: {
      type: Number,
      default: 0,
    },
    account_holder_name: {
      type: String,
      default: "",
    },
    account_name: {
      type: String,
      default: "",
    },
    account_type: {
      type: String,
      default: "",
    },
    account_number: {
      type: String,
      default: "",
    },
    IFSC_code: {
      type: String,
      default: "",
    },
    youtubeLink: {
      type: String,
      default: "",
    },
    short_bio: {
      type: String,
      default: "",
    },
    long_bio: {
      type: String,
      default: "",
    },
    astrologers_status: {
      type: String,
      default: "",
    },
    chat_status: {
      type: String, // offline, online, busy
      enum: ['online', 'busy', 'offline'],
      default: "offline",
    },
    call_status: {
      type: String, // offline, online, busy
      enum: ['online', 'busy', 'offline'],
      default: "offline",
    },
    video_call_status: {
      type: String, // offline, online, busy
      enum: ['online', 'busy', 'offline'],
      default: "offline",
    },
    aadharNumber: {
      type: String,
      default: "",
    },
    follower_count: {
      type: Number,
      default: 0,
    },
    enquiry: {
      type: Boolean,
      default: true,
    },
    device_id: {
      type: String,
      default: "",
    },
    live_notification: {
      type: Boolean,
      default: true,
    },
    chat_notification: {
      type: Boolean,
      default: true,
    },
    inquiry_status: {
      type: Boolean,
      default: false,
    },
    call_notification: {
      type: Boolean,
      default: true,
    },
    total_minutes: {
      type: Number,
      default: 0,
    },
    today_earnings: {
      type: Object,
      default: {
        date: new Date(),
        earnings: 0
      }
    }
  },
  { collection: "Astrologer", timestamps: true }
);

astrologerSchema.plugin(mongoosePaginate);

const Astrologer = mongoose.model("Astrologer", astrologerSchema);

module.exports = Astrologer;
