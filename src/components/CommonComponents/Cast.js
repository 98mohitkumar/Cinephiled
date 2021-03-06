import {
  FlexWrapper,
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper,
  NoDataText
} from '../../styles/GlobalComponents';
import { Span } from '../MovieInfo/MovieDetailsStyles';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Cast = ({ cast }) => {
  return (
    <CastContainer>
      {cast.length === 0 ? (
        <NoDataText className='fw-bold text-center my-5'>TBA</NoDataText>
      ) : (
        <CastGrid>
          {cast.map((item) => (
            <CastWrapper key={item.credit_id}>
              <Link
                href={`/person/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
                passHref
              >
                <a>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.1 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CastImg data={item.profile_path} gender={item.gender} />
                  </motion.div>
                </a>
              </Link>
              <FlexWrapper className='my-3'>
                <Span className='fw-bold movieCastHead'>{item.character}</Span>
                <Span className='movieCastName'>{item.name}</Span>
              </FlexWrapper>
            </CastWrapper>
          ))}
        </CastGrid>
      )}
    </CastContainer>
  );
};

export default Cast;
