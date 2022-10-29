import { DetailsWrapper, Wrapper } from '../../styles/GlobalComponents';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Wrapper>
        <DetailsWrapper className='d-flex flex-column justify-content-between'>
          <Navigation />
          {children}
          <Footer />
        </DetailsWrapper>
      </Wrapper>
    </motion.div>
  );
};

export default Layout;
