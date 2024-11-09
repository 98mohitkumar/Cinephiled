import { colors } from "tokens/colors";

const theme = {
  // Temp fonts
  fonts: {
    manrope: "var(--manrope)",
    montserrat: "var(--montserrat)"
  },
  // Colors for layout
  colors,
  // Breakpoints for responsive design
  breakpoints: {
    xs: "screen and (max-width: 450px)",
    sm: "screen and (max-width: 640px)",
    md: "screen and (max-width: 768px)",
    mdHover: "screen and (max-width: 768px) and (hover: none) and (pointer: coarse)",
    ip: "screen and (max-width: 820px)",
    ipHover: "screen and (max-width: 820px) and (hover: none) and (pointer: coarse)",
    lg: "screen and (max-width: 1024px)",
    lgHover: "screen and (max-width: 1024px) and (hover: none) and (pointer: coarse)",
    xl: "screen and (max-width: 1280px)",
    hover: "screen and (hover: hover) and (pointer: fine)",
    hoverNone: "screen and (hover: none) and (pointer: coarse)"
  }
};

export default theme;
