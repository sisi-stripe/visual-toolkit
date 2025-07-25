// design-system/foundations/typography.js

// System Default Typefaces
export const systemFonts = {
    ui: {
      mac_ios: "San Francisco",
      windows: "Segoe UI",
      android_chrome: "Roboto",
      ubuntu: "Ubuntu",
      other_linux: "sans-serif"
    },
    monospace: {
      mac_ios: "Menlo",
      windows: "Consolas",
      other: "monospace"
    }
  };
  
  // Get system font based on platform
  export const getSystemFont = () => {
    if (navigator.platform.indexOf('Mac') > -1) {
      return `-apple-system, BlinkMacSystemFont`;
    }
    return `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
  };
  
  // Type scale definitions
  export const typography = {
    display: {
      xlarge: {size: "40px", lineHeight: "48px", weight: "600"},
      large: {size: "32px", lineHeight: "40px", weight: "600"},
      medium: {size: "24px", lineHeight: "32px", weight: "600"},
      small: {size: "20px", lineHeight: "28px", weight: "600"}
    },
    heading: {
      xlarge: {size: "24px", lineHeight: "32px", weight: "600"},
      large: {size: "20px", lineHeight: "28px", weight: "600"},
      medium: {size: "16px", lineHeight: "24px", weight: "600"},
      small: {size: "14px", lineHeight: "20px", weight: "600"},
      xsmall: {size: "12px", lineHeight: "16px", weight: "600"}
    },
    body: {
      large: {size: "16px", lineHeight: "24px", weight: "400"},
      medium: {size: "14px", lineHeight: "20px", weight: "400"},
      small: {size: "12px", lineHeight: "16px", weight: "400"}
    },
    label: {
      large: {size: "14px", lineHeight: "20px", weight: "400"},
      medium: {size: "12px", lineHeight: "16px", weight: "400"},
      small: {size: "11px", lineHeight: "16px", weight: "400"}
    }
  };