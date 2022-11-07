import {
  HeroBg,
  Error404,
  HeroImg,
  DetailsHeroWrap,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroInfo,
  HeroImgWrapper,
  HeroTrailer,
  MovieEaster,
  LightsInOut,
  EasterText
} from '../../styles/GlobalComponents';
import DominantColor from '../../components/DominantColor/DominantColor';
import MovieDetails from '../../components/MovieInfo/MovieDetails';
import MovieTab from '../../components/MovieInfo/MovieTab';
import MovieFacts from '../../components/MovieInfo/MovieFacts';
import { Gradient } from '../../styles/GlobalComponents';
import { Span } from '../../components/MovieInfo/MovieDetailsStyles';
import { FaYoutube } from 'react-icons/fa';
import SocialMediaLinks from '../../components/SocialMediaLinks/SocialMediaLinks';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useCallback } from 'react';
import MetaWrapper from '../../components/MetaWrapper';

const Movie = ({ movieDetails, error, languages, socialIds }) => {
  let easter = useRef(false);
  const [showEaster, setShowEaster] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  if (!error && movieDetails.id === 345911) {
    easter.current = true;
  }

  useEffect(() => {
    let easterSeen = localStorage.getItem('easterSeen');
    if (easter.current && easterSeen !== 'seen') {
      setShowEaster(true);
      document.body.style.overflow = 'hidden';
    }

    if (easterSeen === 'seen') {
      setHasSeen(true);
    }
  }, []);

  const easterHandler = useCallback(() => {
    setShowEaster(!showEaster);
    window.scrollTo(0, 0);
    setHasSeen(true);
    localStorage.setItem('easterSeen', 'seen');

    if (showEaster) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [showEaster]);

  const crew = useMemo(
    () => (!error ? movieDetails?.credits?.crew : []),
    [error, movieDetails?.credits?.crew]
  );

  const crewData = useMemo(
    () =>
      !error
        ? [
            ...crew?.filter((credit) => credit?.job === 'Director').slice(0, 2),
            ...crew?.filter((credit) => credit?.job === 'Writer').slice(0, 3),
            ...crew
              ?.filter((credit) => credit?.job === 'Characters')
              .slice(0, 2)
          ]
        : [],
    [error, crew]
  );

  const cast = useMemo(
    () => (!error ? movieDetails?.credits?.cast.slice(0, 15) : []),
    [error, movieDetails?.credits?.cast]
  );

  const videos = useMemo(
    () =>
      !error
        ? movieDetails?.videos?.results?.filter(
            (item) => item?.site === 'YouTube' && item?.type === 'Trailer'
          )
        : [],
    [error, movieDetails?.videos?.results]
  );

  const country = useMemo(
    () =>
      !error
        ? movieDetails?.production_countries[0] === undefined
          ? 'US'
          : movieDetails?.production_countries[0].iso_3166_1
        : '',
    [error, movieDetails?.production_countries]
  );

  const getYear = useMemo(
    () =>
      !error
        ? !movieDetails?.release_date
          ? 'TBA'
          : new Date(movieDetails?.release_date).getFullYear()
        : '',
    [error, movieDetails?.release_date]
  );

  const runtime = useMemo(() => {
    const getH = Math.floor(movieDetails?.runtime / 60);
    const getM = Math.ceil((movieDetails?.runtime / 60 - getH) * 60);
    return { getH, getM };
  }, [movieDetails?.runtime]);

  const status = useMemo(
    () =>
      !error ? (!movieDetails?.status ? 'TBA' : movieDetails?.status) : '',
    [error, movieDetails?.status]
  );

  const movieFacts = useMemo(
    () =>
      !error
        ? {
            status,
            language: movieDetails?.original_language,
            budget: movieDetails?.budget,
            revenue: movieDetails?.revenue
          }
        : {},
    [
      error,
      movieDetails?.budget,
      movieDetails?.original_language,
      movieDetails?.revenue,
      status
    ]
  );

  return (
    <>
      <MetaWrapper
        title={
          !error
            ? `${movieDetails?.title} (${getYear}) - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        image={`https://image.tmdb.org/t/p/w780${movieDetails?.backdrop_path}`}
        description={movieDetails?.overview}
        url={`https://cinephiled.vercel.app/movies/${movieDetails?.id}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          {easter.current && (
            <>
              {/* easter egg */}
              {!hasSeen ? (
                <EasterText className='fs-4' show={showEaster}>
                  Congratulations, you have found the easter egg.
                </EasterText>
              ) : (
                <EasterText className='fs-4' show={showEaster}>
                  Aren&apos;t you scared?
                </EasterText>
              )}
              <LightsInOut show={showEaster} onClick={easterHandler} />
              <MovieEaster show={showEaster} />
            </>
          )}

          {/* movie info hero section */}
          <HeroDetailsContainer className='position-relative mb-auto'>
            <HeroBgContainer className='position-absolute'>
              <HeroBg className='position-absolute text-center'>
                <Image
                  src={
                    movieDetails?.backdrop_path
                      ? `https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path}`
                      : '/Images/Hex.png'
                  }
                  alt='movie-backdrop'
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </HeroBg>
              <DominantColor image={movieDetails?.poster_path} />
            </HeroBgContainer>

            <DetailsHeroWrap>
              <HeroImgWrapper>
                <HeroImg className='position-relative text-center'>
                  <Image
                    src={
                      movieDetails?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
                        : '/Images/DefaultImage.png'
                    }
                    alt='movie-poster'
                    layout='fill'
                    objectFit='cover'
                    priority
                  />
                </HeroImg>

                {videos.length !== 0 && (
                  <a
                    href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                    target='_blank'
                    rel='noreferrer'
                    aria-label='trailer'
                  >
                    <HeroTrailer>
                      <FaYoutube size='1.5rem' />
                      <Span>Play Trailer</Span>
                    </HeroTrailer>
                  </a>
                )}
                <SocialMediaLinks
                  links={socialIds}
                  homepage={movieDetails?.homepage}
                />
              </HeroImgWrapper>
              <Gradient />
              <HeroInfo className='d-flex'>
                <MovieDetails
                  movieDetailsData={movieDetails}
                  date={getYear}
                  runtime={runtime}
                  crew={crewData}
                  easter={easter.current}
                  showEaster={easterHandler}
                />
              </HeroInfo>
            </DetailsHeroWrap>
          </HeroDetailsContainer>

          {/* movie facts */}
          <MovieFacts
            facts={movieFacts}
            languages={languages}
            country={country}
          />

          {/* movie tabs */}
          <MovieTab
            id={movieDetails.id}
            cast={cast}
            reviews={movieDetails?.reviews?.results ?? []}
            backdrops={movieDetails?.images?.backdrops ?? []}
            posters={movieDetails?.images?.posters ?? []}
          />
        </>
      )}
    </>
  );
};

Movie.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const movie_id = ctx.query.id;
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews&include_image_language=en,null`
    );

    const languagesResponse = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
    );

    const socialLinks = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/external_ids?api_key=${api_key}`
    );

    const error = movieResponse.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const movieDetails = await movieResponse.json();

      const languages = await languagesResponse.json();

      const socialIds = await socialLinks.json();

      return {
        movieDetails,
        error,
        languages,
        socialIds
      };
    }
  } catch {
    return {
      error: true
    };
  }
};

export default Movie;
