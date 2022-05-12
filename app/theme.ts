// Imports
// ========================================================
import { extendTheme, ThemeConfig, theme as base } from "@chakra-ui/react";

// Types
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

// Main Theme
// ========================================================
const theme = extendTheme({
  config,
  fonts: {
    heading: `TTFirsNeue-DemiBold, ${base.fonts?.heading}`,
    body: `Gilroy-Medium, ${base.fonts?.body}`,
  },
  colors: {
    brand: {
      900: "#1F2226", // app black
      800: "#8F9093", // grey 1
      500: "#356DF3", // ankr blue
      100: "#2075E8", // app blue
      50: "#c2d3fb", // light blue from colordesigner.io
    },
  },
});

// Exports
// ========================================================
export default theme;
