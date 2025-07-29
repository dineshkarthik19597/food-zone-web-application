import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Snacks from './components/Snacks';
import Beverage from './components/Beverage';
import MainCourse from './components/MainCourse';
import Dessert from './components/Dessert';
import OrderHistrory from './components/OrderHistrory';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/snacks" element={<Snacks />} />
      <Route path="/beverage" element={<Beverage />} />
      <Route path="/main-course" element={<MainCourse />} />
      <Route path="/dessert" element={<Dessert />} />
      <Route path='/order-history' element={<OrderHistrory />} />
    </Routes>
  );
}

export default App;


