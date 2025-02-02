import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { FaYoutube } from "react-icons/fa";

import CollectionCard from "components/CollectionCard/CollectionCard";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import TechnicalDetails from "components/TechnicalDetails/TechnicalDetails";
import UserActions from "components/UserActions/UserActions";
import { ROUTES, blurPlaceholder } from "data/global";
import { Button, DetailsHeroWrap, HeroBg, HeroBgContainer, HeroDetailsContainer, HeroImg, HeroImgWrapper } from "styles/GlobalComponents";
import { getCleanTitle, getNiceName, getRating, getRuntime } from "utils/helper";

import {
  Divider,
  Rounded,
  GenreWrap,
  HeroInfoWrapper,
  RatingWrapper,
  HeroInfoTitle,
  RtoR,
  Span,
  CreditsWrapper,
  Credits,
  Tagline,
  ReleaseDateWrapper,
  Overview,
  Light,
  EasterText,
  LightsInOut,
  Gradient,
  MovieEaster
} from "./MovieDetailsStyles";

const MovieDetails = ({ movieDetails, easter }) => {
  const {
    id,
    title,
    overview,
    releaseYear,
    releaseDate,
    backdropPath,
    runtime,
    trailerLink,
    genres,
    tagline,
    rating,
    moviePoster,
    crewData,
    socialIds,
    homepage,
    collection,
    imdbId
  } = movieDetails;

  const { renderEaster, hasSeen, showEaster, easterHandler } = easter;

  // splice genres
  genres.length > 3 && genres.splice(3);

  return (
    <Fragment>
      <HeroDetailsContainer className='relative mb-auto'>
        <HeroBgContainer className='absolute'>
          <HeroBg className='absolute z-10 text-center'>
            <Image
              src={backdropPath ? `https://image.tmdb.org/t/p/w1280${backdropPath}` : "/images/Hex.webp"}
              alt='movie-backdrop'
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </HeroBg>

          {/* color gradient overlay */}
          <DominantColor image={moviePoster} className='z-20' />

          <Gradient className='z-30' />
        </HeroBgContainer>

        <DetailsHeroWrap>
          <HeroImgWrapper>
            <HeroImg className='relative text-center'>
              <Image
                src={moviePoster ? `https://image.tmdb.org/t/p/w500${moviePoster}` : "/images/DefaultImage.png"}
                alt='movie-poster'
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

              <UserActions
                mediaType='movie'
                mediaId={id}
                mediaDetails={{
                  title: title,
                  poster: moviePoster,
                  releaseYear,
                  releaseDate,
                  rating
                }}
              />
            </div>

            {/* social media links */}
            <SocialMediaLinks
              links={socialIds}
              homepage={homepage}
              mediaDetails={{
                title: title,
                description: overview
              }}
            />
          </HeroImgWrapper>

          {/* right side info */}
          <HeroInfoWrapper className='max-w-5xl'>
            <HeroInfoTitle className='mb-2'>
              {title} ({releaseYear})
            </HeroInfoTitle>
            {renderEaster ? <Light onClick={easterHandler} /> : null}
            <RtoR className='my-4'>
              <ReleaseDateWrapper>
                <Span className='font-medium'>{releaseDate}</Span>
              </ReleaseDateWrapper>
              {genres.length > 0 ? (
                <GenreWrap className='font-bold'>
                  <Divider />
                  {genres.map((item, i) => (
                    <Link key={item.id} href={`/${ROUTES.genres}/${getNiceName({ id: item.id, name: item.name })}/movies`} passHref>
                      <Rounded className={genres.length == i + 1 ? "sep" : ""}>{item.name}</Rounded>
                    </Link>
                  ))}
                  <Divider />
                </GenreWrap>
              ) : null}

              <Span className='font-medium'>{getRuntime(runtime)}</Span>
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
            {crewData?.length > 0 ? (
              <CreditsWrapper>
                {crewData.map((item) => (
                  <Credits key={item.credit_id}>
                    <Span className='block font-normal'>{item.job}</Span>
                    <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`}>
                      <Span className='credit block font-bold'>{item.name}</Span>
                    </Link>
                  </Credits>
                ))}
              </CreditsWrapper>
            ) : null}

            {collection ? <CollectionCard collection={collection} /> : null}
          </HeroInfoWrapper>
        </DetailsHeroWrap>
      </HeroDetailsContainer>

      {renderEaster ? (
        <Fragment>
          {!hasSeen ? (
            <EasterText className='text-xl md:text-2xl px-5' $show={showEaster}>
              Congratulations, you have found the easter egg.
            </EasterText>
          ) : (
            <EasterText className='text-xl md:text-2xl' $show={showEaster}>
              Aren&apos;t you scared?
            </EasterText>
          )}
          <LightsInOut $show={showEaster} onClick={easterHandler} />
          <MovieEaster $show={showEaster} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default MovieDetails;
