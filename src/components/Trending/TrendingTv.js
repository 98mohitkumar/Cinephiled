import {
  CardsContainerGrid,
  Cards,
  CardImg,
  Rating,
  CardInfo,
  InfoTitle,
  ReleaseDate
} from 'components/Popular/PopularStyles';
import { motion } from 'framer-motion';
import useGetReleaseDates from 'hooks/useGetReleaseDates';
import Image from 'next/image';
import Link from 'next/link';

const TrendingTv = ({ Tv }) => {
  const releaseDates = useGetReleaseDates(Tv);

  return (
    <CardsContainerGrid>
      {Tv.length > 0 &&
        Tv.map(
          (TV, i) =>
            TV.poster_path && (
              <Cards key={TV.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/tv/${TV.id}-${TV.name.replace(/[' ', '/']/g, '-')}`}
                    passHref
                    scroll={false}
                  >
                    <a className='position-relative d-block'>
                      <CardImg className='d-flex justify-content-end'>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${TV.poster_path}`}
                          alt='TV-poster'
                          layout='fill'
                          objectFit='cover'
                          className='poster'
                          placeholder='blur'
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </CardImg>

                      <Rating className='d-flex justify-content-center align-items-center'>
                        {!TV.vote_average ? 'NR' : TV.vote_average.toFixed(1)}
                      </Rating>
                    </a>
                  </Link>
                </motion.div>
                <CardInfo>
                  <InfoTitle>{TV.name}</InfoTitle>
                  <ReleaseDate>{releaseDates[i]}</ReleaseDate>
                </CardInfo>
              </Cards>
            )
        )}
    </CardsContainerGrid>
  );
};

export default TrendingTv;
