import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from './RecommendationsStyles';

const Recommendations = ({ data, type }) => {
  data.splice(20);

  return (
    <div>
      <h2 className='display-6 fw-bold text-white text-center my-5'>
        Recommendations
      </h2>

      <RecommendationsContainer>
        <RecommendationsGrid>
          {data.map((item) => (
            <RecommendedWrapper key={item.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 }
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
                        placeholder='blur'
                        blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                      />
                    </RecommendedImg>
                  </a>
                </Link>
              </motion.div>
              <InfoTitle className='mt-3 mb-0 text-center'>
                {item?.title || item?.name}
              </InfoTitle>
            </RecommendedWrapper>
          ))}
        </RecommendationsGrid>
      </RecommendationsContainer>
    </div>
  );
};

export default Recommendations;
