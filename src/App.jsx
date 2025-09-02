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
import Success from './components/Success';
import Cancel from './components/Cancel';
import Done from './components/Done';
import Checkout from './components/Checkout';
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

  const HomePage = () => (
    <div style={{
      minHeight: '100vh',
      backgroundColor: backgroundTokens.surface
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: backgroundTokens.offset,
        borderBottom: `1px solid ${borderTokens.default}`,
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            ...applyTypography('display', 'large'),
            color: textTokens.default,
            margin: 0,
            cursor: 'pointer'
          }} onClick={() => window.location.href = '/'}>
            🧗 Climb Shop
          </h1>
          
          <Button
            variant="secondary"
            onClick={() => setIsCartOpen(true)}
          >
            Cart ({totalItems})
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h2 style={{
            ...applyTypography('display', 'xlarge'),
            color: textTokens.default,
            marginBottom: '16px'
          }}>
            Climbing Chalkbags
          </h2>
          <p style={{
            ...applyTypography('body', 'large'),
            color: textTokens.subdued,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover our collection of high-quality chalkbags designed for climbers of all levels. 
            Removable charms. Take your favorite labubu on your outdoor adventures.
          </p>
        </div>

        <ProductGrid 
          products={products}
          onAddToCart={addToCart}
        />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: backgroundTokens.backdrop,
        padding: '40px 24px',
        marginTop: '80px',
        textAlign: 'center'
      }}>
        <p style={{
          ...applyTypography('body', 'small'),
          color: textTokens.subdued
        }}>
          Demo store powered by Stripe • Built with React and design tokens
        </p>
      </footer>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999
        }} onClick={() => setIsCartOpen(false)} />
      )}

      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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