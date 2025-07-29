// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const foodRouter = require('./router/foodRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON


// Routes

app.use('/api/users', userRouter);
app.use('/api/foods', foodRouter);
// Serve static images from the "images" folder
app.use('/images', express.static('images'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodZoneDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Root route
app.get('/', (req, res) => {
  res.send('🍽️ Welcome to the FoodZone API Server');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
