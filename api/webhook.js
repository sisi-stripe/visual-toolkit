const { Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let event = req.body;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  // Only verify the event if you have an endpoint secret defined.
  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
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
      break;
    case "customer.subscription.deleted":
      stripeObject = event.data.object;
      status = stripeObject.status;
      console.log(`Subscription status is ${status}.`);
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
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};
