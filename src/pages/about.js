import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";
import {
  AboutContainer,
  AboutCreditsWrapper,
  AboutWrapper,
  Wrapper,
} from "../styles/GlobalComponents";
import Footer from "../components/Footer/Footer";
import { FooterAttribute } from "../components/Footer/FooterStyles";
const About = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Wrapper>
        <AboutWrapper className="d-flex justify-content-between align-items-center flex-column">
          <Navigation />
          <AboutContainer className="text-center">
            <h1 className="fw-bold display-3">About the Project</h1>
            <p className="fs-5">
              On my journey of learning front end web development, i have now
              learned React js and a framework called next.js. <br />
              Project Name Here is made using Next.js and data is fetched from
              The Movie database aka <b>TMDB</b> using REST Api.
              <br />
              <br />
              Banner Image is made by Amr Khalid, big thanks to him.
              <br />
              <br />
              Any feedback or suggestions are welcomed, feel free to contact me
              using the social media linked at the bottom.
            </p>

            <h2 className="my-4 fw-bold display-3">Credits</h2>
            <AboutCreditsWrapper>
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
              >
                <FooterAttribute />
              </a>
              <div>
                <p className="fs-5 mb-0">Amr Khalid</p>|
                <a
                  className="text-primary mx-3"
                  href="https://www.behance.net/gallery/96475007/60-Days-Challenge-of-Movies-posters"
                  target="_blank"
                  rel="noreferrer"
                >
                  Behance
                </a>
                |
              </div>
            </AboutCreditsWrapper>
          </AboutContainer>
          <Footer />
        </AboutWrapper>
      </Wrapper>
    </>
  );
};

export default About;
