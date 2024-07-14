import Footer from "components/Footer/Footer";
import Navigation from "components/Navigation/Navigation";
import { Manrope, Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { DetailsWrapper, Wrapper } from "./LayoutStyles";

const manrope = Manrope({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
  variable: "--manrope"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: [600],
  variable: "--montserrat"
});

const Layout = ({ children }) => {
  const router = useRouter();
  const footerValidPaths = ["/", "/about", "/login", "/watch-providers"];

  // key without query params
  const key = router.asPath.split("?")[0];

  return (
    <Wrapper key={key} className={`${manrope.variable} ${montserrat.variable} main-wrapper`}>
      <DetailsWrapper className='flex flex-col justify-between'>
        <Navigation />
        <div className='grow content-wrapper'>{children}</div>
        {footerValidPaths.includes(router.asPath) ? <Footer /> : null}
      </DetailsWrapper>
    </Wrapper>
  );
};

export default Layout;
