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

const MoviesSearch = ({ searchQuery, movieRes, searchLength, setLength }) => {
  const { list } = useInfiniteQuery(2, 'movieSearch', null, searchQuery);

  const renderList = useMemo(() => {
    let filtered = [];
    return movieRes.concat(list).map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    });
  }, [list, movieRes]);

  useEffect(() => {
    if (searchLength.movies < renderList.length) {
      setLength((prev) => ({
        ...prev,
        movies: renderList.filter((item) => !item?.duplicate).length
      }));
    }
  }, [
    list,
    movieRes,
    renderList,
    renderList.length,
    searchLength.movies,
    setLength
  ]);

  const movieReleaseDates = useGetReleaseDates(renderList);

  return (
    <SearchResultsContainer>
      {movieRes.length === 0 ? (
        <EmptySearch className='display-5 text-center'>
          No movie results for this query.
        </EmptySearch>
      ) : (
        renderList.map(
          (item, i) =>
            !item?.duplicate && (
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
            )
        )
      )}
    </SearchResultsContainer>
  );
};

export default MoviesSearch;
