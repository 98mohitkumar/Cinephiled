import { Fragment } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { fetchOptions, getNiceName, removeDuplicates } from "utils/helper";

const ProviderMovies = ({ media, region, providerName, providerId }) => {
  const {
    tmdbOptions: { movie: movieSortOptions }
  } = sortOptions;
  const defaultSortOption = movieSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });

  const { list, resetQueryState, isLoading } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.watchProviders.watchProviderMovies({
        providerId,
        region: region,
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
        title={`Movies - ${providerName} (${region}) - Cinephiled`}
        description={`Explore a comprehensive list of Movies available on ${providerName} in ${region}`}
        url={`${siteInfo.url}/${ROUTES.watchProviders}/${getNiceName({ id: providerId, name: providerName })}/movies`}
      />

      <LayoutContainer className='relative py-4064'>
        <DominantColor tint />

        <section className='relative z-5'>
          <H2 tag='h1' className='mx-auto max-w-screen-lg text-center text-neutral-400'>
            Movies available on
            <span className='text-white'>
              {" "}
              {providerName}&nbsp;({region})
            </span>
          </H2>

          {renderList?.length > 0 ? (
            <Fragment>
              <div className='my-2432 flex items-center justify-end gap-10'>
                <Select defaultValue={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className='w-fit min-w-[250px]'>
                    <SelectValue placeholder='Sort By:' />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    {movieSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MediaTemplateGrid media={renderList} mediaType='movie' isLoadingNewItems={isLoading} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>
              No Movies are available on {providerName}&nbsp;({region})
            </PlaceholderText>
          )}
        </section>
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

    const [providerMoviesData, regionsData] = await Promise.all([providerMoviesRes.json(), regionsRes.json()]);

    return {
      props: {
        providerId: providerId.split("-")[0],
        media: providerMoviesData.results || [],
        providerName: providerId.split("-").slice(1).join(" "),
        region: regionsData?.results?.find(({ iso_3166_1 }) => iso_3166_1 === (watchregion || "US"))?.iso_3166_1 || ""
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default ProviderMovies;
