import MetaWrapper from 'components/MetaWrapper';
import MovieDetails from 'components/MovieInfo/MovieDetails';
import MovieFacts from 'components/MovieInfo/MovieFacts';
import MovieTab from 'components/MovieInfo/MovieTab';
import Recommendations from 'components/Recommendations/Recommendations';
import { apiEndpoints } from 'globals/constants';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Error404 } from 'styles/GlobalComponents';

const Movie = ({
  id,
  title,
  releaseYear,
  releaseDate,
  genres,
  runtime,
  tagline,
  overview,
  rating,
  moviePoster,
  backdropPath,
  crewData,
  trailerLink,
  socialIds,
  homepage,
  status,
  language,
  country,
  budget,
  revenue,
  cast,
  reviews,
  backdrops,
  posters,
  recommendations,
  error
}) => {
  let easter = useRef(false);
  const [showEaster, setShowEaster] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  if (!error && id === 345911) {
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

  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${title} (${releaseYear}) - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        image={`https://image.tmdb.org/t/p/w780${backdropPath}`}
        description={overview}
        url={`https://cinephiled.vercel.app/movies/${id}-${title?.replace(
          /[' ', '/']/g,
          '-'
        )}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* movie info hero section */}
          <MovieDetails
            easter={{
              renderEaster: easter.current,
              hasSeen,
              showEaster,
              easterHandler
            }}
            year={releaseYear}
            movieDetails={{
              id,
              title,
              overview,
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
              homepage
            }}
          />

          {/* movie facts */}
          <MovieFacts
            facts={{
              status,
              budget,
              revenue,
              language
            }}
            country={country}
          />

          {/* movie tabs */}
          <MovieTab
            cast={cast}
            reviews={reviews}
            backdrops={backdrops}
            posters={posters}
          />

          {/* recommendations */}
          {recommendations?.length > 0 && (
            <Recommendations data={recommendations} type='movies' />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Movie.getInitialProps = async (ctx) => {
  try {
    const movieResponse = await fetch(
      apiEndpoints.movie.movieDetails(ctx.query.id)
    );

    const languagesResponse = await fetch(apiEndpoints.language);
    const error = movieResponse.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const movieDetails = await movieResponse.json();
      const languages = await languagesResponse.json();
      const country = !movieDetails?.production_countries[0]
        ? 'US'
        : movieDetails?.production_countries[0].iso_3166_1;

      const releaseYear = !movieDetails?.release_date
        ? 'TBA'
        : new Date(movieDetails?.release_date).getFullYear();

      const status = !movieDetails?.status ? 'TBA' : movieDetails?.status;

      const language = languages.filter(
        (item) => item.iso_639_1 === movieDetails.original_language
      );

      const trailers = movieDetails?.videos?.results?.filter(
        (item) => item?.site === 'YouTube' && item?.type === 'Trailer'
      );

      const crewData = [
        ...movieDetails?.credits?.crew
          ?.filter((credit) => credit?.job === 'Director')
          .slice(0, 2),
        ...movieDetails?.credits?.crew
          ?.filter((credit) => credit?.job === 'Writer')
          .slice(0, 3),
        ...movieDetails?.credits?.crew
          ?.filter((credit) => credit?.job === 'Characters')
          .slice(0, 2)
      ];

      return {
        id: movieDetails?.id,
        title: movieDetails?.title,
        releaseYear,
        releaseDate: movieDetails?.release_date,
        genres: movieDetails?.genres,
        runtime: movieDetails?.runtime,
        tagline: movieDetails?.tagline,
        overview: movieDetails?.overview,
        rating: movieDetails?.vote_average,
        moviePoster: movieDetails?.poster_path,
        backdropPath: movieDetails?.backdrop_path,
        crewData,
        trailerLink: trailers?.[0]?.key ?? '',
        socialIds: movieDetails?.external_ids,
        homepage: movieDetails?.homepage,
        status,
        language: language?.[0]?.english_name,
        country,
        budget: movieDetails?.budget,
        revenue: movieDetails?.revenue,
        cast: {
          totalCount: movieDetails?.credits?.cast?.length,
          data: movieDetails?.credits?.cast?.slice(0, 15)
        },
        reviews: movieDetails?.reviews?.results ?? [],
        backdrops: movieDetails?.images?.backdrops ?? [],
        posters: movieDetails?.images?.posters ?? [],
        recommendations: movieDetails?.recommendations?.results,
        error
      };
    }
  } catch {
    return {
      error: true
    };
  }
};

export default Movie;
