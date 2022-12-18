import Link from 'next/link';
import { Fragment, useEffect, useMemo } from 'react';
import useInfiniteQuery from '../../hooks/useInfiniteQuery';
import {
  EmptySearch,
  SearchResultsContainer,
  Keyword
} from './SearchTabStyles';

const KeywordSearch = ({ searchQuery, keywords, searchLength, setLength }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: 'keywordSearch',
    searchQuery
  });

  const renderList = useMemo(() => {
    let filtered = [];
    return keywords.concat(list).map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    });
  }, [list, keywords]);

  useEffect(() => {
    if (searchLength.keywords < renderList.length) {
      setLength((prev) => ({
        ...prev,
        keywords: renderList.filter((item) => !item?.duplicate).length
      }));
    }
  }, [renderList, searchLength.keywords, setLength]);

  return (
    <Fragment>
      {keywords.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No Keywords for this query.
        </EmptySearch>
      ) : (
        <SearchResultsContainer>
          {renderList.map(
            (item) =>
              !item?.duplicate && (
                <Link
                  key={item.id}
                  href={`/keywords/${item.id}-${item.name.replace(
                    /[' ']/g,
                    '-'
                  )}`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <Keyword>{item.name}</Keyword>
                  </a>
                </Link>
              )
          )}
        </SearchResultsContainer>
      )}
    </Fragment>
  );
};

export default KeywordSearch;
