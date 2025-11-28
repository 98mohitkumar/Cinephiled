import { Fragment } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo, sortOptions } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import useSort from "hooks/useSort";
import { fetchOptions, getNiceName, removeDuplicates } from "utils/helper";

const TvShows = ({ renderList, genreName, genreId }) => {
  const {
    tmdbOptions: { tv: tvSortOptions }
  } = sortOptions;
  const defaultSortOption = tvSortOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: false, defaultSortOption });

  const { list, resetQueryState, isLoading } = useInfiniteQuery({
    initialPage: 3,
    getEndpoint: ({ page }) => apiEndpoints.tv.tvGenre({ genreId, pageQuery: page, sortBy: sortBy })
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
        url={`${siteInfo.url}/${ROUTES.genres}/${getNiceName({ id: genreId, name: genreName })}/tv`}
      />

      <div className='relative'>
        <DominantColor tint />
        <LayoutContainer className='relative z-5 pb-24 pt-4864'>
          <H2 tag='h1' className='mb-2432 text-center text-white'>
            {genreName} TV Shows
          </H2>

          {cleanedItems?.length > 0 ? (
            <Fragment>
              <FlexBox className='mb-2432 items-center justify-end gap-10'>
                <Select defaultValue={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className='w-fit min-w-[250px]'>
                    <SelectValue placeholder='Sort By:' />
                  </SelectTrigger>
                  <SelectContent position='popper' align='end'>
                    {tvSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FlexBox>

              <MediaTemplateGrid media={cleanedItems} mediaType='tv' isLoadingNewItems={isLoading} />
            </Fragment>
          ) : (
            <PlaceholderText height='large'>No TV Shows are available for this genre</PlaceholderText>
          )}
        </LayoutContainer>
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
