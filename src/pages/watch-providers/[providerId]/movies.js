import DominantColor from "components/DominantColor/DominantColor";
import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { Fragment } from "react";
import { Error404, LayoutContainer } from "styles/GlobalComponents";

const ProviderMovies = ({ error, media, region, providerName, providerId }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "providerMovies",
    providerId,
    region: region?.iso_3166_1
  });

  const renderList = media.concat(list);

  return (
    <Fragment>
      <MetaWrapper
        title={`Movies - ${providerName} (${region?.iso_3166_1}) - Cinephiled`}
        description={`Explore a comprehensive list of Movies available on ${providerName} in ${region?.iso_3166_1}`}
        url={`https://cinephiled.vercel.app/watch-providers/${providerId}-${providerName}/movies`}
      />

      <LayoutContainer className='relative z-20'>
        <DominantColor tint flip />

        {error ? (
          <Error404>404</Error404>
        ) : (
          <div className='relative z-20'>
            {renderList?.length > 0 ? (
              <Fragment>
                <h1 className='mt-2 mb-4 pb-5 max-sm:text-2xl text-4xl w-full text-center font-medium text-zinc-400'>
                  Movies available on <br className='max-sm:block hidden' />
                  <span className='text-neutral-50 font-semibold'>
                    {providerName} ({region?.iso_3166_1})
                  </span>
                </h1>

                <MoviesTemplate movies={renderList} />
              </Fragment>
            ) : (
              <div className='min-h-[75vh] grid place-items-center'>
                <h2 className='text-3xl font-semibold relative z-10 text-center'>
                  No Movies available on {providerName} in this region
                </h2>
              </div>
            )}
          </div>
        )}
      </LayoutContainer>
    </Fragment>
  );
};

ProviderMovies.getInitialProps = async (ctx) => {
  try {
    const { providerId, region } = ctx.query;

    const [providerMoviesRes, regionsRes] = await Promise.all([
      fetch(
        apiEndpoints.watchProviders.watchProviderMovies({
          providerId: providerId.split("-")[0],
          region: region || "US",
          pageQuery: 1
        })
      ),
      fetch(apiEndpoints.watchProviders.regions)
    ]);

    if (!providerMoviesRes.ok) throw Error("cannot fetch data");

    const [providerMoviesData, regionsData] = await Promise.all([
      providerMoviesRes.json(),
      regionsRes.json()
    ]);

    return {
      error: false,
      providerId: providerId.split("-")[0],
      media: providerMoviesData.results || [],
      providerName: providerId.split("-").slice(1).join(" "),
      region: regionsData?.results?.find(({ iso_3166_1 }) => iso_3166_1 === (region || "US")) || {}
    };
  } catch {
    return {
      error: true,
      providerId: "",
      media: [],
      region: {},
      providerName: ""
    };
  }
};

export default ProviderMovies;
