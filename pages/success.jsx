import React from 'react';
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens,
  hues 
} from '../src/design-system';
import Button from '../src/components/Button';

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');

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
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: hues.green[500],
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
            ✓
          </span>
        </div>

        <h1 style={{
          ...applyTypography('display', 'xlarge'),
          color: textTokens.default,
          marginBottom: '16px'
        }}>
          Payment Successful!
        </h1>
        
        <p style={{
          ...applyTypography('body', 'large'),
          color: textTokens.subdued,
          marginBottom: '24px'
        }}>
          Thank you for your purchase! Your climbing chalkbags will be shipped to you soon.
        </p>

        {sessionId && (
          <p style={{
            ...applyTypography('body', 'small'),
            color: textTokens.subdued,
            marginBottom: '32px',
            backgroundColor: backgroundTokens.backdrop,
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'monospace'
          }}>
            Order ID: {sessionId}
          </p>
        )}

        <Button
          variant="primary"
          onClick={() => window.location.href = '/'}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default Success;
