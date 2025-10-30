const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    default: ""  // Default to an empty string if not provided
  },
  description_hi: { 
    type: String, 
    default: ""  // Default to an empty string if not provided
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EcommerceCategory', // Ensure this references the correct category model
    required: true
  },
  image: { 
    type: String, 
    default: ""  // Default to an empty string if no image provided
  },
  quantity: { 
    type: Number, 
    default: 0  // Default quantity set to 0 if not specified
  },
  bannerImage: [{
    type: String, 
    default: ""  // Default to an empty string if no banner images provided
  }],
  adminCommissionPercentage: { 
    type: Number, 
    default: 0  // Default commission percentage is 0
  }
}, {
  collection: 'Products', timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
