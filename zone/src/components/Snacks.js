import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Snacks.css';
import Navbar from './Navbar';

function Snacks() {
  const [snacksItems, setSnacksItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleCart = (item) => {
    const storedUserEmail = sessionStorage.getItem('userEmail');
    if (!storedUserEmail) {
      alert('Please login to add items to cart');
      return;
    }
    console.log('User Id:', storedUserEmail);

    const cartItem = {
      itemId: Math.random().toString(36).substring(2, 15),
      item_name: item.item_name,
      item_type: item.item_type,
      item_image: item.image,
      item_price: item.item_price,
      quantity: 1,
    };

    axios
      .post(`http://localhost:5000/api/users/cart?useremail=${encodeURIComponent(storedUserEmail)}`, cartItem)
      .then((res) => {
        console.log('Item added:', res.data);
        alert('Item added to cart successfully!');
      })
      .catch((err) => {
        console.error('Error adding item to cart:', err);
      });
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    axios
      .get(`http://localhost:5000/api/foods/search?item_name=${searchTerm}`)
      .then((res) => {
        setSearchResults(res.data.items || []);
      })
      .catch(() => {
        setSearchResults([]);
      });
  }, [searchTerm]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/foods/type?', {
        params: { item_type: 'Snack' },
      })
      .then((res) => {
        setSnacksItems(res.data.items || []);
      })
      .catch(() => {
        setSnacksItems([]);
      });
  }, []);

  const renderCards = (items, isSearch = false) => (
    <div className="card-overlay">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div className="card" key={index}>
            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.item_name}
              className="card-img"
            />
            <h5>{item.item_name}</h5>
            <button className="snack-btn" onClick={() => handleCart(item)}>Add to cart</button>
          </div>
        ))
      ) : (
        <p className="no-data">No snack items available.</p>
      )}
    </div>
  );

  return (
    <div className="main-container">
      <Navbar onSearch={handleSearch} />
      {searchTerm && searchResults.length > 0
        ? renderCards(searchResults, true)
        : renderCards(snacksItems)}
    </div>
  );
}

export default Snacks;
