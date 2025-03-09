import { Fragment } from "react";

import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { removeDuplicates } from "utils/helper";

const TVResults = ({ keywordId, tv }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) => apiEndpoints.keywords.keywordTv({ id: keywordId, pageQuery: page })
  });

  const { cleanedItems } = removeDuplicates(tv.concat(list));

  return (
    <Fragment>
      <MediaTemplateGrid media={cleanedItems} mediaType='tv' />
    </Fragment>
  );
};

export default TVResults;
