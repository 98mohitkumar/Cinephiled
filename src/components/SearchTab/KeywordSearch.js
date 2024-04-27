import PlaceholderText from "components/PlaceholderText";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Link from "next/link";
import { Fragment } from "react";
import { getCleanTitle, removeDuplicates } from "src/utils/helper";
import { SearchResultsContainer, Keyword } from "./SearchTabStyles";

const KeywordSearch = ({ searchQuery, keywords }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "keywordSearch",
    searchQuery
  });

  const { cleanedItems } = removeDuplicates(keywords.results.concat(list));

  return (
    <Fragment>
      {cleanedItems?.length > 0 ? (
        <SearchResultsContainer className='max-sm:pt-6'>
          {cleanedItems.map((item) => (
            <Link
              key={item.id}
              href={`/keywords/${item.id}-${getCleanTitle(item.name)}`}
              passHref
              scroll={false}>
              <Keyword className='leading-tight'>{item.name}</Keyword>
            </Link>
          ))}
        </SearchResultsContainer>
      ) : (
        <PlaceholderText height='large'>No Keywords for this query.</PlaceholderText>
      )}
    </Fragment>
  );
};

export default KeywordSearch;
