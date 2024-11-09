import { createGlobalStyle } from "styled-components";
import { colors } from "tokens/colors";
import { fontSizeTokens } from "tokens/typography";

const GlobalStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.black}; 
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${colors.neutral[400]};
  }

  ::-webkit-scrollbar-thumb:hover {
    background:  ${colors.neutral[500]};
  }

  html {
    -webkit-tap-highlight-color: transparent; 
  }

  body {
    background: ${colors.black};
    color: ${colors.white};
    font-size: ${fontSizeTokens.p}
  }
  
  .main-wrapper {
    font-family: ${({ theme }) => theme.fonts.manrope};
  }

  li {
    list-style: none;
  }
`;

export default GlobalStyles;
