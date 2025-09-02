import React, { useCallback, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { 
  applyTypography, 
  backgroundTokens, 
  textTokens, 
  borderTokens 
} from '../design-system';
import './Checkout.css';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  
  // Get the priceId from the URL params (for direct product checkout)
  const { priceId } = useParams();
  
  // Get cart items from location state or sessionStorage fallback
  const location = useLocation();
  let cartItems = location.state?.cartItems;
  
  // Fallback to sessionStorage if no location state
  if (!cartItems) {
    try {
      const storedItems = sessionStorage.getItem('checkoutItems');
      if (storedItems) {
        cartItems = JSON.parse(storedItems);
        // Clear the stored items after reading
        sessionStorage.removeItem('checkoutItems');
      }
    } catch (error) {
      console.error('Error reading cart items from storage:', error);
    }
  }
  
  console.log('Final cartItems in checkout:', cartItems);

  // Load Stripe with your publishable key
  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
    import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_your_publishable_key_here'
  );
  
  useEffect(() => {
    stripePromise.then((stripe) => {
      console.log('Stripe loaded:', !!stripe);
      setStripeLoaded(!!stripe);
      setIsLoading(false);
    }).catch((err) => {
      console.error('Error loading Stripe:', err);
      setError('Failed to load Stripe');
      setIsLoading(false);
    });
  }, []);

  // Function that creates a Checkout Session
  // This is called automatically by the Checkout Provider
  const fetchClientSecret = useCallback(() => {
    const requestBody = priceId ? { priceId } : { items: cartItems };
    
    console.log('fetchClientSecret called with:', requestBody);
    console.log('cartItems:', cartItems);
    console.log('priceId:', priceId);
    
    return (
      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4242'}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          console.log('Response status:', res.status);
          if (!res.ok) {
            return res.text().then(text => {
              console.error('Server error response:', text);
              throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
            });
          }
          return res.json();
        })
        // Return the checkout session client secret
        .then((data) => {
          console.log('Server response data:', data);
          if (!data.clientSecret) {
            throw new Error('No client secret returned from server');
          }
          console.log('Returning client secret:', data.clientSecret);
          return data.clientSecret;
        })
        .catch((error) => {
          console.error('Error fetching client secret:', error);
          alert('Error creating checkout session: ' + error.message);
          throw error;
        })
    );
  }, [priceId, cartItems]);

  // If no priceId and no cart items, show error
  if (!priceId && (!cartItems || cartItems.length === 0)) {
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
          <h1 style={{
            ...applyTypography('display', 'large'),
            color: textTokens.default,
            marginBottom: '16px'
          }}>
            No Items to Checkout
          </h1>
          <p style={{
            ...applyTypography('body', 'medium'),
            color: textTokens.subdued,
            marginBottom: '24px'
          }}>
            Please add items to your cart before proceeding to checkout.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            style={{
              ...applyTypography('body', 'medium'),
              backgroundColor: '#675DFF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '12px 24px',
              cursor: 'pointer'
            }}
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: backgroundTokens.surface,
      padding: '24px'
    }}>
      {/* Header */}
      <header style={{
        maxWidth: '800px',
        margin: '0 auto 32px auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          ...applyTypography('display', 'large'),
          color: textTokens.default,
          marginBottom: '8px'
        }}>
          🧗 Climb Shop Checkout
        </h1>
        <p style={{
          ...applyTypography('body', 'medium'),
          color: textTokens.subdued
        }}>
          Complete your purchase securely with Stripe
        </p>
      </header>

      {/* Debug info */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 16px auto',
        padding: '16px',
        backgroundColor: backgroundTokens.backdrop,
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <div>Debug Info:</div>
        <div>Cart Items: {cartItems ? cartItems.length : 'null'} items</div>
        <div>Price ID: {priceId || 'none'}</div>
        <div>Cart Items Data: {JSON.stringify(cartItems, null, 2)}</div>
      </div>

      {/* Embedded Checkout */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: backgroundTokens.offset,
        borderRadius: '8px',
        padding: '24px',
        border: `1px solid ${borderTokens.default}`,
        minHeight: '400px'
      }}>
        {(!priceId && (!cartItems || cartItems.length === 0)) ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: textTokens.subdued
          }}>
            <p>No items to checkout. Cart items: {cartItems ? cartItems.length : 'null'}</p>
          </div>
        ) : isLoading ? (
          <div className="checkout-loading">
            <div>
              <div className="loading-spinner"></div>
              <p style={{
                ...applyTypography('body', 'medium'),
                color: textTokens.subdued,
                marginTop: '16px'
              }}>
                Loading Stripe...
              </p>
            </div>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: textTokens.default
          }}>
            <p>Error: {error}</p>
          </div>
        ) : !stripeLoaded ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: textTokens.subdued
          }}>
            <p>Stripe failed to load</p>
          </div>
        ) : (
          <div>
            <p style={{
              ...applyTypography('body', 'small'),
              color: textTokens.subdued,
              marginBottom: '16px'
            }}>
              Initializing secure checkout...
            </p>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout 
                className="checkout" 
                style={{ 
                  minHeight: '400px',
                  width: '100%'
                }}
              />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </div>
  );
}
