import Link from 'next/link';
import {
  MoviesSection,
  Cards,
  CardImg,
  Rating,
  MoviesInfo,
  MoviesInfoTitle,
  ReleaseDate,
} from './PopularStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PopularMovies = (props) => {
  let arr = [];

  function releaseDates() {
    props.movies.forEach((item) => {
      if (item.release_date) {
        arr.push(
          new Date(item.release_date.toString()).toDateString().slice(4, -5) +
            ', ' +
            new Date(item.release_date.toString()).getFullYear()
        );
      } else {
        arr.push('TBA');
      }
    });
  }
  releaseDates();

  return (
    <MoviesSection className='p-5'>
      {props.movies.length > 0 &&
        props.movies.map((movie, i) => (
          <Cards key={movie.id}>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/movies/${movie.id}-${movie.title.replace(
                  /[' ']/g,
                  '-'
                )}`}
                passHref
                scroll={false}
              >
                <a>
                  <CardImg>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt='movie-poster'
                      layout='fill'
                      objectFit='cover'
                      className='poster'
                    />
                    <Rating className='d-flex justify-content-center align-items-center me-3'>
                      {movie.vote_average.toFixed(1)}
                    </Rating>
                  </CardImg>
                </a>
              </Link>
            </motion.div>
            <MoviesInfo>
              <MoviesInfoTitle>{movie.title}</MoviesInfoTitle>
              <ReleaseDate>{arr[i]}</ReleaseDate>
            </MoviesInfo>
          </Cards>
        ))}
    </MoviesSection>
  );
};

export default PopularMovies;
