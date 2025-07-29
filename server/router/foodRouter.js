// server/routes/foodRouter.js
const express = require('express');
const router = express.Router(); // ✅ Correct

const {
  getAllFoodItems,
  getItemsByType,
  searchFood
} = require('../controller/foodController');

// Fetch all food items
router.get('/all', getAllFoodItems);

// Fetch by category (e.g., Snacks, Beverage, etc.)
router.get('/type', getItemsByType); // Usage: /api/food/type?item_type=Snacks

// Search food by name
router.get('/search', searchFood);   // Usage: /api/food/search?item_name=Pizza

module.exports = router;
