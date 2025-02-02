import { Fragment } from "react";

import CastPage from "components/Cast/CastPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { fetchOptions, getReleaseYear } from "utils/helper";

const Cast = ({ movieData: { id, title, year, backdrop, poster }, cast }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${title} (${year}) - Cast - cinephiled`}
        description={`${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/movie/${id}/cast`}
      />

      <CastPage cast={cast} media={{ title, year, poster }} />
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.movie.getMovieCredits({ id }), fetchOptions());

    if (!res.ok) {
      throw new Error("error fetching data");
    }

    const data = await res.json();

    return {
      props: {
        movieData: {
          title: data?.title,
          year: getReleaseYear(data?.release_date),
          id: data?.id,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path
        },
        cast: data?.credits?.cast || []
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Cast;
