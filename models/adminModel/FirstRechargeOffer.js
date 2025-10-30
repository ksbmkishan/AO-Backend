const mongoose = require('mongoose');

const firstRechargeOfferSchema = new mongoose.Schema({
  first_recharge_plan_amount: {
    type: Number,
    required: true
  },
  first_recharge_plan_extra_percent: {
    type: Number,
    default: 0 // Default value if not provided
  },
  first_recharge_status: {
    type: String,
    enum: ['Active', 'Inactive'], // Assuming status can be either Active or Inactive
    default: 'Active'
  }
},{ collection: 'FirstRechargeOffer', timestamps: true });

const FirstRechargeOffer = mongoose.model('FirstRechargeOffer', firstRechargeOfferSchema);

module.exports = FirstRechargeOffer;
