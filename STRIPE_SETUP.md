# Stripe Setup Instructions

## Quick Start

This climbing chalkbag store now has **full embedded Stripe checkout** integration! Follow these steps to enable real payments:

### 1. Get Your Stripe Keys

1. Sign up for a [Stripe account](https://stripe.com) if you don't have one
2. Get your **publishable key** from the Stripe Dashboard (starts with `pk_test_` for testing)
3. Get your **secret key** (starts with `sk_test_`) for backend integration

### 2. Configure Environment Variables

Update your `.env` file with your actual Stripe keys:

```bash
# Replace these with your actual keys from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_51ABC123...
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51XYZ789...
DOMAIN=http://localhost:3000

# Optional: For webhook verification
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Available API Endpoints

Your backend now includes these Stripe endpoints:

#### Create Checkout Session
```bash
POST /api/create-checkout-session
```
- **Body**: `{ items: [...] }` or `{ priceId: "price_123" }`
- **Response**: `{ clientSecret: "...", id: "cs_123" }`
- **Supports**: Both dynamic products and predefined Price IDs
- **Mode**: Embedded UI with automatic payment/subscription detection

#### Session Status
```bash
GET /api/session-status?session_id=cs_123
```
- **Response**: `{ status: "complete", customer_email: "..." }`

#### Customer Portal
```bash
POST /api/create-portal-session
```
- **Body**: `{ session_id: "cs_123" }`
- **Response**: Redirects to Stripe billing portal

#### Webhooks
```bash
POST /api/webhook
```
- **Handles**: All Stripe events with proper signature verification
- **Events**: `checkout.session.completed`, `customer.subscription.*`, etc.

### 4. Test the Current Implementation

**Without Stripe Keys (Demo Mode):**
- ✅ Full shopping cart functionality
- ✅ Backend API calls working
- ✅ Embedded checkout session creation
- ✅ Session status tracking
- ⚠️ Shows error about missing/invalid Stripe keys

**With Valid Stripe Keys:**
- ✅ Real Stripe embedded checkout
- ✅ Payment processing
- ✅ Success/failure handling
- ✅ Customer portal access
- ✅ Webhook event processing

### 5. How to Test

1. **Add your Stripe keys** to `.env`
2. **Restart the dev server**: `npm run dev`
3. **Visit**: http://localhost:3000
4. **Add chalkbags to cart**
5. **Click "Checkout with Stripe"**
6. **You'll be redirected to `/done`** which shows the session status

### 6. Testing with Stripe

Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0000 0000 3220
- **Subscription**: Use any test card with a recurring price

### 7. Webhook Testing

To test webhooks locally:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:4242/api/webhook
```

This will give you a webhook secret to add to your `.env` file.

## Architecture Overview

### Frontend (React)
```
src/
├── components/
│   ├── Button.jsx          # Reusable button with variants
│   ├── ProductCard.jsx     # Individual product display
│   ├── ProductGrid.jsx     # Product catalog layout
│   ├── Cart.jsx           # Shopping cart component
│   ├── Success.jsx        # Payment success page
│   ├── Cancel.jsx         # Payment cancelled page
│   └── Done.jsx           # Embedded checkout completion
├── data/
│   └── products.js        # Product data and pricing
├── utils/
│   └── stripe.js          # Stripe client integration
└── design-system/         # Design tokens and utilities
```

### Backend (Express)
```
server.js                   # Main server with all Stripe endpoints
├── POST /api/create-checkout-session
├── GET  /api/session-status
├── POST /api/create-portal-session
├── POST /api/webhook
└── GET  /api/health
```

## Advanced Features

### Dual Checkout Support
The server supports both:
1. **Dynamic products** (your chalkbags): Pass `{ items: [...] }`
2. **Predefined prices**: Pass `{ priceId: "price_123" }`

### Embedded UI
Uses Stripe's embedded checkout for a seamless user experience:
- No redirect to external Stripe page
- Customizable appearance
- Built-in error handling
- Mobile optimized

### Subscription Ready
Automatically detects if a Price ID is recurring and switches to subscription mode.

Happy climbing! 🧗‍♀️
