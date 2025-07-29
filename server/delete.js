const mongoose = require('mongoose');
const FoodItem = require('./model/FoodModel'); // update with correct path if needed
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB ✅');
    return FoodItem.deleteMany({});
  })
  .then(result => {
    console.log(`✅ Deleted ${result.deletedCount} documents`);
  })
  .catch(err => {
    console.error('❌ Deletion failed:', err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
