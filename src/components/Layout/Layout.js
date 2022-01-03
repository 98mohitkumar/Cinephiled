import { DetailsWrapper, Wrapper } from "../../styles/GlobalComponents";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <DetailsWrapper className="d-flex flex-column justify-content-between">
        <Navigation />
        {children}
        <Footer />
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Layout;
