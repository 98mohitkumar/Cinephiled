import { motion } from 'framer-motion';
import useGetReleaseDates from 'hooks/useGetReleaseDates';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import useRemoveDuplicates from 'hooks/useRemoveDuplicates';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
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

const MoviesSearch = ({ searchQuery, movieRes }) => {
  const { list } = useInfiniteQuery({
    initialPage: 2,
    type: 'movieSearch',
    searchQuery
  });

  const extendedList = useMemo(
    () => movieRes.results.concat(list),
    [list, movieRes]
  );
  const { cleanedItems } = useRemoveDuplicates(extendedList);
  const movieReleaseDates = useGetReleaseDates(cleanedItems);

  return (
    <SearchResultsContainer>
      {movieRes.results.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No movie results for this query.
        </EmptySearch>
      ) : (
        cleanedItems.map((item, i) => (
          <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
            <Link
              href={`/movies/${item.id}-${item.title.replace(
                /[' ', '/']/g,
                '-'
              )}`}
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
                      alt='movie-poster'
                      layout='fill'
                      objectFit='cover'
                    />
                  </QueryImg>
                  <QueryInfoWrapper>
                    <div>
                      <QueryTitle>{item.title}</QueryTitle>
                      <QueryReleaseDate>
                        {movieReleaseDates[i]}
                      </QueryReleaseDate>
                    </div>
                    <QueryDescription>{item.overview}</QueryDescription>
                  </QueryInfoWrapper>
                </QueryContainer>
              </a>
            </Link>
          </motion.div>
        ))
      )}
    </SearchResultsContainer>
  );
};

export default MoviesSearch;
