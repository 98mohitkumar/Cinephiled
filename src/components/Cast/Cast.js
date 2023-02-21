import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { NoDataText } from 'styles/GlobalComponents';
import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper,
  SeeMore
} from './CastStyles';

const Cast = ({ cast }) => {
  const router = useRouter();

  const routeRef = useRef(router.asPath);

  return (
    <CastContainer>
      {cast.data.length === 0 ? (
        <NoDataText className='fw-bold text-center my-5'>TBA</NoDataText>
      ) : (
        <CastGrid>
          {cast.data.map((item) => (
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
                        placeholder='blur'
                        blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                      />
                    </CastImg>
                  </motion.div>
                </a>
              </Link>

              <div className='mt-3'>
                <Span className='fw-bold movieCastHead d-block'>
                  {item.character}
                </Span>
                <Span className='movieCastName d-block'>{item.name}</Span>
              </div>
            </CastWrapper>
          ))}

          {cast.totalCount > 15 && (
            <Link href={`${routeRef.current}/cast`}>
              <a className='mb-auto mt-5'>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SeeMore>
                    <BsChevronRight size='22' />
                  </SeeMore>
                  <Span className='mt-3 fw-bold movieCastHead d-block'>
                    See More
                  </Span>
                </motion.div>
              </a>
            </Link>
          )}
        </CastGrid>
      )}
    </CastContainer>
  );
};

export default Cast;
