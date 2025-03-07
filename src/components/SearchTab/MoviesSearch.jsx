import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

const MoviesSearch = ({ searchQuery, movies, year }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.movieSearch({
        query: searchQuery,
        pageQuery: page,
        year
      })
  });
  const { cleanedItems } = removeDuplicates(movies.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <MediaTemplateGrid media={cleanedItems} mediaType='movie' />
      ) : (
        <PlaceholderText height='large'>No Movies found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default MoviesSearch;
