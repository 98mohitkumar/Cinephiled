import { ThemeProvider } from "styled-components";
import GlobalStyles from "./globals";
import theme from "theme/default";

const Theme = ({ children }) => {
  return (
    // redundant
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
