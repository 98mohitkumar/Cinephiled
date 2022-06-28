import Head from 'next/head';
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
    }

    if (easterSeen === 'seen') {
      setHasSeen(true);
    } else {
      setHasSeen(false);
    }
  }, []);

  const easterHandler = () => {
    setShowEaster(!showEaster);
    window.scrollTo(0, 0);
    setHasSeen(true);
    localStorage.setItem('easterSeen', 'seen');
  };

  let directors = [];
  let writers = [];
  let characters = [];
  let cast = [];
  let videos = [];
  let runtime = '';
  let getyear = '';

  let reviewDetails = [];
  let backdrops = [];
  let posters = [];
  let creditsDetails = [];
  let movieFacts = {};

  let status = '';

  let country = '';

  if (!error) {
    creditsDetails = movieDetails.credits;

    creditsDetails.crew.forEach((item) => {
      if (item.job === 'Director') directors.push(item);
      if (item.job === 'Writer') writers.push(item);
      if (item.job === 'Characters') characters.push(item);
    });

    movieDetails.videos.results.forEach(
      (item) =>
        item.site === 'YouTube' && item.type === 'Trailer' && videos.push(item)
    );

    reviewDetails = movieDetails.reviews;
    backdrops = movieDetails.images.backdrops;
    posters = movieDetails.images.posters;
    cast = creditsDetails.cast;

    cast.splice(15);

    country =
      movieDetails.production_countries[0] === undefined
        ? 'US'
        : movieDetails.production_countries[0].iso_3166_1;

    getyear = !movieDetails.release_date
      ? 'TBA'
      : new Date(movieDetails.release_date).getFullYear();

    const getH = Math.floor(movieDetails.runtime / 60);
    const getM = Math.ceil((movieDetails.runtime / 60 - getH) * 60);
    runtime = { getH, getM };

    status = !movieDetails.status ? 'TBA' : movieDetails.status;

    movieFacts = {
      status,
      language: movieDetails.original_language,
      budget: movieDetails.budget,
      revenue: movieDetails.revenue
    };
  }

  if (directors.length > 2) {
    directors.splice(2);
  }

  if (writers.length > 3) {
    writers.splice(3);
  }

  if (characters.length > 2) {
    characters.splice(2);
  }

  let crew = [...directors, ...writers, ...characters];

  return (
    <>
      <Head>
        <title>
          {!error
            ? `${movieDetails.title} (${getyear}) - Cinephiled`
            : 'Not Found - Cinephiled'}
        </title>
        {!error && (
          <>
            <meta
              property='og:image'
              content={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
            />
            <meta
              property='og:title'
              content={`${movieDetails.title} (${getyear}) - Cinephiled`}
            ></meta>
          </>
        )}
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          {easter.current && (
            <>
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
          <HeroDetailsContainer className='position-relative mb-auto'>
            <HeroBgContainer className='position-absolute'>
              <HeroBg
                backdrop={movieDetails.backdrop_path}
                className='position-absolute'
              ></HeroBg>
              <DominantColor image={movieDetails.poster_path} />
            </HeroBgContainer>

            <DetailsHeroWrap>
              <HeroImgWrapper>
                <HeroImg data={movieDetails.poster_path} />

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
                  homepage={movieDetails.homepage}
                />
              </HeroImgWrapper>
              <Gradient />
              <HeroInfo className='d-flex'>
                <MovieDetails
                  movieDetailsData={movieDetails}
                  date={getyear}
                  runtime={runtime}
                  crew={crew}
                  easter={easter.current}
                  showEaster={easterHandler}
                />
              </HeroInfo>
            </DetailsHeroWrap>
          </HeroDetailsContainer>
          <MovieFacts
            facts={movieFacts}
            languages={languages}
            country={country}
          />
          <MovieTab
            id={movieDetails.id}
            cast={cast}
            reviews={reviewDetails.results}
            backdrops={backdrops}
            posters={posters}
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
      `https://api.themoviedb.org/3/movie/${movie_id}/external_ids?api_key=${api_key}&language=en-US`
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
    return { error: true };
  }
};

export default Movie;
