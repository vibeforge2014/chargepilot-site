const requiredEnvironment = {
  environment: import.meta.env.VITE_PADDLE_ENVIRONMENT,
  clientToken: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
  annualPriceId: import.meta.env.VITE_PADDLE_ANNUAL_PRICE_ID,
  lifetimePriceId: import.meta.env.VITE_PADDLE_LIFETIME_PRICE_ID
};

const missingKeys = Object.entries(requiredEnvironment)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingKeys.length > 0) {
  throw new Error(`Paddle configuration is missing: ${missingKeys.join(", ")}`);
}

if (!['sandbox', 'production'].includes(requiredEnvironment.environment)) {
  throw new Error('VITE_PADDLE_ENVIRONMENT must be explicitly set to sandbox or production.');
}

if (requiredEnvironment.environment === 'sandbox' && !requiredEnvironment.clientToken.startsWith('test_')) {
  throw new Error('Sandbox Paddle configuration requires a test_ client-side token.');
}

if (requiredEnvironment.environment === 'production' && !requiredEnvironment.clientToken.startsWith('live_')) {
  throw new Error('Production Paddle configuration requires a live_ client-side token.');
}

export const paddleConfig = Object.freeze(requiredEnvironment);

export const pricingOptions = Object.freeze([
  {
    id: 'annual',
    name: 'Annual Plan',
    description: 'Full access with annual billing.',
    features: ['All premium features', 'Updates during the subscription', '7-day free trial'],
    priceId: requiredEnvironment.annualPriceId,
    billingType: 'recurring',
    billingLabel: 'per year',
    buttonLabel: 'Subscribe',
    highlighted: true
  },
  {
    id: 'lifetime',
    name: 'Lifetime License',
    description: 'Pay once and use the current product permanently.',
    features: ['All premium features', 'One-time payment', 'No recurring charges'],
    priceId: requiredEnvironment.lifetimePriceId,
    billingType: 'one-time',
    billingLabel: 'one-time',
    buttonLabel: 'Buy Lifetime'
  }
]);
