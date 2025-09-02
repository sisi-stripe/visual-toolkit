import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import {
  applyTypography,
  textTokens,
  backgroundTokens,
  borderTokens
} from './design-system';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Button from './components/Button';
import HomePage from '../pages/index';
import Success from '../pages/success';
import Cancel from '../pages/cancel';
import Done from '../pages/done';
import Checkout from '../pages/checkout';
import { products } from './data/products';
import { createCheckoutSession } from './utils/stripe';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    );
  };

  const handleCheckout = async () => {
    try {
      // Store cart items in sessionStorage as backup
      sessionStorage.setItem('checkoutItems', JSON.stringify(cartItems));
      
      // Navigate to checkout page using React Router
      navigate('/checkout', { state: { cartItems } });
      
      setIsCartOpen(false);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed: ' + error.message);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // HomePage component moved to /pages/index.jsx

  return (
    <Routes>
      <Route path="/" element={
        <HomePage 
          cartItems={cartItems}
          onAddToCart={addToCart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onCheckout={handleCheckout}
          isCartOpen={isCartOpen}
          onCartClose={() => setIsCartOpen(false)}
          onCartOpen={() => setIsCartOpen(true)}
        />
      } />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/:priceId" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
      <Route path="/done" element={<Done />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;