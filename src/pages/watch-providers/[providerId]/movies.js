import DominantColor from "components/DominantColor/DominantColor";
import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import MetaWrapper from "components/MetaWrapper";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import { apiEndpoints, sortOptions } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { Fragment } from "react";
import { getActiveSortKey } from "src/utils/getSortedItems";
import { fetchOptions, removeDuplicates } from "src/utils/helper";
import { LayoutContainer } from "styles/GlobalComponents";

const ProviderMovies = ({ media, region, providerName, providerId }) => {
  const { sortBy, handleSortSelection } = useSort({ shallow: false });

  const {
    tmdbOptions: { movie: movieSortOptions }
  } = sortOptions;

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.watchProviders.watchProviderMovies({
        providerId,
        region: region?.iso_3166_1,
        pageQuery: page,
        sortBy
      })
  });

  const { cleanedItems: renderList } = removeDuplicates(media.concat(list));

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  return (
    <Fragment>
      <MetaWrapper
        title={`Movies - ${providerName} (${region?.iso_3166_1}) - Cinephiled`}
        description={`Explore a comprehensive list of Movies available on ${providerName} in ${region?.iso_3166_1}`}
        url={`https://cinephiled.vercel.app/watch-providers/${providerId}-${providerName}/movies`}
      />

      <LayoutContainer className='relative z-20'>
        <DominantColor tint flip />

        <div className='relative z-20'>
          {renderList?.length > 0 ? (
            <Fragment>
              <div className='text-center pb-6 my-5 lg:my-10'>
                <h1 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.25rem] w-full font-semibold text-zinc-400'>
                  Movies available on <br className='max-sm:block hidden' />
                  <span className='text-neutral-50 font-semibold'>
                    {providerName} ({region?.iso_3166_1})
                  </span>
                </h1>
              </div>

              <div className='flex justify-end mb-8'>
                <Select
                  options={movieSortOptions}
                  activeKey={sortBy || "default"}
                  triggerText={getActiveSortKey({
                    options: movieSortOptions,
                    sortBy,
                    defaultKey: "default"
                  })}
                  baseSizeOptions
                  label='Sort By:'
                  handleChange={handleSort}
                />
              </div>

              <MoviesTemplate movies={renderList} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>
              No Movies available on {providerName} in this region
            </PlaceholderText>
          )}
        </div>
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { providerId, watchregion, sortBy } = ctx.query;

    const [providerMoviesRes, regionsRes] = await Promise.all([
      fetch(
        apiEndpoints.watchProviders.watchProviderMovies({
          providerId: providerId.split("-")[0],
          region: watchregion || "US",
          pageQuery: 1,
          sortBy
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
      props: {
        providerId: providerId.split("-")[0],
        media: providerMoviesData.results || [],
        providerName: providerId.split("-").slice(1).join(" "),
        region:
          regionsData?.results?.find(({ iso_3166_1 }) => iso_3166_1 === (watchregion || "US")) || {}
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default ProviderMovies;
