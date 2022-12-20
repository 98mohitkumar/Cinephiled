import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {
  CardImg,
  CardInfo,
  Cards,
  InfoTitle,
  Rating,
  ReleaseDate
} from '../Popular/PopularStyles';
import { RatingOverlay } from './ProfilePageStyles';

const MediaCard = ({ data, link, children, rating, recommendation }) => {
  const releaseDate = useMemo(
    () =>
      !(data?.release_date || data?.first_air_date)
        ? 'TBA'
        : new Date(
            data?.release_date?.toString() || data?.first_air_date?.toString()
          )
            .toDateString()
            .slice(4, -5) +
          ', ' +
          new Date(
            data?.release_date?.toString() || data?.first_air_date?.toString()
          ).getFullYear(),
    [data.first_air_date, data.release_date]
  );

  return (
    <Cards>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href={`/${link}/${data?.id}-${(data?.title || data?.name).replace(
            /[' ', '/']/g,
            '-'
          )}`}
          passHref
          scroll={false}
        >
          <a>
            <CardImg className='d-flex justify-content-end'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt='movie-poster'
                layout='fill'
                objectFit='cover'
                className='poster'
              />

              {rating && (
                <RatingOverlay>
                  <AiFillStar size='14px' />
                  <p className='m-0 fw-semibold'>{rating}</p>
                </RatingOverlay>
              )}

              {recommendation && (
                <Rating className='d-flex justify-content-center align-items-center'>
                  {data.vote_average === 0
                    ? 'NR'
                    : data.vote_average.toFixed(1)}
                </Rating>
              )}
            </CardImg>
          </a>
        </Link>
      </motion.div>
      {recommendation ? (
        <CardInfo>
          <InfoTitle>{data?.title || data?.name}</InfoTitle>
          <ReleaseDate>{releaseDate}</ReleaseDate>
        </CardInfo>
      ) : (
        <div className='pt-3'>{children}</div>
      )}
    </Cards>
  );
};

export default MediaCard;
