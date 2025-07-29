const mongoose = require('mongoose');
const FoodItem = require('./model/FoodModel');
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  return addMultipleItems();
})
.catch((err) => console.error('MongoDB connection error:', err));

// Multiple food items
const items = [
  {
    item_type: 'Snack',
    item_name: 'Samosa',
    item_price: 20,
    image: 'images/samosa.jpg'
  },
  {
    item_type: 'Dessert',
    item_name: 'Gulab Jamun',
    item_price: 50,
    image: 'images/gulabjamun.jpg'
  },
  {
    item_type: 'Beverage',
    item_name: 'Mango Lassi',
    item_price: 90,
    image: 'images/mangolassi.jpg'
  },
  {
    item_type: 'Main Course',
    item_name: 'Paneer Butter Masala',
    item_price: 220,
    image: 'images/panner_butter_masala.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Aloo Gobi',
    item_price: 150,
    image: 'images/Aloo Gobi.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Butter Chicken',
    item_price: 240,
    image: 'images/Butter Chicken.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Chicken Biryani',
    item_price: 280,
    image: 'images/Chicken Biryani.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Chole Bhature',
    item_price: 180,
    image: 'images/Chole Bhature.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Coconut Cooler',
    item_price: 70,
    image: 'images/Coconut cooler.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Egg Curry',
    item_price: 110,
    image: 'images/Egg Curry.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Fish Curry',
    item_price: 210,
    image: 'images/Fish Curry.jpg' 
  },
  {
    item_type: 'Dessert',
    item_name: 'Jalebi',
    item_price: 40,
    image: 'images/Jalebi.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'kadai Panner',
    item_price: 230,
    image: 'images/Kadai Paneer.jpg' 
  },
  {
    item_type: 'Dessert',
    item_name: 'kaju katli',
    item_price: 150,
    image: 'images/kaju katli.jpg' 
  },
  {
    item_type: 'Dessert',
    item_name: 'Kulfi',
    item_price: 70,
    image: 'images/Kulfi.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Lychee Lemonade',
    item_price: 100,
    image: 'images/Lychee Lemonade.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Masala Cola',
    item_price: 60,
    image: 'images/Masala Cola.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Masoor Dal',
    item_price: 90,
    image: 'images/Masoor Dal.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Mutton Korma',
    item_price: 300,
    image: 'images/Mutton Korma.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Palak Paneer',
    item_price: 240,
    image: 'images/Palak Paneer.jpg' 
  },
  {
    item_type: 'Dessert',
    item_name: 'Phirni',
    item_price: 60,
    image: 'images/Phirni.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Prawn Masala',
    item_price: 310,
    image: 'images/Prawn Masala.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Rajma Chawal',
    item_price: 120,
    image: 'images/Rajma Chawal.jpg' 
  },
  {
    item_type: 'Dessert',
    item_name: 'Rasagulla',
    item_price: 120,
    image: 'images/Rasgulla.jpg' 
  },{
    item_type: 'Dessert',
    item_name: 'Rasamalai',
    item_price: 80,
    image: 'images/Rasmalai.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Rose Lemon Fizz',
    item_price: 120,
    image: 'images/Rose Lemon Fizz.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Tandoori Chicken',
    item_price: 260,
    image: 'images/Tandoori Chicken.jpg' 
  },
  {
    item_type: 'Main Course',
    item_name: 'Vegetable Biryani',
    item_price: 200,
    image: 'images/Vegetable Biryani.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Virgin Mojito',
    item_price: 80,
    image: 'images/Virgin Mojito.jpg' 
  },
  {
    item_type: 'Beverage',
    item_name: 'Watermelon Basil Refresher',
    item_price: 90,
    image: 'images/Watermelon Basil Refresher.jpg' 
  },
  {
    item_type: 'Snack',
    item_name: 'Vada pav',
    item_price: 50,
    image: 'images/Vada pav.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Paneer Tikka Sandwich',
    item_price: 80,
    image: 'images/Paneer Tikka Sandwich.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Veg Burger',
    item_price: 120,
    image: 'images/Veg Burger.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Mini Masala Pizza',
    item_price: 180,
    image: 'images/Mini Masala Pizza.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Aloo Tikki Chaat',
    item_price: 60,
    image: 'images/Aloo Tikki Chaat.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Cheese Corn Sandwich',
    item_price: 100,
    image: 'images/Cheese Corn Sandwich.jpg'
  },
  {
    item_type: 'Snack',
    item_name: 'Bhel Puri',
    item_price: 40,
    image: 'images/Bhel Puri.jpg'
  },
];

// Insert into MongoDB
async function addMultipleItems() {
  try {
    await FoodItem.insertMany(items);
    console.log('All items added successfully!');
  } catch (error) {
    console.error('Error inserting items:', error);
  } finally {
    mongoose.disconnect();
  }
}

