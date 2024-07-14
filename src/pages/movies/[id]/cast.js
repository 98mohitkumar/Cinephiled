import CastPage from "components/Cast/CastPage";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions, getReleaseYear } from "src/utils/helper";
import { Error404 } from "styles/GlobalComponents";

const Cast = ({ movieData: { id, title, year, backdrop, poster }, cast, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${title} (${year}) - Cast - cinephiled`}
        description={error ? "Not Found" : `${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/movies/${id}/cast`}
      />

      {error ? <Error404>404</Error404> : <CastPage cast={cast} media={{ title, year, poster }} />}
    </Fragment>
  );
};

Cast.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.movie.getMovieCredits({ id }), fetchOptions());

    if (res.ok) {
      const data = await res.json();

      return {
        movieData: {
          title: data?.title,
          year: getReleaseYear(data?.release_date),
          id: data?.id,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path
        },
        cast: data?.credits?.cast || [],
        error: false
      };
    }

    return {
      movieData: {},
      cast: [],
      error: true
    };
  } catch {
    return {
      movieData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
