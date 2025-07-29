const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  item_type: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
