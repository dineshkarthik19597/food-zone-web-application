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
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItem',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],

  orderHistory: [
    {
      items: [
        {
          item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'FoodItem',
          },
          quantity: Number,
        }
      ],
      totalAmount: Number,
      orderDate: {
        type: Date,
        default: Date.now,
      }
    }
  ]
}, { timestamps: true }); // Adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);
