import React from 'react';
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens,
  hues 
} from '../src/design-system';
import Button from '../src/components/Button';

const Cancel = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: backgroundTokens.surface,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: backgroundTokens.offset,
        border: `1px solid ${borderTokens.default}`,
        borderRadius: '8px',
        padding: '48px',
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        {/* Cancel Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: hues.orange[500],
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <span style={{
            fontSize: '40px',
            color: 'white'
          }}>
            !
          </span>
        </div>

        <h1 style={{
          ...applyTypography('display', 'xlarge'),
          color: textTokens.default,
          marginBottom: '16px'
        }}>
          Payment Cancelled
        </h1>
        
        <p style={{
          ...applyTypography('body', 'large'),
          color: textTokens.subdued,
          marginBottom: '32px'
        }}>
          Your payment was cancelled. No charges were made to your account. 
          Feel free to continue shopping when you're ready!
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
          >
            Continue Shopping
          </Button>
          
          <Button
            variant="primary"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
