import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle,
} from './RecommendationsStyles';
import { NoDataText } from '../../styles/GlobalComponents';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Recommendations = ({ data, type }) => {
  data.splice(20);
  return (
    <>
      <RecommendationsContainer>
        {data.length === 0 ? (
          <NoDataText className='fw-bold text-center my-5'>
            No Recommendations For Now
          </NoDataText>
        ) : (
          <RecommendationsGrid>
            {data.map((item) => (
              <RecommendedWrapper key={item.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${type}/${item.id}-${(
                      item?.title || item?.name
                    ).replace(/[' ']/g, '-')}`}
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
                          alt={`${type}-poster`}
                          layout='fill'
                          objectFit='cover'
                        />
                      </RecommendedImg>
                    </a>
                  </Link>
                </motion.div>
                <InfoTitle className='my-3 text-center'>
                  {item?.title || item?.name}
                </InfoTitle>
              </RecommendedWrapper>
            ))}
          </RecommendationsGrid>
        )}
      </RecommendationsContainer>
    </>
  );
};

export default Recommendations;
