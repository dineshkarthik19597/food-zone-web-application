import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';





function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [userEmail, setUserEmail] = useState('');
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('userEmail');

    if (!storedEmail) {
      alert('Please login to view cart');
      return;
    }

    setUserEmail(storedEmail);
    fetchCart(storedEmail);
    fetchAddress(storedEmail);
  }, []);

  const fetchCart = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/profile?email=${email}`);
      setCart(res.data.user.cart || []);
      console.log('Cart fetched:', res.data.user.cart);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const fetchAddress = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/address/${encodeURIComponent(email)}`);
      if (res.data.address && Object.keys(res.data.address).length > 0) {
        setAddress(res.data.address);
        setHasAddress(true);
        setShowAddressInput(false);
        console.log('Address fetched:', res.data.address);
      } else {
        setHasAddress(false);
        setShowAddressInput(true);
      }
    } catch (err) {
      console.error('Error fetching address:', err);
      setHasAddress(false);
      setShowAddressInput(true);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userEmail}/cart`);
      alert('Cart cleared successfully!');
      setCart([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const handleSaveAddress = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${encodeURIComponent(userEmail)}/address`,
        { address }
      );
      console.log('Address updated:', res.data);
      setHasAddress(true);
      setShowAddressInput(false);
    } catch (err) {
      console.error('Failed to save address', err);
      alert('Failed to save address');
    }
  };

  const placeOrder = async () => {

    if (!address.street.trim() || !address.city.trim() || !address.state.trim() || !address.zip.trim()) {
      setShowAddressInput(true);
      return alert('Please fill in all address fields before placing order.');
    }

    try {
      await axios.put(
        `http://localhost:5000/api/users/${encodeURIComponent(userEmail)}/address`,
        { address }
      );

      await axios.post(`http://localhost:5000/api/users/${encodeURIComponent(userEmail)}/orders`);
      alert('Order placed successfully!');
      setCart([]);
      navigate('/order-history');
    } catch (err) {
      console.error('Order placement failed', err);
      alert('Failed to place order');
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <div className="empty-cart">
               
                <h2>Your cart is empty</h2>
                <p>Looks like you haven’t added anything yet.</p>
          </div>

        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img src={item.item_image} alt={item.item_name} />
                  <div>
                    <h4>{item.item_name}</h4>
                    <p>Type: {item.item_type}</p>
                    <p>Price: ₹{item.item_price}</p>
                    <div className="quantity-controls">
                      <p>Quantity: {item.quantity}</p>
                      <button className="increase-btn" onClick={() => increaseQuantity(index)}>+</button>
                      <button className="increase-btn" onClick={() => decreaseQuantity(index)}>-</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="total-amount">
              <h3>Total Amount: ₹{cart.reduce((total, item) => total + item.item_price * item.quantity, 0)}</h3>
            </div>

            <div className="address-section">
              <h3>Delivery Address</h3>

              {hasAddress && !showAddressInput ? (
                <>
                  <textarea
                    rows="4"
                    readOnly
                    value={`${address.street}, ${address.city}, ${address.state} - ${address.zip}`}
                  />
                  <br />
                  <button onClick={() => setShowAddressInput(true)}>Change Address</button>
                </>
              ) : (
                <>
                  <table>
                    <tbody>
                      <tr>
                        <td>Street:</td>
                        <td>
                          <input
                            type="text"
                            value={address.street}
                            placeholder="Street"
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>City:</td>
                        <td>
                          <input
                            type="text"
                            value={address.city}
                            placeholder="City"
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>State:</td>
                        <td>
                          <input
                            type="text"
                            value={address.state}
                            placeholder="State"
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Zip:</td>
                        <td>
                          <input
                            type="text"
                            value={address.zip}
                            placeholder="Zip"
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={handleSaveAddress}>Save Address</button>
                </>
              )}
            </div>
            <div className='payment-section'>
              <h3>Payment method</h3>
              <section className='payment-options'>
                <div className='payment-option'>
                  <input type='radio' name='payment' value={'cod'} id='cod' />
                  <label htmlFor='cod'>Cash On Delivery</label>
                </div>
                <div className='payment-option'>
                  <input type='radio' name='payment' value={'upi'} id='upi' />
                  <label htmlFor='upi'>UPI</label>
                </div>

              </section>
            </div>

            <div className="cart-buttons">
              <button className="place-btn" onClick={placeOrder}>Place Order</button>
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
