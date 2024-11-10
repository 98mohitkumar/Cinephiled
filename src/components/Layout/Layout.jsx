import { Manrope, Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import { FlexBox } from "./helpers";
import { Wrapper } from "./LayoutStyles";
import Footer from "components/Footer/Footer";
import Navigation from "components/Navigation/Navigation";

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

const pathsWithFooter = ["/", "/about", "/login", "/watch-providers", "/explore"];

const Layout = ({ children }) => {
  const router = useRouter();

  // key without query params
  const key = router.asPath.split("?")[0];

  return (
    <Wrapper key={key} className={`${manrope.variable} ${montserrat.variable} main-wrapper`}>
      <FlexBox className='min-h-screen flex-col'>
        <Navigation />
        <div className='content-wrapper'>{children}</div>
        {pathsWithFooter.includes(router.asPath) ? <Footer /> : null}
      </FlexBox>
    </Wrapper>
  );
};

export default Layout;
