import Theme from "../styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <Theme>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </Theme>
  );
}

export default MyApp;
