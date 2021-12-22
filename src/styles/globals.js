import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: auto !important;

    @media ${(props) => props.theme.breakpoints.sm}{
      -webkit-tap-highlight-color: transparent; 
    }

  }
  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.25rem;
    background: ${(props) => props.theme.colors.background};
    color: #ddd;
    cursor: default;
  }

  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.main};
  }

  p{
    font-size: 1rem;
  }
  a {
    text-decoration: none;
    color: #ddd;
  }
  li{
    list-style: none;
  }

`;

export default GlobalStyles;
