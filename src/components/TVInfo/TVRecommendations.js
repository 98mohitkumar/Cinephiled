import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
} from '../../styles/GlobalComponents';
import { NoDataText } from '../../styles/GlobalComponents';

import Link from 'next/link';
import { MoviesInfoTitle } from '../Popular/PopularStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TVRecommendations = ({ Tv }) => {
  Tv.splice(15);
  return (
    <>
      <RecommendationsContainer>
        {Tv.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>
            No Recommendations For Now
          </NoDataText>
        ) : (
          <RecommendationsGrid>
            {Tv.map((item) => (
              <RecommendedWrapper key={item.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/tv/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
                    passHref
                    scroll={false}
                  >
                    <a>
                      <RecommendedImg className='position-relative text-center'>
                        <Image
                          src={
                            item.backdrop_path
                              ? `https://image.tmdb.org/t/p/w780${item.backdrop_path}`
                              : '/Images/DefaultBackdrop.png'
                          }
                          alt='movie-poster'
                          layout='fill'
                          objectFit='cover'
                        />
                      </RecommendedImg>
                    </a>
                  </Link>
                </motion.div>
                <MoviesInfoTitle className='my-3 text-center'>
                  {item.name}
                </MoviesInfoTitle>
              </RecommendedWrapper>
            ))}
          </RecommendationsGrid>
        )}
      </RecommendationsContainer>
    </>
  );
};

export default TVRecommendations;
