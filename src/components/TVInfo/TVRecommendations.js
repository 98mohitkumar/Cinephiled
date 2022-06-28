import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper
} from '../../styles/GlobalComponents';
import { NoDataText } from '../../styles/GlobalComponents';

import Link from 'next/link';
import { MoviesInfoTitle } from '../Popular/PopularStyles';
import { motion } from 'framer-motion';

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
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/tv/${item.id}-${item.name.replaceAll(' ', '-')}`}
                    passHref
                    scroll={false}
                  >
                    <a>
                      <RecommendedImg backdrop={item.backdrop_path} />
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
