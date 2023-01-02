import MetaWrapper from 'components/MetaWrapper';
import MovieDetails from 'components/MovieInfo/MovieDetails';
import MovieFacts from 'components/MovieInfo/MovieFacts';
import MovieTab from 'components/MovieInfo/MovieTab';
import Recommendations from 'components/Recommendations/Recommendations';
import { apiEndpoints } from 'globals/constants';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Error404 } from 'styles/GlobalComponents';

const Movie = ({ movieDetails, error, language, favorites }) => {
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

  const cast = useMemo(
    () => (!error ? movieDetails?.credits?.cast.slice(0, 15) : []),
    [error, movieDetails?.credits?.cast]
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

  const year = useMemo(
    () =>
      !error
        ? !movieDetails?.release_date
          ? 'TBA'
          : new Date(movieDetails?.release_date).getFullYear()
        : '',
    [error, movieDetails?.release_date]
  );

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
            budget: movieDetails?.budget,
            revenue: movieDetails?.revenue,
            language
          }
        : {},
    [error, language, movieDetails?.budget, movieDetails?.revenue, status]
  );

  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${movieDetails?.title} (${year}) - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        image={`https://image.tmdb.org/t/p/w780${movieDetails?.backdrop_path}`}
        description={movieDetails?.overview}
        url={`https://cinephiled.vercel.app/movies/${
          movieDetails?.id
        }-${movieDetails?.title.replace(/[' ', '/']/g, '-')}`}
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
            year={year}
            movieDetails={movieDetails}
            favorites={favorites}
          />

          {/* movie facts */}
          <MovieFacts facts={movieFacts} country={country} />

          {/* movie tabs */}
          <MovieTab
            id={movieDetails.id}
            cast={cast}
            reviews={movieDetails?.reviews?.results ?? []}
            backdrops={movieDetails?.images?.backdrops ?? []}
            posters={movieDetails?.images?.posters ?? []}
          />

          {/* recommendations */}
          {movieDetails?.recommendations?.results?.length > 0 && (
            <Recommendations
              data={movieDetails?.recommendations?.results}
              type='movies'
            />
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

      const language = languages.filter(
        (item) => item.iso_639_1 === movieDetails.original_language
      );

      return {
        movieDetails,
        error,
        language: language?.[0]?.english_name
      };
    }
  } catch {
    return {
      error: true
    };
  }
};

export default Movie;
