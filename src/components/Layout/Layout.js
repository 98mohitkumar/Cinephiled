import Footer from "components/Footer/Footer";
import Navigation from "components/Navigation/Navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { framerTabVariants } from "src/utils/helper";
import { DetailsWrapper, Wrapper } from "./LayoutStyles";

const Layout = ({ children }) => {
  const router = useRouter();
  const footerValidPaths = ["/", "/about", "/login", "/watch-providers"];

  return (
    <Wrapper
      as={motion.div}
      variants={framerTabVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.5 }}>
      <DetailsWrapper className='flex flex-col justify-between'>
        <Navigation />
        <div className='grow content-wrapper'>{children}</div>
        {footerValidPaths.includes(router.asPath) ? <Footer /> : null}
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Layout;
