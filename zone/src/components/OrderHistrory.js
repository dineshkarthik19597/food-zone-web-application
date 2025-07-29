import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';
import Navbar from './Navbar';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userEmail = sessionStorage.getItem('userEmail');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${encodeURIComponent(userEmail)}/orders`);
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Could not fetch order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div className="order-history-container">
      <Navbar />
      <h2>Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.item_name} ({item.item_type}) - ₹{item.item_price} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
