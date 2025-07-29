// server/routes/userRouter.js
const express = require('express');
const router = express.Router();
const registerUser = require('../controller/userController').registerUser;
const loginUser = require('../controller/userController').loginUser;
const getUserData =require('../controller/userController').getUserData;
const addToCart = require('../controller/userController').addToCart;
const getCart = require('../controller/userController').getCart;
const clearCart = require('../controller/userController').clearCart;
const updateAddress = require('../controller/userController').updateAddress;
const getAddress = require('../controller/userController').getAddress;
const getOrderHistory = require('../controller/userController').getOrderHistory;
const placeOrder = require('../controller/userController').placeOrder;

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// User Data
router.get('/profile', getUserData); 

// Cart Operations
router.post('/cart', addToCart);
router.get('/:userEmail/cart', getCart);
router.delete('/:userEmail/cart', clearCart);

// Address and Orders
router.put('/:userEmail/address', updateAddress);
router.get('/address/:userEmail', getAddress); // ✅ this must match exactly
router.get('/:userEmail/orders', getOrderHistory);
router.post('/:userEmail/orders', placeOrder);

module.exports = router;
