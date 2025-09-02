const { Stripe } = require("stripe");
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
    const { session_id } = req.body;
    
    if (!session_id) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

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
      return_url: `${process.env.DOMAIN || 'https://sisi-stripe.github.io/visual-toolkit'}/done?session_id=${session_id}`,
    });

    // Return the portal URL (don't redirect in serverless function)
    res.status(200).json({ url: portalSession.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
};
