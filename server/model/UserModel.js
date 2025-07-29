const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },

  cart: [
    {
      itemId: String,
      item_name: String,
      item_type: String,
      item_image: String,
      item_price: {type:Number, required:true},
      quantity: { type: Number, default: 1 },
      total: { type: Number, default: 0 },
    }
  ],

  orderHistory: [
    {
      items: [
        {
          itemId: String,
          item_name: String,
          item_type: String,
          item_price: Number,
          quantity: Number,
        }
      ],
      totalAmount: Number,
      orderDate: {
        type: Date,
        default: Date.now,
      }
    }
  ],
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
