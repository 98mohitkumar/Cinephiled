import { createGlobalStyle } from "styled-components";

import { theme } from "theme/theme";

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.black}; 
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${theme.colors.neutral[400]};
  }

  ::-webkit-scrollbar-thumb:hover {
    background:  ${theme.colors.neutral[500]};
  }

  html {
    -webkit-tap-highlight-color: transparent; 
  }

  :root {
    --manrope: "Manrope", "Manrope Fallback";
    --montserrat: "Montserrat", "Montserrat Fallback";
  }

  body {
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    font-size: ${theme.fontSize.p};
    font-family: var(--manrope);
  }
`;

export default GlobalStyles;
