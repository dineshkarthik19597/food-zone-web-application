
const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, user: { name: newUser.name } });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ success: false, message: 'Registration failed', error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        cart: user.cart,
        orderHistory: user.orderHistory,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ success: false, message: 'Login failed', error: err });
  }
};

exports.getUserData = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
    success: true,
    user: {
    _id: user._id, // ✅ Add this
    name: user.name,
    email: user.email,
    address: user.address,
    cart: user.cart,
    orderHistory: user.orderHistory,
  },
});

  } catch (err) {
    console.error('Fetch User Error:', err);
    res.status(500).json({ message: 'Failed to retrieve user data', error: err });
  }
};

exports.addToCart = async (req, res) => {
  const { useremail } = req.query;
  console.log('req.body:', req.body);

  const { itemId, item_name, item_type, item_image,item_price} = req.body;

  try {
    const user = await User.findOne({ email:useremail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = {
      itemId,
      item_name,
      item_type,
      item_image,
      item_price,
      quantity: 1,
    };

    user.cart.push(item);
    await user.save();

    res.status(200).json({ success: true, message: 'Item added to cart', cart: user.cart });
  } catch (err) {
    console.error('Add to Cart Error:', err);
    res.status(500).json({ success: false, message: 'Failed to add item', error: err });
  }
};


exports.getCart = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error('Get Cart Error:', err);
    res.status(500).json({ success: false, message: 'Failed to get cart', error: err });
  }
};




exports.clearCart = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const user = await User.findOne({email: userEmail});
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('Clear Cart Error:', err);
    res.status(500).json({ success: false, message: 'Failed to clear cart', error: err });
  }
};

exports.updateAddress = async (req, res) => {
  const { userEmail } = req.params;
  const { address } = req.body;

  try {
    const user = await User.findOneAndUpdate({ email: userEmail }, { address }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, message: 'Address updated', address: user.address });
  } catch (err) {
    console.error('Update Address Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update address', error: err });
  }
};

exports.getAddress = async (req,res)=>{
  const {userEmail}=req.params;
  try {

    const user =await User.findOne({email : userEmail});
    if(!user) return res.status(404).json({meassage: 'User not found'});
    res.status(200).json({success: true, address: user.address});

  }catch (err){
    console.error('get Address Error:',err);
    res.status(500).json({success:false,message: 'Faild to featch address',error: err});
  }
};

exports.placeOrder = async (req, res) => {
  const { userEmail } = req.params;
  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const totalAmount = user.cart.reduce((sum, item) => sum + (item.item_price * item.quantity), 0);

    const newOrder = {
      items: user.cart.map(item => ({
        itemId: item.itemId,
        item_name: item.item_name,
        item_type: item.item_type,
        item_price: item.item_price,
        quantity: item.quantity,
      })),
      totalAmount,
      orderDate: new Date(),
    };

    user.orderHistory.push(newOrder);
    user.cart = []; // Clear the cart after placing the order
    await user.save();

    res.status(200).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Place Order Error:', err);
    res.status(500).json({ success: false, message: 'Failed to place order', error: err });
  }
};

exports.getOrderHistory = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const formattedOrders = user.orderHistory.map(order => ({
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
      items: order.items.map(item => ({
        itemId: item.itemId,
        item_name: item.item_name,
        item_type: item.item_type,
        item_price: item.item_price,
        quantity: item.quantity,
      })),
    }));

    res.status(200).json({ success: true, orders: formattedOrders });
  } catch (err) {
    console.error('Get Order History Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
  }
};
