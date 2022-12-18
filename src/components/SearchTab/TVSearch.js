import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import useGetReleaseDates from '../../hooks/useGetReleaseDates';
import useInfiniteQuery from '../../hooks/useInfiniteQuery';
import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription
} from './SearchTabStyles';

const TVSearch = ({ searchQuery, tvRes, searchLength, setLength }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: 'tvSearch',
    searchQuery
  });

  const renderList = useMemo(() => {
    let filtered = [];
    return tvRes.concat(list).map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    });
  }, [list, tvRes]);

  useEffect(() => {
    if (searchLength.tv < renderList.length) {
      setLength((prev) => ({
        ...prev,
        tv: renderList.filter((item) => !item?.duplicate).length
      }));
    }
  }, [list, renderList, renderList.length, searchLength.tv, setLength, tvRes]);

  const tvReleaseDates = useGetReleaseDates(renderList);

  return (
    <SearchResultsContainer>
      {tvRes.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No TV show results for this query.
        </EmptySearch>
      ) : (
        renderList.map(
          (item, i) =>
            !item?.duplicate && (
              <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
                <Link
                  href={`/tv/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <QueryContainer>
                      <QueryImg className='position-relative text-center'>
                        <Image
                          src={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                              : '/Images/DefaultImage.png'
                          }
                          alt='TV-poster'
                          layout='fill'
                          objectFit='cover'
                        />
                      </QueryImg>
                      <QueryInfoWrapper>
                        <div>
                          <QueryTitle>{item.name}</QueryTitle>
                          <QueryReleaseDate>
                            {tvReleaseDates[i]}
                          </QueryReleaseDate>
                        </div>
                        <QueryDescription>{item.overview}</QueryDescription>
                      </QueryInfoWrapper>
                    </QueryContainer>
                  </a>
                </Link>
              </motion.div>
            )
        )
      )}
    </SearchResultsContainer>
  );
};

export default TVSearch;
