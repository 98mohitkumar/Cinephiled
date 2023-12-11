import removeDuplicates from "hooks/removeDuplicates";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import Link from "next/link";
import { Fragment, useMemo } from "react";
import { EmptySearch, SearchResultsContainer, Keyword } from "./SearchTabStyles";

const KeywordSearch = ({ searchQuery, keywords }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: "keywordSearch",
    searchQuery
  });

  const extendedList = useMemo(() => keywords.results.concat(list), [list, keywords]);

  const { cleanedItems } = removeDuplicates(extendedList);

  return (
    <Fragment>
      {keywords.results.length === 0 ? (
        <EmptySearch className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center'>
          No Keywords for this query.
        </EmptySearch>
      ) : (
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
      )}
    </Fragment>
  );
};

export default KeywordSearch;
