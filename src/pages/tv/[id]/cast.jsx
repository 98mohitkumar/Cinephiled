import { Fragment } from "react";

import CastPage from "components/Shared/CastPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, getReleaseYear, mergeEpisodeCount } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Cast = ({ tvData: { id, title, year, backdrop, poster }, cast }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={`${title} (${year}) - Cast - cinephiled`}
        description={`${title} cast`}
        image={getTMDBImage({ type: "backdrop", path: backdrop, size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name: title })}/cast`}
      />

      <CastPage cast={cast} media={{ title, year, poster }} showEpisodeCount />
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.query;
    const res = await fetch(apiEndpoints.tv.getTvCredits({ id }), fetchOptions());

    if (!res.ok) {
      throw new Error("error fetching data");
    }

    const data = await res.json();

    const releaseYear = getReleaseYear(data?.first_air_date);

    return {
      props: {
        tvData: {
          title: data?.name || "",
          year: releaseYear,
          backdrop: data?.backdrop_path,
          poster: data?.poster_path,
          id: data?.id
        },
        cast: mergeEpisodeCount(data?.aggregate_credits?.cast.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role }))).flat())
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Cast;
