import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // On page load, check sessionStorage (NOT localStorage)
  useEffect(() => {
    const storedUser = sessionStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch(search);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      if (res.data.success) {
        sessionStorage.setItem('userName', res.data.user.name);
        sessionStorage.setItem('userEmail', res.data.user.email);
        setUserName(res.data.user.name);
        setShowModal(false);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      if (res.data.success) {
        sessionStorage.setItem('userName', res.data.user.name);
        sessionStorage.setItem('userEmail', res.data.user.email);
        console.log('user email:',res.data.user.email);
        setUserName(res.data.user.name);
        setShowModal(false);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Registration failed');
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserName('');
    navigate('/');
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-left">
          <span className="brand">🍽️ FoodZone</span>
        </div>

        <input
          type="search"
          placeholder="Search categories"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input"
        />

        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/Cart">Cart</Link>

          {userName ? (
            <>
              <span className="welcome-text">Hi, {userName}</span>
              <span className="logout-text" onClick={handleLogout}>Logout</span>
            </>
          ) : (
            <span className="login-text" onClick={() => setShowModal(true)}>Login</span>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>

            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={isLogin ? handleLogin : handleRegister}>
              {isLogin ? 'Login' : 'Register'}
            </button>

            <p>
              {isLogin ? 'New user?' : 'Already have an account?'}{' '}
              <span
                className="toggle-link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
              >
                {isLogin ? 'Register here' : 'Login here'}
              </span>
            </p>

            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
