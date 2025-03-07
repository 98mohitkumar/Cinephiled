import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

const TVSearch = ({ searchQuery, tv, year }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.tvSearch({
        query: searchQuery,
        pageQuery: page,
        year
      })
  });
  const { cleanedItems } = removeDuplicates(tv.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <MediaTemplateGrid media={cleanedItems} mediaType='tv' />
      ) : (
        <PlaceholderText height='large'>No TV Shows found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default TVSearch;
