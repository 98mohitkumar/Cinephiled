import Link from "next/link";
import { Fragment } from "react";
import { SearchResultsContainer, Keyword } from "./SearchTabStyles";
import PlaceholderText from "components/PlaceholderText";
import { apiEndpoints } from "globals/constants";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { getCleanTitle, removeDuplicates } from "utils/helper";

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
        <SearchResultsContainer className='max-sm:pt-6'>
          {cleanedItems.map((item) => (
            <Link key={item.id} href={`/keywords/${item.id}-${getCleanTitle(item.name)}`} passHref>
              <Keyword className='leading-tight'>{item.name}</Keyword>
            </Link>
          ))}
        </SearchResultsContainer>
      ) : (
        <PlaceholderText height='large'>No Keywords found for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default KeywordSearch;
