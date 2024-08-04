import DominantColor from "components/DominantColor/DominantColor";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import { apiEndpoints, sortOptions } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { Fragment } from "react";
import { getActiveSortKey } from "src/utils/getSortedItems";
import { fetchOptions, getCleanTitle, removeDuplicates } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents/index";

const TvShows = ({ renderList, genreName, genreId }) => {
  const { sortBy, handleSortSelection } = useSort({ shallow: false });

  const {
    tmdbOptions: { tv: tvSortOptions }
  } = sortOptions;

  const { list, resetQueryState } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.tv.tvGenre({ genreId, pageQuery: page, sortBy })
  });

  const { cleanedItems } = removeDuplicates(renderList.concat(list));

  const handleSort = (key) => {
    handleSortSelection(key);
    resetQueryState();
  };

  return (
    <Fragment>
      <MetaWrapper
        title={`${genreName} TV Shows - Cinephiled`}
        description={`${genreName} TV Shows`}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${getCleanTitle(genreName)}/tv`}
      />

      <div className='relative'>
        <DominantColor flip tint />
        <ModulesWrapper className='relative z-10'>
          {renderList?.length > 0 ? (
            <Fragment>
              <div className='text-center py-6'>
                <div className='my-5 lg:my-10'>
                  <Span className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] leading-12 block font-semibold'>
                    {genreName} TV Shows
                  </Span>
                </div>
              </div>

              <div className='flex justify-end mb-8'>
                <Select
                  options={tvSortOptions}
                  activeKey={sortBy || "default"}
                  triggerText={getActiveSortKey({
                    options: tvSortOptions,
                    sortBy,
                    defaultKey: "default"
                  })}
                  baseSizeOptions
                  label='Sort By:'
                  handleChange={handleSort}
                />
              </div>

              <TVTemplate TV={cleanedItems} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No TV Shows For Now</PlaceholderText>
          )}
        </ModulesWrapper>
      </div>
    </Fragment>
  );
};

export default TvShows;

export const getServerSideProps = async (ctx) => {
  try {
    const param = ctx.query.item.split("-");
    const genreId = param[0];
    const genreName = param.slice(1, param.length).join("-");
    const sortBy = ctx.query.sortBy;

    const [response, nextPage] = await Promise.all([
      fetch(apiEndpoints.tv.tvGenre({ genreId, pageQuery: 1, sortBy }), fetchOptions()),
      fetch(apiEndpoints.tv.tvGenre({ genreId, pageQuery: 2, sortBy }), fetchOptions())
    ]);

    if (!response.ok) throw new Error("error fetching tv shows");

    const [tvList, secondTvList] = await Promise.all([response.json(), nextPage.json()]);

    const renderList = tvList["results"].concat(secondTvList.results);

    return {
      props: {
        renderList,
        genreName,
        genreId
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
