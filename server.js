require("dotenv").config();
const { Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const app = express();
const router = express.Router();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Create checkout session with embedded UI
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, priceId } = req.body;

    let session;

    if (priceId) {
      // Handle price ID-based checkout (for predefined products)
      const price = await stripe.prices.retrieve(priceId);
      const priceType = price.type;
      const mode = priceType === 'recurring' ? 'subscription' : 'payment';

      session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: mode,
        // Displays Checkout as an embedded form
        ui_mode: "embedded",
        // Defines where Stripe will redirect a customer after payment
        return_url: `${process.env.DOMAIN || 'http://localhost:3000'}/done?session_id={CHECKOUT_SESSION_ID}`,
      });
    } else if (items && items.length > 0) {
      // Handle dynamic items (your chalkbag products)
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image],
          },
          unit_amount: item.price, // Price is already in cents
        },
        quantity: item.quantity,
      }));

      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        // Use embedded UI for consistency
        ui_mode: "embedded",
        return_url: `${process.env.DOMAIN || 'http://localhost:3000'}/done?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          orderType: 'chalkbag_purchase'
        }
      });
    } else {
      return res.status(400).json({ error: 'No items or priceId provided' });
    }

    // Return the client secret needed to render the checkout form
    res.send({ 
      clientSecret: session.client_secret,
      id: session.id 
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    });
  }
});

// Get status of checkout session
router.get("/session-status", async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.send({ 
      status: session.status,
      customer_email: session.customer_details?.email 
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session status' });
  }
});

// Create a billing portal session
router.post("/create-portal-session", async (req, res) => {
  try {
    const { session_id } = req.body;
    // Get the Stripe customer we previously created
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customerId = session.customer;

    if (!customerId) {
      return res.status(400).json({ error: 'No customer found for this session' });
    }

    // Create a billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      // Specify a URL to return to when done
      return_url: `${process.env.DOMAIN || 'http://localhost:3000'}/done?session_id=${session_id}`,
    });

    // Redirect to the billing portal
    res.redirect(303, portalSession.url);
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Webhook endpoint for Stripe events
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }

    let stripeObject;
    let status;
    // Handle the event
    switch (event.type) {
      case "customer.subscription.trial_will_end":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(stripeObject);
        break;
      case "customer.subscription.deleted":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(stripeObject);
        break;
      case "checkout.session.completed":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Checkout Session status is ${status}.`);
        // Handle successful payment for chalkbag orders
        if (stripeObject.metadata?.orderType === 'chalkbag_purchase') {
          console.log('Chalkbag order completed:', stripeObject.id);
          // Here you would typically:
          // - Save order to database
          // - Send confirmation email
          // - Update inventory
        }
        break;
      case "checkout.session.async_payment_failed":
        stripeObject = event.data.object;
        status = stripeObject.status;
        console.log(`Checkout Session status is ${status}.`);
        // Then define and call a method to handle the failed payment.
        // handleCheckoutSessionFailed(stripeObject);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    stripe_configured: !!process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_your_secret_key_here'
  });
});

// Mount router
app.use("/api", router);

// Serve React app for all other routes (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_your_secret_key_here') {
    console.log('⚠️  Warning: STRIPE_SECRET_KEY not configured. Add it to .env file.');
  } else {
    console.log('✅ Stripe configured and ready!');
  }
});
