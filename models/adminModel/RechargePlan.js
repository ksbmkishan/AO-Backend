const mongoose = require('mongoose');

const rechargePlanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    default: 0 // Default value if not provided
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  recharge_status: {
    type: String,
    enum: ['Active', 'Inactive'], // Assuming status can be either Active or Inactive
    default: 'Active'
  }
},{ collection: 'RechargePlan', timestamps: true });

const RechargePlan = mongoose.model('RechargePlan', rechargePlanSchema);

module.exports = RechargePlan;
