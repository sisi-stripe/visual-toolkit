import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with publishable key from environment variables
const stripePromise = loadStripe(
  import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here'
);

export const createCheckoutSession = async (items) => {
  try {
    console.log('Creating checkout session for items:', items);
    
    // Store items in sessionStorage and redirect
    sessionStorage.setItem('checkoutItems', JSON.stringify(items));
    window.location.href = '/checkout';
    
    return { success: true };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return { success: false, error: error.message };
  }
};

// Alternative function for direct priceId checkout
export const checkoutWithPriceId = (priceId) => {
  window.location.href = `/checkout/${priceId}`;
};

export default stripePromise;
