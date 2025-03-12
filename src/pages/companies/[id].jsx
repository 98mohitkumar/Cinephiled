import CompanyPage from "components/pages/Companies/CompanyPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import CompanyHero from "components/Shared/ProductionHero";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { Fragment } from "react";
import { fetchOptions, getNiceName, randomizeItems } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Company = ({ companyDetails, movies, tvShows }) => {
  const logo = companyDetails?.images?.logos?.at(0);
  const backdrops = movies.concat(tvShows).map(({ id, backdrop_path }) => ({ id, src: backdrop_path }));
  const extendedBackdrops = randomizeItems(
    backdrops.length < 40
      ? [
          ...backdrops,
          ...Array(40 - backdrops.length)
            .fill(0)
            .map(() => ({ id: Math.random(), src: null }))
        ]
      : backdrops
  );

  return (
    <Fragment>
      <MetaWrapper
        title={`${companyDetails?.name} - cinephiled`}
        description={`Movies and TV shows produced by ${companyDetails?.name}.`}
        url={`${siteInfo.url}/${ROUTES.networks}/${getNiceName({ id: companyDetails?.id, name: companyDetails?.name })}`}
        image={getTMDBImage({ path: companyDetails?.logo_path, type: "logo", size: "original" })}
      />

      <CompanyHero details={companyDetails} backdrops={extendedBackdrops} logo={logo} />
      <CompanyPage movies={movies} tvShows={tvShows} id={companyDetails?.id} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const companyId = id.split("-")[0];

    const [res, companyMovies, companyTv] = await Promise.all([
      fetch(apiEndpoints.company.companyDetails(companyId), fetchOptions()),
      fetch(apiEndpoints.company.companyMovies({ id: companyId }), fetchOptions()),
      fetch(apiEndpoints.company.companyTv({ id: companyId }), fetchOptions())
    ]);

    if (!res.ok) throw new Error("cannot fetch details");

    const [data, movies, tvShows] = await Promise.all([res.json(), companyMovies.json(), companyTv.json()]);

    return {
      props: {
        companyDetails: data,
        movies: movies?.results || [],
        tvShows: tvShows?.results || []
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Company;
