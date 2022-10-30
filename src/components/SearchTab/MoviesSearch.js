import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription
} from '../../styles/GlobalComponents';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useInfiniteQuery from '../../hooks/useInfiniteQuery';
import { useEffect } from 'react';
import { useMemo } from 'react';

const MoviesSearch = ({ searchQuery, movieRes, searchLength, setLength }) => {
  const { list } = useInfiniteQuery(2, 'movieSearch', null, searchQuery);

  useEffect(() => {
    if (searchLength.movies < movieRes.concat(list).length) {
      setLength((prev) => ({ ...prev, movies: movieRes.concat(list).length }));
    }
  }, [list, movieRes, searchLength.movies, setLength]);

  const movieReleaseDates = useMemo(
    () =>
      movieRes
        .concat(list)
        .map((item) =>
          item.release_date
            ? new Date(item.release_date.toString())
                .toDateString()
                .slice(4, -5) +
              ', ' +
              new Date(item.release_date.toString()).getFullYear()
            : 'TBA'
        ),

    [list, movieRes]
  );

  return (
    <>
      <SearchResultsContainer>
        {movieRes.length === 0 ? (
          <EmptySearch className='display-5 text-center'>
            No movie results for this query.
          </EmptySearch>
        ) : (
          movieRes.concat(list).map((item, i) => (
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
    </>
  );
};

export default MoviesSearch;
