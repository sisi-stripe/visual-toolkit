// design-system/foundations/colors.js

// Color palette
export const hues = {
    red: {
      50: "#FFEBE9",
      100: "#FFD7D5",
      150: "#FFC2BF",
      200: "#FFADAA",
      300: "#FF8380",
      400: "#FF5247",
      500: "#E52F28",
      600: "#BE1E18",
      700: "#9A150F",
      800: "#770C08",
      900: "#550501"
    },
    orange: {
      50: "#FFF3E0",
      100: "#FFE8C2",
      150: "#FDDBA4",
      200: "#FCCD86",
      300: "#FAB44C",
      400: "#F79009",
      500: "#DC6803",
      600: "#B54708",
      700: "#932F0C",
      800: "#771E0C",
      900: "#55140A"
    },
    green: {
      50: "#E7F9EF",
      100: "#D0F2E0",
      150: "#B8EAD1",
      200: "#A0E1C2",
      300: "#70CFA5",
      400: "#39B97A",
      500: "#18954D",
      600: "#0A7339",
      700: "#065A2C",
      800: "#04421F",
      900: "#022D15"
    },
    blue: {
      50: "#E9F5FF",
      100: "#D4EBFF",
      150: "#BFDFFF",
      200: "#AAD4FF",
      300: "#80BDFF",
      400: "#4C9FFF",
      500: "#1A7BFF",
      600: "#0057CC",
      700: "#004099",
      800: "#002C66",
      900: "#001C40"
    },
    purple: {
      50: "#F2EBFE",
      100: "#E6D8FD",
      150: "#D9C4FC",
      200: "#CCB0FB",
      300: "#B389F9",
      400: "#9A62F7",
      500: "#813BF5",
      600: "#5A1ECE",
      700: "#4012A5",
      800: "#2C0C7C",
      900: "#1E0652"
    },
    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      150: "#EBEDF0",
      200: "#E4E7EC",
      300: "#D2D6DC",
      400: "#9AA2B1",
      500: "#6C7689",
      600: "#4F566B",
      700: "#3D4456",
      800: "#2B3040",
      900: "#1A1F2E"
    }
  };

  // Action colors
  export const actionColors = {
    primary: "#675DFF"
  };
  
  // Contrast rules
  export const contrastRules = {
    text: {
      small: {minContrast: "4.5:1", stepsApart: 500},
      large: {minContrast: "3:1", stepsApart: 400}
    },
    graphicalObjects: {minContrast: "3:1", stepsApart: 400}
  };
  
  // Target contrast ratios
  export const targetContrastRatios = {
    50: {target: "1.06:1", acceptableRange: "1.05-1.06:1"},
    100: {target: "1.13:1", acceptableRange: "1.11-1.13:1"},
    150: {target: "1.20:1", acceptableRange: "1.19-1.20:1"},
    200: {target: "1.30:1", acceptableRange: "1.27-1.30:1"},
    300: {target: "1.80:1", acceptableRange: "1.75-1.80:1"},
    400: {target: "3.00:1", acceptableRange: "2.90-3.00:1"},
    500: {target: "4.50:1", acceptableRange: "4.40-4.50:1"},
    600: {target: "7.00:1", acceptableRange: "6.80-7.00:1"},
    700: {target: "10.00:1", acceptableRange: "9.70-10.00:1"},
    800: {target: "16.00:1", acceptableRange: "15.50-16.00:1"},
    900: {target: "21.00:1", acceptableRange: "20.30-21.00:1"}
  };
  