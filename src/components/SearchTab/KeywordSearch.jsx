import Link from "next/link";
import { Fragment } from "react";

import PlaceholderText from "components/Shared/PlaceholderText";
import H1 from "components/UI/Typography/H1";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getNiceName, removeDuplicates } from "utils/helper";

const KeywordSearch = ({ searchQuery, keywords }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    getEndpoint: ({ page }) =>
      apiEndpoints.search.keywordSearch({
        query: searchQuery,
        pageQuery: page
      })
  });

  const { cleanedItems } = removeDuplicates(keywords.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <div className='mx-auto flex max-w-screen-xl flex-col items-start gap-16'>
          {cleanedItems.map((item) => (
            <Link key={item.id} href={`/${ROUTES.keywords}/${getNiceName({ id: item.id, name: item.name })}`} passHref>
              <H1 as='span' weight='medium' className='transition-colors can-hover:text-neutral-500'>
                {item.name}
              </H1>
            </Link>
          ))}
        </div>
      ) : (
        <PlaceholderText height='large'>No Keywords found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default KeywordSearch;
