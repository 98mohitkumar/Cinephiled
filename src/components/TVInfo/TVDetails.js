import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { FaYoutube } from "react-icons/fa";

import {
  Credits,
  CreditsWrapper,
  GenreWrap,
  Gradient,
  HeroInfoTitle,
  HeroInfoWrapper,
  Overview,
  RatingWrapper,
  Rounded,
  RtoR,
  Span,
  Tagline
} from "components/MovieInfo/MovieDetailsStyles";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import TechnicalDetails from "components/TechnicalDetails/TechnicalDetails";
import UserActions from "components/UserActions/UserActions";
import { blurPlaceholder } from "data/global";
import { Button, DetailsHeroWrap, HeroBg, HeroBgContainer, HeroDetailsContainer, HeroImg, HeroImgWrapper } from "styles/GlobalComponents";
import { getCleanTitle, getRating } from "utils/helper";

const TVDetails = ({ tvData }) => {
  const {
    id,
    title,
    airDate,
    overview,
    backdropPath,
    posterPath,
    socialIds,
    rating,
    genres,
    tagline,
    trailerLink,
    homepage,
    crewData,
    releaseYear,
    imdbId
  } = tvData;

  // splice genres
  genres.length > 3 && genres.splice(3);

  return (
    <Fragment>
      <HeroDetailsContainer className='relative mb-auto'>
        <HeroBgContainer className='absolute'>
          <HeroBg className='absolute z-10 text-center'>
            <Image
              src={backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : "/images/Hex.webp"}
              alt='tv-backdrop'
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </HeroBg>

          <DominantColor image={posterPath} className='z-20' />

          <Gradient className='z-30' />
        </HeroBgContainer>

        <DetailsHeroWrap>
          <HeroImgWrapper>
            <HeroImg className='relative text-center'>
              <Image
                src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "/images/DefaultImage.png"}
                alt='tv-poster'
                fill
                style={{ objectFit: "cover" }}
                priority
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />
            </HeroImg>

            <div className='w-full'>
              {trailerLink && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerLink}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='watch trailer'
                  className='mb-3 block'>
                  <Button className='gap-3 w-full' as={motion.button} whileTap={{ scale: 0.95 }}>
                    <FaYoutube size='1.5rem' />
                    <Span className='font-semibold'>Watch Trailer</Span>
                  </Button>
                </a>
              )}

              <TechnicalDetails imdbId={imdbId} />

              <UserActions mediaType='tv' mediaId={id} mediaDetails={{ name: title, poster: posterPath, releaseYear, airDate, rating }} />
            </div>
            <SocialMediaLinks
              links={socialIds}
              homepage={homepage}
              mediaDetails={{
                title,
                description: overview
              }}
            />
          </HeroImgWrapper>

          <HeroInfoWrapper className='max-w-5xl'>
            <HeroInfoTitle className='mb-2'>
              {title} ({releaseYear})
            </HeroInfoTitle>

            <RtoR className='my-4'>
              {genres.length > 0 ? (
                <GenreWrap className='font-bold'>
                  {genres.map((item, i) => (
                    <Link key={item.id} href={`/genre/${item.id.toString() + "-" + item.name.split(" ").join("")}/tv`} passHref>
                      <Rounded className={genres.length == i + 1 && "sep"}>{item.name}</Rounded>
                    </Link>
                  ))}
                </GenreWrap>
              ) : null}
            </RtoR>

            {tagline ? (
              <i>
                <Tagline className='my-4 block'>{tagline}</Tagline>
              </i>
            ) : null}
            {overview ? <Overview className='font-normal'>{overview}</Overview> : null}
            {rating ? (
              <RatingWrapper>
                <Fragment>
                  <Span className='xl:text-6xl text-[calc(1.525rem_+_3.3vw)] font-bold'>{getRating(rating)}</Span>
                  <span> / 10</span>
                </Fragment>
              </RatingWrapper>
            ) : null}

            {crewData.length > 0 && (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='block font-normal'>{item.job ?? "Creator"}</Span>
                    <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`}>
                      <Span className='credit block font-bold'>{item.name}</Span>
                    </Link>
                  </Credits>
                ))}
              </CreditsWrapper>
            )}
          </HeroInfoWrapper>
        </DetailsHeroWrap>
      </HeroDetailsContainer>
    </Fragment>
  );
};

export default TVDetails;
