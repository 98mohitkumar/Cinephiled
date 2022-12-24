import Footer from 'components/Footer/Footer';
import Navigation from 'components/Navigation/Navigation';
import { motion } from 'framer-motion';
import { DetailsWrapper, Wrapper } from './LayoutStyles';

const Layout = ({ children }) => {
  return (
    <Wrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5
      }}
    >
      <DetailsWrapper className='d-flex flex-column justify-content-between'>
        <Navigation />
        {children}
        <Footer />
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Layout;
