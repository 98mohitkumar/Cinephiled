import CastPage from "components/Cast/CastPage";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions, getReleaseYear, mergeEpisodeCount } from "src/utils/helper";
import { Error404 } from "styles/GlobalComponents";

const Cast = ({ tvData: { id, title, year, backdrop, poster }, cast, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : `${title} (${year}) - Cast - cinephiled`}
        description={`${title} cast`}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/cast`}
      />

      {error ? <Error404>404</Error404> : <CastPage cast={cast} media={{ title, year, poster }} />}
    </Fragment>
  );
};

Cast.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.tv.getTvCredits({ id }), fetchOptions());

    if (res.ok) {
      const data = await res.json();

      const releaseYear = getReleaseYear(data?.first_air_date);

      return {
        tvData: {
          title: data?.name ?? "",
          year: releaseYear,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path,
          id: data?.id
        },
        cast: mergeEpisodeCount(
          data?.aggregate_credits?.cast
            .map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role })))
            .flat()
        ),
        error: false
      };
    }
    return {
      tvData: {},
      cast: [],
      error: true
    };
  } catch {
    return {
      tvData: {},
      cast: [],
      error: true
    };
  }
};

export default Cast;
