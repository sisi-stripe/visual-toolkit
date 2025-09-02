import React from 'react';
import { 
  applyTypography, 
  textTokens, 
  backgroundTokens, 
  borderTokens,
  hues 
} from '../src/design-system';
import ProductGrid from '../src/components/ProductGrid';
import Cart from '../src/components/Cart';

// This is the homepage component
export default function HomePage({ 
  cartItems, 
  onAddToCart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onCheckout, 
  isCartOpen, 
  onCartClose,
  onCartOpen 
}) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: backgroundTokens.default,
      color: textTokens.default
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: backgroundTokens.subtle,
        borderBottom: `1px solid ${borderTokens.default}`,
        padding: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          ...applyTypography('heading', 'bold'),
          margin: '0 0 8px 0',
          color: hues.blue[600]
        }}>
          🧗 Climb Shop
        </h1>
        <p style={{
          ...applyTypography('body', 'normal'),
          margin: 0,
          color: textTokens.subdued
        }}>
          Premium climbing chalkbags for your next adventure
        </p>
      </div>

      {/* Cart Button */}
      <div style={{ 
        position: 'fixed', 
        top: '24px', 
        right: '24px', 
        zIndex: 1000 
      }}>
        <button
          onClick={onCartOpen}
          style={{
            backgroundColor: hues.blue[500],
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px' }}>
        <ProductGrid onAddToCart={onAddToCart} />
      </div>

      {/* Cart Component */}
      <Cart
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveFromCart={onRemoveFromCart}
        onCheckout={onCheckout}
        isOpen={isCartOpen}
        onClose={onCartClose}
      />
    </div>
  );
}
