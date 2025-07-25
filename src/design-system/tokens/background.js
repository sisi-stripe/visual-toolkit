// design-system/tokens/background.js
import { hues } from '../foundations/colors';

export const backgroundTokens = {
  surface: "#FFFFFF",
  offset: hues.gray[50],
  backdrop: hues.gray[100],
  
  // Optional: semantic backgrounds
  success: hues.green[50],
  error: hues.red[50],
  warning: hues.orange[50],
  info: hues.blue[50]
};
