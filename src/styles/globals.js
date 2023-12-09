import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: #909090;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #606060;
  }

  html {
    @media screen and (hover: none) and (pointer: coarse) {
      -webkit-tap-highlight-color: transparent; 
    }
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    font-size: 1.25rem;
    background: ${(props) => props.theme.colors.background};
    color: #ddd;
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

    &:hover {
      color: #ddd
    }
  }

  li{
    list-style: none;
  }

`;

export default GlobalStyles;
