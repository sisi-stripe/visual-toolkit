// Product data for climbing chalkbags
export const products = [
  {
    id: 'chalkbag-devil-cat',
    name: 'Devil Cat Chalkbag',
    price: 3200, // Price in cents for Stripe
    description: 'Mischievous gray cat chalkbag with adorable horns and cheeky expression. Perfect for climbers with personality!',
    image: '/visual-toolkit/images/devil-cat.jpg',
    features: ['Soft plush exterior', 'Secure drawstring', 'Character face design']
  },
  {
    id: 'chalkbag-panda-zen',
    name: 'Zen Panda Chalkbag',
    price: 2800,
    description: 'Peaceful panda chalkbag with a green bamboo accent. Brings calm energy to your climbing sessions.',
    image: '/visual-toolkit/images/panda-zen.jpg',
    features: ['Bamboo detail', 'Cute panda face', 'Soft paws design']
  },
  {
    id: 'chalkbag-toast-buddy',
    name: 'Toast Buddy Chalkbag',
    price: 2400,
    description: 'Adorable toast-shaped chalkbag with the sweetest smile. Makes climbing as comforting as breakfast!',
    image: '/visual-toolkit/images/toast-buddy.jpg',
    features: ['Toast shape design', 'Happy face', 'Compact size']
  },
  {
    id: 'chalkbag-fox-friend',
    name: 'Fox Friend Chalkbag',
    price: 2600,
    description: 'Clever orange fox chalkbag with a charming red bandana. Your trusty climbing companion!',
    image: '/visual-toolkit/images/fox-friend.jpg',
    features: ['Fox ear details', 'Red bandana accent', 'Friendly expression']
  },
  {
    id: 'chalkbag-cookie-monster',
    name: 'Cookie Monster Chalkbag',
    price: 3500,
    description: 'Fuzzy blue chalkbag inspired by everyone\'s favorite cookie lover. "Me want chalk!"',
    image: '/visual-toolkit/images/cookie-monster.jpg',
    features: ['Fluffy blue texture', 'Googly eyes', 'Monster mouth opening']
  }
];

// Helper function to format price for display
export const formatPrice = (priceInCents) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};
