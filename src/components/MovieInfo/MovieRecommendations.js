import {
  NoDataText,
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper
} from '../../styles/GlobalComponents';

import Link from 'next/link';
import { MoviesInfoTitle } from '../Popular/PopularStyles';
import { motion } from 'framer-motion';

const MovieRecommendations = ({ movies }) => {
  movies.splice(15);

  return (
    <>
      <RecommendationsContainer>
        {movies.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>
            No Recommendations For Now
          </NoDataText>
        ) : (
          <RecommendationsGrid>
            {movies.map((item) => (
              <RecommendedWrapper key={item.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/movies/${item.id}-${item.title.replace(
                      /[' ']/g,
                      '-'
                    )}`}
                    passHref
                    scroll={false}
                  >
                    <a>
                      <RecommendedImg backdrop={item.backdrop_path} />
                    </a>
                  </Link>
                </motion.div>
                <MoviesInfoTitle className='my-3 text-center'>
                  {item.title}
                </MoviesInfoTitle>
              </RecommendedWrapper>
            ))}
          </RecommendationsGrid>
        )}
      </RecommendationsContainer>
    </>
  );
};

export default MovieRecommendations;
