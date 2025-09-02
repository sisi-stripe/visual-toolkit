// Product data for climbing chalkbags
export const products = [
  {
    id: 'chalkbag-classic-blue',
    name: 'Classic Blue Chalkbag',
    price: 2500, // Price in cents for Stripe
    description: 'Durable canvas chalkbag with secure drawstring closure. Perfect for indoor and outdoor climbing.',
    image: 'https://images.unsplash.com/photo-1544966503-7cc22f10b0d9?w=400&h=400&fit=crop&crop=center',
    features: ['Fleece-lined interior', 'Adjustable belt', 'Brush holder loop']
  },
  {
    id: 'chalkbag-premium-leather',
    name: 'Premium Leather Chalkbag',
    price: 4500,
    description: 'Handcrafted leather chalkbag for serious climbers who appreciate quality and style.',
    image: 'https://images.unsplash.com/photo-1565630322461-827b62d5240a?w=400&h=400&fit=crop&crop=center',
    features: ['Genuine leather construction', 'Metal reinforcement', 'Lifetime warranty']
  },
  {
    id: 'chalkbag-lightweight-nylon',
    name: 'Lightweight Nylon Chalkbag',
    price: 1800,
    description: 'Ultra-light ripstop nylon chalkbag designed for alpine and sport climbing.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
    features: ['Ripstop nylon fabric', 'Minimal weight', 'Reinforced seams']
  },
  {
    id: 'chalkbag-kids-colorful',
    name: 'Kids Colorful Chalkbag',
    price: 1500,
    description: 'Fun and colorful chalkbag designed specifically for young climbers.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    features: ['Kid-friendly size', 'Bright colors', 'Easy-use closure']
  },
  {
    id: 'chalkbag-pro-competition',
    name: 'Pro Competition Chalkbag',
    price: 3200,
    description: 'Competition-grade chalkbag used by professional climbers worldwide.',
    image: 'https://images.unsplash.com/photo-1586328497573-db17db086b84?w=400&h=400&fit=crop&crop=center',
    features: ['Competition approved', 'Quick-access design', 'Professional grade']
  },
  {
    id: 'chalkbag-eco-hemp',
    name: 'Eco Hemp Chalkbag',
    price: 2800,
    description: 'Environmentally friendly chalkbag made from sustainable hemp fibers.',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop&crop=center',
    features: ['100% hemp construction', 'Eco-friendly', 'Natural antimicrobial']
  }
];

// Helper function to format price for display
export const formatPrice = (priceInCents) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};
