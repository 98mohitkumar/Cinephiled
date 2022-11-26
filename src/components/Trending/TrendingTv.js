import {
  CardsContainerGrid,
  Cards,
  CardImg,
  Rating,
  CardInfo,
  InfoTitle,
  ReleaseDate
} from '../Popular/PopularStyles';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useGetReleaseDates from '../../hooks/useGetReleaseDates';

const TrendingTv = ({ Tv }) => {
  Tv.forEach((item) => {
    if (item.vote_average === 0) item.vote_average = 'NR';
  });

  const releaseDates = useGetReleaseDates(Tv);

  return (
    <>
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
                      href={`/tv/${TV.id}-${TV.name.replace(/[' ']/g, '-')}`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <CardImg className='d-flex justify-content-end'>
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${TV.poster_path}`}
                            alt='TV-poster'
                            layout='fill'
                            objectFit='cover'
                            className='poster'
                          />
                          <Rating className='d-flex justify-content-center align-items-center'>
                            {TV.vote_average === 'NR'
                              ? TV.vote_average
                              : TV.vote_average.toFixed(1)}
                          </Rating>
                        </CardImg>
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
    </>
  );
};

export default TrendingTv;
