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

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={{
      backgroundColor: backgroundTokens.surface,
      border: `1px solid ${borderTokens.default}`,
      borderRadius: '8px',
      overflow: 'hidden',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 4px 12px ${hues.gray[200]}`
      }
    }}>
      {/* Product Image */}
      <div style={{
        width: '100%',
        height: '240px',
        overflow: 'hidden',
        backgroundColor: backgroundTokens.backdrop
      }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Product Info */}
      <div style={{
        padding: '16px'
      }}>
        <h3 style={{
          ...applyTypography('body', 'large'),
          color: textTokens.default,
          fontWeight: '600',
          marginBottom: '8px',
          lineHeight: '1.3'
        }}>
          {product.name}
        </h3>
        
        <p style={{
          ...applyTypography('body', 'medium'),
          color: textTokens.subdued,
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          {product.description}
        </p>
        
        {/* Features */}
        <ul style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: '16px'
        }}>
          {product.features.map((feature, index) => (
            <li key={index} style={{
              ...applyTypography('body', 'small'),
              color: textTokens.subdued,
              marginBottom: '4px',
              paddingLeft: '12px',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: hues.green[500]
              }}>
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Price and Add to Cart */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px'
        }}>
          <span style={{
            ...applyTypography('display', 'large'),
            color: textTokens.default,
            fontWeight: '700'
          }}>
            {formatPrice(product.price)}
          </span>
          
          <Button 
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
