import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import H6 from "components/UI/Typography/H6";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";

const CollectionsSearch = ({ collections, searchQuery }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.collectionSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const renderList = collections?.results.concat(list);

  return (
    <Fragment>
      {renderList?.length > 0 ? (
        <MediaTemplateGrid media={renderList} gridType='backdrop' showRating={false} mediaType={ROUTES.collections}>
          {(list) => (
            <H6 weight='medium' className='mt-12 text-pretty text-center'>
              {list.name}
            </H6>
          )}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText height='large'>No results found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default CollectionsSearch;
