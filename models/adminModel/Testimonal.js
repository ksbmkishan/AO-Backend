const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  image: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    default:''
  },
  description_hi:{
    type: String,
    default:''
  },
  rating: {
    type: Number,
    default: 5
  }
}, { collection: 'Testimonial', timestamps: true });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
