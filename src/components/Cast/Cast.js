import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NoDataText } from 'styles/GlobalComponents';
import { CastContainer, CastGrid, CastImg, CastWrapper } from './CastStyles';

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
                    <CastImg className='position-relative text-center'>
                      <Image
                        src={
                          item.profile_path
                            ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                            : '/Images/DefaultAvatar.png'
                        }
                        alt='cast-image'
                        layout='fill'
                        objectFit='cover'
                        objectPosition='top'
                      />
                    </CastImg>
                  </motion.div>
                </a>
              </Link>
              <div className='my-3'>
                <Span className='fw-bold movieCastHead d-block'>
                  {item.character}
                </Span>
                <Span className='movieCastName d-block'>{item.name}</Span>
              </div>
            </CastWrapper>
          ))}
        </CastGrid>
      )}
    </CastContainer>
  );
};

export default Cast;
