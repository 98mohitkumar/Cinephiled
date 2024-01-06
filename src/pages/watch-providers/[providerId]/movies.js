import DominantColor from "components/DominantColor/DominantColor";
import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import MetaWrapper from "components/MetaWrapper";
import PlaceholderText from "components/PlaceholderText";
import { apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { Fragment } from "react";
import { fetchOptions } from "src/utils/helper";
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
                <h1 className='mt-2 mb-4 pb-5 text-[calc(1.375rem_+_1.5vw)] xl:text-[2.25rem] w-full text-center font-medium text-zinc-400'>
                  Movies available on <br className='max-sm:block hidden' />
                  <span className='text-neutral-50 font-semibold'>
                    {providerName} ({region?.iso_3166_1})
                  </span>
                </h1>

                <MoviesTemplate movies={renderList} />
              </Fragment>
            ) : (
              <PlaceholderText height='large'>
                No Movies available on {providerName} in this region
              </PlaceholderText>
            )}
          </div>
        )}
      </LayoutContainer>
    </Fragment>
  );
};

ProviderMovies.getInitialProps = async (ctx) => {
  try {
    const { providerId, watchregion } = ctx.query;

    const [providerMoviesRes, regionsRes] = await Promise.all([
      fetch(
        apiEndpoints.watchProviders.watchProviderMovies({
          providerId: providerId.split("-")[0],
          region: watchregion || "US",
          pageQuery: 1
        }),
        fetchOptions()
      ),
      fetch(apiEndpoints.watchProviders.regions, fetchOptions())
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
      region:
        regionsData?.results?.find(({ iso_3166_1 }) => iso_3166_1 === (watchregion || "US")) || {}
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
