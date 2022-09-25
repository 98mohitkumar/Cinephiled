import Link from 'next/link';
import {
  MoviesSection,
  Cards,
  CardImg,
  Rating,
  MoviesInfo,
  MoviesInfoTitle,
  ReleaseDate,
} from '../Popular/PopularStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TrendingMovies = ({ movies }) => {
  movies.forEach((item) => {
    if (item.vote_average === 0) item.vote_average = 'NR';
  });

  let arr = [];

  function releaseDates() {
    movies.forEach((item) =>
      arr.push(
        new Date(item.release_date.toString()).toDateString().slice(4, -5) +
          ', ' +
          new Date(item.release_date.toString()).getFullYear()
      )
    );
  }
  releaseDates();

  return (
    <>
      <MoviesSection className='p-5'>
        {movies.length > 0 &&
          movies.map((movie, i) => (
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
                    /[' ', '/']/g,
                    '-'
                  )}`}
                  passHref
                  scroll={false}
                >
                  <a>
                    <CardImg className='d-flex justify-content-end'>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt='TV-poster'
                        layout='fill'
                        objectFit='cover'
                        className='poster'
                      />
                      <Rating className='d-flex justify-content-center align-items-center me-3'>
                        {movie.vote_average === 'NR'
                          ? movie.vote_average
                          : movie.vote_average.toFixed(1)}
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
    </>
  );
};

export default TrendingMovies;
