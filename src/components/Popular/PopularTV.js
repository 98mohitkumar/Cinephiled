import {
  TVSection,
  Cards,
  CardImg,
  Rating,
  TVInfo,
  TVInfoTitle,
  ReleaseDate,
} from './PopularStyles';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const PopularTV = (props) => {
  const TVData = props.TV;

  TVData.forEach((item) => {
    if (item.vote_average === 0) item.vote_average = 'NR';
  });

  let arr = [];

  function releaseDates() {
    TVData.forEach((item) => {
      if (item.first_air_date) {
        arr.push(
          new Date(item.first_air_date.toString()).toDateString().slice(4, -5) +
            ', ' +
            new Date(item.first_air_date.toString()).getFullYear()
        );
      } else {
        arr.push('TBA');
      }
    });
  }
  releaseDates();

  return (
    <TVSection className='p-5'>
      {TVData.length > 0 &&
        TVData.map((TV, i) => (
          <Cards key={TV.id}>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
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
                      alt='movie-poster'
                      layout='fill'
                      objectFit='cover'
                      className='poster'
                    />
                    <Rating className='d-flex justify-content-center align-items-center me-3'>
                      {TV.vote_average === 'NR'
                        ? TV.vote_average
                        : TV.vote_average.toFixed(1)}
                    </Rating>
                  </CardImg>
                </a>
              </Link>
            </motion.div>
            <TVInfo>
              <TVInfoTitle>{TV.name}</TVInfoTitle>
              <ReleaseDate>{arr[i]}</ReleaseDate>
            </TVInfo>
          </Cards>
        ))}
    </TVSection>
  );
};

export default PopularTV;
