import {
  EmptySearch,
  SearchResultsContainer
} from '../../styles/GlobalComponents';
import { Keyword } from './SearchTabStyles';
import Link from 'next/link';
import useInfiniteQuery from '../../hooks/useInfiniteQuery';
import { useEffect } from 'react';

const KeywordSearch = ({ searchQuery, keywords, searchLength, setLength }) => {
  const { list } = useInfiniteQuery(2, 'keywordSearch', null, searchQuery);

  useEffect(() => {
    if (searchLength.keywords < keywords.concat(list).length) {
      setLength((prev) => ({
        ...prev,
        keywords: keywords.concat(list).length
      }));
    }
  }, [keywords, list, searchLength.keywords, setLength]);

  return (
    <>
      {keywords.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No Keywords for this query.
        </EmptySearch>
      ) : (
        <SearchResultsContainer>
          {keywords.concat(list).map((item) => (
            <Link
              key={item.id}
              href={`/keywords/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
              passHref
              scroll={false}
            >
              <a>
                <Keyword>{item.name}</Keyword>
              </a>
            </Link>
          ))}
        </SearchResultsContainer>
      )}
    </>
  );
};

export default KeywordSearch;
