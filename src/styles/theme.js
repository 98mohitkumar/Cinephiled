import { ThemeProvider } from 'styled-components';
import theme from 'theme/default';
import GlobalStyles from './globals';

const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
