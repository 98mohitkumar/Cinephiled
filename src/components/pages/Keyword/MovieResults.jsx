import { Fragment } from "react";

import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

const MovieResults = ({ keywordId, movies }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) => apiEndpoints.keywords.keywordMovies({ id: keywordId, pageQuery: page })
  });

  const { cleanedItems } = removeDuplicates(movies.concat(list));

  return (
    <Fragment>
      <MediaTemplateGrid media={cleanedItems} mediaType='movie' />
    </Fragment>
  );
};

export default MovieResults;
