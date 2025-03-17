import { Fragment } from "react";

import CompanyPage from "components/pages/Companies/CompanyPage";
import MetaWrapper from "components/Shared/MetaWrapper";
import CompanyHero from "components/Shared/ProductionHero";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, getNiceName, randomizeItems, removeDuplicates } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Company = ({ companyDetails, movies, tvShows, backdrops }) => {
  const logo = companyDetails?.images?.logos?.at(0);

  return (
    <Fragment>
      <MetaWrapper
        title={`${companyDetails?.name} - cinephiled`}
        description={`Movies and TV shows produced by ${companyDetails?.name}.`}
        url={`${siteInfo.url}/${ROUTES.networks}/${getNiceName({ id: companyDetails?.id, name: companyDetails?.name })}`}
        image={getTMDBImage({ path: companyDetails?.logo_path, type: "logo", size: "original" })}
      />

      <CompanyHero details={companyDetails} backdrops={backdrops} logo={logo} />
      <CompanyPage movies={movies} tvShows={tvShows} id={companyDetails?.id} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    const companyId = id.split("-")[0];

    const [res, companyMoviesRes, companyMoviesResNext, companyTvRes, companyTvResNext] = await Promise.all([
      fetch(apiEndpoints.company.companyDetails(companyId), fetchOptions()),
      fetch(apiEndpoints.company.companyMovies({ id: companyId }), fetchOptions()),
      fetch(apiEndpoints.company.companyMovies({ id: companyId, pageQuery: 2 }), fetchOptions()),
      fetch(apiEndpoints.company.companyTv({ id: companyId }), fetchOptions()),
      fetch(apiEndpoints.company.companyTv({ id: companyId, pageQuery: 2 }), fetchOptions())
    ]);

    if (!res.ok) throw new Error("cannot fetch details");

    const [data, movies, moviesNext, tvShows, tvShowsNext] = await Promise.all([
      res.json(),
      companyMoviesRes.json(),
      companyMoviesResNext.json(),
      companyTvRes.json(),
      companyTvResNext.json()
    ]);

    const { cleanedItems: cleanedMovies } = removeDuplicates(movies?.results?.concat(moviesNext?.results)) || [];
    const { cleanedItems: cleanedTv } = removeDuplicates(tvShows?.results?.concat(tvShowsNext?.results)) || [];

    const backdrops = cleanedMovies.concat(cleanedTv).map(({ id, backdrop_path }) => ({ id, src: backdrop_path }));
    const extendedBackdrops =
      backdrops.length < 60
        ? [
            ...backdrops,
            ...Array(60 - backdrops.length)
              .fill(0)
              .map(() => ({ id: Math.random(), src: null }))
          ]
        : backdrops;

    return {
      props: {
        companyDetails: data,
        movies: cleanedMovies,
        tvShows: cleanedTv,
        backdrops: randomizeItems(extendedBackdrops)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Company;
