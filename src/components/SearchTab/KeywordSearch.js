import useInfiniteQuery from "hooks/useInfiniteQuery";
import Link from "next/link";
import { Fragment } from "react";
import { removeDuplicates } from "src/utils/helper";
import { EmptySearch, SearchResultsContainer, Keyword } from "./SearchTabStyles";

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
              href={`/keywords/${item.id}-${item.name.replace(/[' ', '/']/g, "-")}`}
              passHref
              scroll={false}>
              <a>
                <Keyword className='leading-tight'>{item.name}</Keyword>
              </a>
            </Link>
          ))}
        </SearchResultsContainer>
      ) : (
        <EmptySearch className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center'>
          No Keywords for this query.
        </EmptySearch>
      )}
    </Fragment>
  );
};

export default KeywordSearch;
