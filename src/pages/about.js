import { FooterAttribute } from 'components/Footer/FooterStyles';
import MetaWrapper from 'components/MetaWrapper';
import aboutBackground from 'images/ShowCase.webp';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import {
  AboutBackground,
  AboutContainer,
  AboutCreditsWrapper
} from 'styles/GlobalComponents';

const About = () => {
  useEffect(() => {
    localStorage.setItem('SearchTabPosition', '');
  });

  return (
    <Fragment>
      <MetaWrapper
        title='Cinephiled - About'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url='https://cinephiled.vercel.app'
        image='https://i.imgur.com/1tH4WvQ.jpg'
      />

      <AboutContainer className='text-center d-flex align-items-center justify-content-center'>
        <div className='bg-wrapper'>
          <AboutBackground>
            <Image
              src={aboutBackground}
              layout='fill'
              alt='about-cinephiled-background'
              objectFit='cover'
              priority
            />
          </AboutBackground>
        </div>

        <div style={{ maxWidth: '1100px' }}>
          <h1 className='fw-bold display-3'>About the Project</h1>
          <p className='fs-5'>
            <b>Cinephiled </b>- A progressive web app (PWA) to preview any movie
            or tv show with reviews, ratings, description and posters. Acting as
            a TMDB client,
            <b> Cinephiled</b> gives you access to login into your TMDB account
            and add movies or tv shows to your watchlist, set as favorites, rate
            and get personalized recommendations.
            <br />
            <br />
            <b>Cinephiled</b> is made using Next.js, styled components and Next
            Auth.
            <br />
            <br />
            Banner Image is made by Amr Khalid, big thanks to him.
            <br />
            <br />
            Any feedback or suggestions are welcomed, feel free to contact me
            using the social media linked at the bottom. <br />
            <br />
            Also there is an easter egg somewhere in one of the horror movies
            from 2016, try and find it.
          </p>

          <h2 className='my-4 fw-bold display-3'>Credits</h2>
          <AboutCreditsWrapper>
            <a
              href='https://www.themoviedb.org'
              target='_blank'
              rel='noreferrer'
            >
              <FooterAttribute />
            </a>
            <div>
              <p className='fs-5 mb-0'>Amr Khalid</p>|
              <a
                className='text-primary mx-3'
                href='https://www.behance.net/gallery/96475007/60-Days-Challenge-of-Movies-posters'
                target='_blank'
                rel='noreferrer'
              >
                Behance
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
