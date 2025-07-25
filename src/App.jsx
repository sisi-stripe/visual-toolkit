import React from 'react';
import {
  applyTypography,
  hues,
  textTokens,
  backgroundTokens,
  borderTokens
} from './design-system';
import Button from './components/Button';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: backgroundTokens.surface,
      padding: '24px'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '48px',
        borderRadius: '8px',
        backgroundColor: backgroundTokens.offset,
        border: `1px solid ${borderTokens.default}`,
        maxWidth: '600px'
      }}>
        {/* Use applyTypography directly from your design system */}
        <h1 style={{
          ...applyTypography('display', 'xlarge'),
          color: textTokens.default,
          marginBottom: '16px'
        }}>
          Hello World!
        </h1>
        
        {/* Subtitle with design system tokens */}
        <p style={{
          ...applyTypography('body', 'large'),
          color: textTokens.subdued,
          marginBottom: '32px'
        }}>
          This component is styled using our design system primitives
        </p>
        
        <Button
            variant="primary"
            onClick={() => alert('Button clicked')}
        >
            I am a button
        </Button>
      </div>
    </div>
  );
}

export default App;