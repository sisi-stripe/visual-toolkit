import React from 'react';
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens,
  hues 
} from '../design-system';
import Button from './Button';
import { formatPrice } from '../data/products';

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout, isOpen, onClose }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: backgroundTokens.surface,
      border: `1px solid ${borderTokens.default}`,
      boxShadow: `-4px 0 12px ${hues.gray[200]}`,
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: `1px solid ${borderTokens.default}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{
          ...applyTypography('display', 'large'),
          color: textTokens.default,
          margin: 0
        }}>
          Cart ({items.length})
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: textTokens.subdued
          }}
        >
          ×
        </button>
      </div>
      
      {/* Cart Items */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px'
      }}>
        {items.length === 0 ? (
          <p style={{
            ...applyTypography('body', 'medium'),
            color: textTokens.subdued,
            textAlign: 'center',
            marginTop: '40px'
          }}>
            Your cart is empty
          </p>
        ) : (
          items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              padding: '12px 0',
              borderBottom: `1px solid ${borderTokens.default}`
            }}>
              <img 
                src={item.image} 
                alt={item.name}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginRight: '12px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{
                  ...applyTypography('body', 'medium'),
                  color: textTokens.default,
                  margin: '0 0 4px 0',
                  fontWeight: '600'
                }}>
                  {item.name}
                </h4>
                <p style={{
                  ...applyTypography('body', 'small'),
                  color: textTokens.subdued,
                  margin: '0 0 8px 0'
                }}>
                  {formatPrice(item.price)}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: `1px solid ${borderTokens.default}`,
                      background: backgroundTokens.surface,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    ...applyTypography('body', 'small'),
                    color: textTokens.default,
                    minWidth: '20px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '24px',
                      height: '24px',
                      border: `1px solid ${borderTokens.default}`,
                      background: backgroundTokens.surface,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: hues.red[500],
                      cursor: 'pointer',
                      marginLeft: 'auto',
                      ...applyTypography('body', 'small')
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer */}
      {items.length > 0 && (
        <div style={{
          padding: '20px',
          borderTop: `1px solid ${borderTokens.default}`,
          backgroundColor: backgroundTokens.offset
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{
              ...applyTypography('display', 'large'),
              color: textTokens.default,
              fontWeight: '700'
            }}>
              Total: {formatPrice(total)}
            </span>
          </div>
          <Button 
            variant="primary"
            onClick={onCheckout}
            style={{ width: '100%' }}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
