import Image from "next/image";
import { Fragment } from "react";
import { FooterAttribute } from "components/Footer/FooterStyles";
import MetaWrapper from "components/MetaWrapper";
import aboutBackground from "images/ShowCase.webp";
import { AboutBackground, AboutContainer, AboutCreditsWrapper } from "styles/GlobalComponents";

const About = () => {
  return (
    <Fragment>
      <MetaWrapper
        title=' About - Cinephiled'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url='https://cinephiled.vercel.app'
      />

      <AboutContainer className='about-container flex items-center justify-center text-center'>
        <div className='bg-wrapper'>
          <AboutBackground>
            <Image src={aboutBackground} fill alt='about-cinephiled-background' style={{ objectFit: "cover" }} priority />
          </AboutBackground>
        </div>

        <div className='max-w-6xl'>
          <h1 className='xl:text-6xl my-3 text-[calc(1.525rem_+_3.3vw)] font-bold md:my-6'>About the Project</h1>
          <p className='text-xl leading-7'>
            <b>Cinephiled </b>- A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as
            a TMDB client,
            <b> Cinephiled</b> gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate,
            create custom lists and get personalized recommendations.
            <br />
            <br />
            <b>Cinephiled</b> is made using Next.js, styled components and Next Auth.
            <br />
            <br />
            Any feedback or suggestions are welcomed, feel free to contact me using the links at the bottom. <br />
            <br />
            Also there is an easter egg somewhere in one of the horror movies from 2016, try and find it.
          </p>

          <h2 className='xl:text-6xl mb-6 mt-12 text-[calc(1.525rem_+_3.3vw)] font-bold'>Credits</h2>
          <AboutCreditsWrapper>
            <a href='https://www.themoviedb.org' target='_blank' rel='noreferrer'>
              <FooterAttribute />
            </a>
            <div>
              <p className='text-xl mb-0'>Noun Project</p>|
              <a className='text-blue-500 mx-3' href='https://thenounproject.com' target='_blank' rel='noreferrer'>
                Noun Project
              </a>
              |
            </div>

            <div>
              <p className='text-xl mb-0'>DiceBear</p>|
              <a className='text-blue-500 mx-3' href='https://www.dicebear.com' target='_blank' rel='noreferrer'>
                DiceBear
              </a>
              |
            </div>
          </AboutCreditsWrapper>
        </div>
      </AboutContainer>
    </Fragment>
  );
};

export default About;
