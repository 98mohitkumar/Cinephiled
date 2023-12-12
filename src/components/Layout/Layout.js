import Footer from "components/Footer/Footer";
import Navigation from "components/Navigation/Navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { DetailsWrapper, Wrapper } from "./LayoutStyles";

const Layout = ({ children }) => {
  const router = useRouter();
  const footerValidPaths = ["/", "/about", "/login"];

  return (
    <Wrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5
      }}>
      <DetailsWrapper className='flex flex-col justify-between'>
        <Navigation />
        <div className='grow content-wrapper'>{children}</div>
        {footerValidPaths.includes(router.asPath) ? <Footer /> : null}
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Layout;
