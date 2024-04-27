const theme = {
  // Temp fonts
  fonts: {
    main: "var(--manrope)",
    montserrat: "var(--montserrat)"
  },
  // Colors for layout
  colors: {
    primary1: "hsl(204,23.8%,95.9%)",
    background: "#121212",
    accent1: "#0d253f",
    accent2: "#01b4e4",
    accent3: "#90cea1"
  },
  // Breakpoints for responsive design
  breakpoints: {
    xs: "screen and (max-width: 451px)",
    sm: "screen and (max-width: 641px)",
    md: "screen and (max-width: 769px)",
    mdHover: "screen and (max-width: 769px) and (hover: none) and (pointer: coarse)",
    ip: "screen and (max-width: 821px)",
    ipHover: "screen and (max-width: 821px) and (hover: none) and (pointer: coarse)",
    lg: "screen and (max-width: 1025px)",
    lgHover: "screen and (max-width: 1025px) and (hover: none) and (pointer: coarse)",
    xl: "screen and (max-width: 1281px)",
    hover: "screen and (hover: hover) and (pointer: fine)",
    hoverNone: "screen and (hover: none) and (pointer: coarse)"
  }
};

export default theme;
