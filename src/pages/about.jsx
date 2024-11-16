import Image from "next/image";
import { Fragment } from "react";
import { FlexBox, LayoutContainer } from "components/Layout/helpers";
import MetaWrapper from "components/MetaWrapper";
import H1 from "components/Typography/H1";
import H2 from "components/Typography/H2";
import P from "components/Typography/P";
import aboutBackground from "images/ShowCase.webp";
import { TMDBCredit } from "styles/GlobalComponents";
import { pageBackgroundStyles } from "styles/PageStyles/aboutPageStyles";

const About = () => {
  return (
    <Fragment>
      <MetaWrapper
        title=' About - Cinephiled'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url='https://cinephiled.vercel.app/about'
      />

      <div css={pageBackgroundStyles}>
        <Image src={aboutBackground} fill alt='about-cinephiled-background' style={{ objectFit: "cover" }} priority className='background' />

        <LayoutContainer className='relative z-5 flex items-center justify-center py-32 text-center'>
          <div className='max-w-6xl'>
            <H1 className='mb-24'>About the Project</H1>
            <P size='large'>
              <b className='text-accentPrimary'>Cinephiled </b>- A progressive web app (PWA) to preview any movie or tv show with reviews, ratings,
              description and posters.
              <br />
              <br />
              Acting as a TMDB client, It gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as
              favorites, rate, create custom lists and get personalized recommendations.
              <br />
              <br />
              <b className='text-accentPrimary'>Tech Stack</b> - Next.js, Framer Motion, Tailwind CSS and Next Auth.
              <br />
              <br />
              I welcome any feedback or suggestions! Feel free to reach out using the social links below. <br />
              <br />
              P.S. There&apos;s a hidden easter egg in one of the 2016 horror movies. Can you find it?
            </P>

            <div className='mt-48'>
              <H2 className='mb-12'>Credits</H2>
              <FlexBox className='items-center justify-center gap-2096 whitespace-nowrap max-xs:flex-col xs:-me-32'>
                <a href='https://www.themoviedb.org' target='_blank' rel='noreferrer'>
                  <TMDBCredit />
                </a>

                <div>
                  <P weight='medium' size='large'>
                    Noun Project
                  </P>
                  |
                  <a className='mx-12 font-medium text-accentPrimary' href='https://thenounproject.com' target='_blank' rel='noreferrer'>
                    Noun Project
                  </a>
                  |
                </div>

                <div>
                  <P weight='medium' size='large'>
                    DiceBear
                  </P>
                  |
                  <a className='mx-12 font-medium text-accentPrimary' href='https://www.dicebear.com' target='_blank' rel='noreferrer'>
                    DiceBear
                  </a>
                  |
                </div>
              </FlexBox>
            </div>
          </div>
        </LayoutContainer>
      </div>
    </Fragment>
  );
};

export default About;
