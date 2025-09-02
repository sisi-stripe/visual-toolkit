import React, { useState, useEffect } from "react";
import { useSearchParams, Link, Navigate } from "react-router-dom";
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens,
  hues 
} from '../src/design-system';
import Button from '../src/components/Button';

export default function Done() {
  // Get the checkout session ID from the URL
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the checkout session status as soon as the page loads
    if (sessionId) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4242'}/api/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Session status data:', data);
          if (data.error) {
            setError(data.error);
          } else {
            setStatus(data.status);
            setCustomerEmail(data.customer_email);
          }
        })
        .catch((error) => {
          console.error('Error fetching session status:', error);
          setError('Unable to verify payment status. Please contact support if you were charged.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError('No session ID provided');
      setIsLoading(false);
    }
  }, [sessionId]);

  // Loading state
  if (isLoading) {
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
            Confirming your purchase...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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
          border: `2px solid ${hues.red[300]}`,
          borderRadius: '12px',
          padding: '48px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          {/* Error Icon */}
          <div style={{
            fontSize: '64px',
            marginBottom: '24px',
            animation: 'pulse 2s infinite'
          }}>
            ⚠️
          </div>
          
          <h1 style={{
            ...applyTypography('heading', 'large'),
            color: hues.red[600],
            marginBottom: '16px'
          }}>
            Oops! Something went wrong
          </h1>
          
          <p style={{
            ...applyTypography('body', 'medium'),
            color: textTokens.subdued,
            marginBottom: '32px'
          }}>
            {error}
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/">
              <Button variant="primary">
                Back to Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if payment failed or was canceled
  if (status === "open") {
    return <Navigate to="/" />;
  }

  // Success state - the main attraction! 🎉
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
        border: `2px solid ${hues.green[300]}`,
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {status === 'complete' && (
          <>
            {/* Success Animation */}
            <div style={{
              fontSize: '80px',
              marginBottom: '24px',
              animation: 'bounce 1s ease-in-out infinite'
            }}>
              🧗‍♀️✨
            </div>
            
            {/* Success Message */}
            <h1 style={{
              ...applyTypography('heading', 'large'),
              color: hues.green[600],
              marginBottom: '16px'
            }}>
              Purchase Successful! 🎉
            </h1>
            
            <p style={{
              ...applyTypography('body', 'large'),
              color: textTokens.default,
              marginBottom: '8px'
            }}>
              Thank you for your order!
            </p>
            
            <p style={{
              ...applyTypography('body', 'medium'),
              color: textTokens.subdued,
              marginBottom: '32px'
            }}>
              Your climbing chalkbag is on its way to help you conquer new heights! 🏔️
            </p>

            {/* Order Details */}
            <div style={{
              backgroundColor: backgroundTokens.subtle,
              border: `1px solid ${borderTokens.default}`,
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '32px',
              textAlign: 'left'
            }}>
              <h3 style={{
                ...applyTypography('heading', 'small'),
                color: textTokens.default,
                marginBottom: '16px'
              }}>
                Order Confirmation
              </h3>
              
              {customerEmail && (
                <p style={{
                  ...applyTypography('body', 'medium'),
                  color: textTokens.subdued,
                  marginBottom: '8px'
                }}>
                  📧 Confirmation email sent to: <strong>{customerEmail}</strong>
                </p>
              )}
              
              {sessionId && (
                <p style={{
                  ...applyTypography('body', 'small'),
                  color: textTokens.subdued,
                  fontFamily: 'monospace',
                  backgroundColor: backgroundTokens.backdrop,
                  padding: '8px',
                  borderRadius: '4px',
                  marginTop: '8px'
                }}>
                  Order ID: {sessionId.substring(0, 24)}...
                </p>
              )}
            </div>

            {/* Next Steps */}
            <div style={{
              backgroundColor: hues.blue[50],
              border: `1px solid ${hues.blue[200]}`,
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '32px',
              textAlign: 'left'
            }}>
              <h4 style={{
                ...applyTypography('heading', 'small'),
                color: hues.blue[700],
                marginBottom: '12px'
              }}>
                What happens next?
              </h4>
              
              <ul style={{
                ...applyTypography('body', 'medium'),
                color: hues.blue[600],
                margin: 0,
                paddingLeft: '20px'
              }}>
                <li style={{ marginBottom: '8px' }}>📦 We'll prepare your chalkbag for shipping</li>
                <li style={{ marginBottom: '8px' }}>🚚 You'll receive tracking information via email</li>
                <li style={{ marginBottom: '8px' }}>🧗‍♀️ Get ready for your next climbing adventure!</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center'
            }}>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4242'}/api/create-portal-session`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                  });
                  const data = await response.json();
                  if (data.url) {
                    window.location.href = data.url;
                  }
                } catch (error) {
                  console.error('Error creating portal session:', error);
                  alert('Failed to create billing portal session');
                }
              }}>

                <Button
                  variant="secondary"
                  type="submit"
                  style={{ width: '100%', marginBottom: '12px' }}
                >
                  📄 Manage Billing & Receipt
                </Button>
              </form>
              
              <Link to="/" style={{ width: '100%' }}>
                <Button
                  variant="primary"
                  style={{ width: '100%' }}
                >
                  🛍️ Continue Shopping
                </Button>
              </Link>
              
              <p style={{
                ...applyTypography('body', 'small'),
                color: textTokens.subdued,
                marginTop: '16px'
              }}>
                Need help? Contact us at support@climbshop.com
              </p>
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}