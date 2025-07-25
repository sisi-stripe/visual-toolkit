// design-system/index.js

// Import typography directly to use in the applyTypography function
import { typography, getSystemFont } from './foundations/typography';

// Export foundations
export * from './foundations/typography';
export * from './foundations/colors';

// Export tokens
export { textTokens } from './tokens/text';
export { backgroundTokens } from './tokens/background';
export { borderTokens } from './tokens/border';
export { iconTokens } from './tokens/icon';

// Helper function for applying typography styles
export const applyTypography = (role, size) => {
  if (!typography[role] || !typography[role][size]) {
    console.error(`Typography ${role}.${size} not found`);
    return {};
  }
  
  const style = typography[role][size];
  return {
    fontFamily: getSystemFont(),
    fontSize: style.size,
    lineHeight: style.lineHeight,
    fontWeight: style.weight
  };
};

// Helper function for accessibility checks
export const hasMinimumContrast = (foreground, background, textSize = 'small') => {
  // This is a placeholder - in a real project, implement actual contrast calculation
  console.log(`Checking contrast between ${foreground} and ${background} for ${textSize} text`);
  return true;
};