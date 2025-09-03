const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://sisi-stripe.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
        return_url: `${process.env.DOMAIN || 'http://localhost:3000'}/visual-toolkit/done?session_id={CHECKOUT_SESSION_ID}`,
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
        return_url: `${process.env.DOMAIN || 'http://localhost:3000'}/visual-toolkit/done?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          orderType: 'chalkbag_purchase'
        }
      });
    } else {
      return res.status(400).json({ error: 'No items or priceId provided' });
    }

    // Return the client secret needed to render the checkout form
    res.status(200).json({ 
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
};
