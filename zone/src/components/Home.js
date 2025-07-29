import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('userName');
    const storedUserEmail=sessionStorage.getItem('userEmail');
    console.log('user email:',storedUserEmail);
    console.log('user registered:',storedName);
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };




  
   const handleCart = (item) => {
  const storedUserEmail = sessionStorage.getItem('userEmail');
  if (!storedUserEmail) {
    alert('Please login to add items to cart');
    return;
  }
  console.log('User Id:',storedUserEmail);

  const cartItem = {
    itemId: Math.random().toString(36).substring(2, 15),
    item_name: item.item_name,
    item_type: item.item_type,
    item_image: item.image,
    item_price: item.item_price,
    quantity: 1
  };

 axios.post(`http://localhost:5000/api/users/cart?useremail=${encodeURIComponent(storedUserEmail)}`, cartItem)
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
        const result = res.data?.items;
        if (Array.isArray(result)) {
          setSearchResults(result);
        } else {
          console.log('Unexpected response format:',res.data);
          setSearchResults([]);
        }
      })
      .catch((err) => {
        console.error('Search error:', err);
        setSearchResults([]);
      });
  }, [searchTerm]);

  const categoryCards = [
    { item_name: 'Snacks', img: 'images/snacks.jpg' },
    { item_name: 'Main-course', img: 'images/main-course.jpg' },
    { item_name: 'Beverage', img: 'images/mocktails.jpg' },
    { item_name: 'Dessert', img: 'images/dessert.jpg' },
  ];

 
  return (
    <div>
      <Navbar onSearch={handleSearch} />

      <div className="home-container">
        <div className="background-section">
          <div className="brand">
            <h2>Food Zone</h2>
            <p>
              "Food is more than just fuel — it's an experience that brings people together.
              From the rich spices of Indian street snacks to the cheesy comfort of a fresh pizza,
              every bite tells a story."
            </p>
          </div>

          {userName && (
            <div className="user-dashboard">
              <h3>Welcome, {userName} 👋</h3>
              <p>Here’s your personalized dashboard.</p>
            </div>
          )}

          <div className="card-scroll-wrapper">
            <div className="card-overlay">
              {(searchResults.length > 0 ? searchResults : categoryCards).map((item, index) => (
                 <div className="card" key={`${item._id || item.item_name || index}`}>
                    <img
                     src={item.image ? `http://localhost:5000/${item.image}` : item.img}
                     alt={item.item_name}
                     className="card-img"
                   />
                   {searchResults.length > 0 ? (
                   <>
                   <p>{item.item_name}</p>
                   <button
                   className="add-cart-btn"
                   onClick={() => handleCart(item)}
                    >
                     Add to Cart
                  </button>
                     </>
                 ) : (
                  <Link to={`/${item.item_name.toLowerCase().replace(/\s/g, '-')}`}>
                     {item.item_name}
                  </Link>
                 )}
                </div>
               ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
