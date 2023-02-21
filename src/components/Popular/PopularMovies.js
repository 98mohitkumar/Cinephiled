import { motion } from 'framer-motion';
import useGetReleaseDates from 'hooks/useGetReleaseDates';
import Image from 'next/image';
import Link from 'next/link';
import {
  CardsContainerGrid,
  Cards,
  CardImg,
  Rating,
  CardInfo,
  InfoTitle,
  ReleaseDate
} from './PopularStyles';

const PopularMovies = ({ movies }) => {
  const releaseDates = useGetReleaseDates(movies);

  return (
    <CardsContainerGrid>
      {movies.length > 0 &&
        movies.map(
          (movie, i) =>
            movie.poster_path && (
              <Cards key={movie.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
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
                    <a className='position-relative'>
                      <CardImg>
                        <Image
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : '/Images/DefaultImage.png'
                          }
                          alt='movie-poster'
                          layout='fill'
                          objectFit='cover'
                          className='poster'
                          placeholder='blur'
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </CardImg>
                      <Rating className='d-flex justify-content-center align-items-center'>
                        {!movie.vote_average
                          ? 'NR'
                          : movie.vote_average.toFixed(1)}
                      </Rating>
                    </a>
                  </Link>
                </motion.div>
                <CardInfo>
                  <InfoTitle>{movie.title}</InfoTitle>
                  <ReleaseDate>{releaseDates[i]}</ReleaseDate>
                </CardInfo>
              </Cards>
            )
        )}
    </CardsContainerGrid>
  );
};

export default PopularMovies;
