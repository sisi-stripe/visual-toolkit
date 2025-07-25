// src/components/Button.jsx
import React from 'react';
import { applyTypography, hues } from '../design-system';

const Button = ({ children, variant = 'primary', onClick }) => {
  // Get colors based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return hues.blue[500];
      case 'danger': return hues.red[500];
      case 'success': return hues.green[500];
      default: return 'transparent';
    }
  };
  
  // Get text color based on variant
  const getTextColor = () => {
    return ['primary', 'danger', 'success'].includes(variant) ? '#FFFFFF' : hues.gray[800];
  };
  
  // Get border based on variant
  const getBorder = () => {
    return variant === 'secondary' ? `1px solid ${hues.gray[200]}` : 'none';
  };
  
  return (
    <button 
      onClick={onClick}
      style={{
        ...applyTypography('label', 'medium'),
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: getBorder(),
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
        outline: 'none'
      }}
    >
      {children}
    </button>
  );
};

export default Button;