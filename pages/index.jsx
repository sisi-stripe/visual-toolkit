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
import Button from '../src/components/Button';
import { products } from '../src/data/products';

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
          ...applyTypography('heading', 'xlarge'),
          margin: '0 0 8px 0',
          color: hues.gray[900]
        }}>
          🧗 Climb Shop
        </h1>
        <p style={{
          ...applyTypography('body', 'normal'),
          margin: 0,
          color: textTokens.subdued
        }}>
          Premium climbing chalkbags and gear for your next adventure
        </p>
      </div>

      {/* Cart Button */}
      <div style={{ 
        position: 'fixed', 
        top: '24px', 
        right: '24px', 
        zIndex: 1000 
      }}>
      
        <Button
          variant="primary"
          onClick={onCartOpen}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          🛒 Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </Button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 24px' }}>
        <ProductGrid products={products} onAddToCart={onAddToCart} />
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
