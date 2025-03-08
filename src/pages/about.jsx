import Image from "next/image";
import { Fragment } from "react";

import { TMDBCredit } from "components/Shared/GlobalComponents";
import MetaWrapper from "components/Shared/MetaWrapper";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder, siteInfo } from "data/global";
import aboutBackground from "images/media-backdrops.jpg";
import { pageBackgroundStyles } from "styles/PageStyles/aboutPageStyles";

const About = () => {
  return (
    <Fragment>
      <MetaWrapper
        title=' About - Cinephiled'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url={`${siteInfo.url}/${ROUTES.about}`}
      />

      <div css={pageBackgroundStyles}>
        <Image
          src={aboutBackground}
          fill
          alt='about-cinephiled-background'
          priority
          className='background object-cover'
          placeholder='blur'
          blurDataURL={blurPlaceholder}
        />

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
              <b>P.S.</b> Legend has it there&apos;s a hidden Easter egg lurking in a horror film. Dare to find it?
            </P>

            <div className='mt-48'>
              <H2 className='mb-12'>Credits</H2>
              <FlexBox className='items-center justify-center gap-x-4896 gap-y-2096 whitespace-nowrap above-xs:-me-32 max-xs:flex-col'>
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
