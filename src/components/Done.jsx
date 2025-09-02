import React, { useState, useEffect } from "react";
import { useSearchParams, Link, Navigate } from "react-router-dom";
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens,
  hues 
} from '../design-system';
import Button from './Button';

export default function Done() {
  // Get the checkout session ID from the URL
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    // Retrieve the checkout session status as soon as the page loads
    if (sessionId) {
      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4242'}/api/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        // Set the checkout session status in state
        .then((data) => {
          console.log('Session status data:', data);
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
        })
        .catch((error) => {
          console.error('Error fetching session status:', error);
          setStatus('error');
        });
    }
  }, [sessionId]);

  // Show loading indicator until we get checkout session status
  if (!status) {
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: `3px solid ${borderTokens.default}`,
            borderTop: `3px solid ${hues.blue[500]}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            ...applyTypography('body', 'medium'),
            color: textTokens.subdued
          }}>
            Loading payment status...
          </p>
        </div>
      </div>
    );
  }

  // Redirect if payment failed or was canceled
  if (status === "open") {
    return <Navigate to="/" />;
  }

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
        maxWidth: '500px',
        width: '100%'
      }}>
        {status === 'complete' && (
          <>
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
              Your payment was successful. Thank you for your purchase!
            </p>

            {customerEmail && (
              <p style={{
                ...applyTypography('body', 'medium'),
                color: textTokens.subdued,
                marginBottom: '32px'
              }}>
                A confirmation email has been sent to: {customerEmail}
              </p>
            )}

            {/* Show manage billing button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center'
            }}>
              <form action={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4242'}/api/create-portal-session`} method="POST">
                <input type="hidden" name="session_id" value={sessionId} />
                <Button
                  variant="secondary"
                  type="submit"
                  style={{ width: '100%' }}
                >
                  Manage billing information
                </Button>
              </form>
              
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="primary" style={{ width: '100%' }}>
                  Back to products
                </Button>
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 style={{
              ...applyTypography('display', 'xlarge'),
              color: textTokens.default,
              marginBottom: '16px'
            }}>
              Payment Error
            </h1>
            
            <p style={{
              ...applyTypography('body', 'large'),
              color: textTokens.subdued,
              marginBottom: '32px'
            }}>
              There was an error processing your payment. Please try again or contact support.
            </p>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="primary">
                Back to products
              </Button>
            </Link>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
