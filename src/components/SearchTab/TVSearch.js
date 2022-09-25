import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryReleaseDate,
  QueryDescription,
} from '../../styles/GlobalComponents';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TVSearch = ({ tvRes, tvReleaseDates }) => {
  return (
    <>
      <SearchResultsContainer>
        {tvRes.length === 0 ? (
          <EmptySearch className='display-5 text-center'>
            No TV show results for this query.
          </EmptySearch>
        ) : (
          tvRes.map((item, i) => (
            <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
              <Link
                href={`/tv/${item.id}-${item.name.replace(/[' ']/g, '-')}`}
                passHref
                scroll={false}
              >
                <a>
                  <QueryContainer>
                    <QueryImg className='position-relative'>
                      <Image
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : '/Images/DefaultImage.png'
                        }
                        alt='TV-poster'
                        layout='fill'
                        objectFit='cover'
                      />
                    </QueryImg>
                    <QueryInfoWrapper>
                      <div>
                        <QueryTitle>{item.name}</QueryTitle>
                        <QueryReleaseDate>{tvReleaseDates[i]}</QueryReleaseDate>
                      </div>
                      <QueryDescription>{item.overview}</QueryDescription>
                    </QueryInfoWrapper>
                  </QueryContainer>
                </a>
              </Link>
            </motion.div>
          ))
        )}
      </SearchResultsContainer>
    </>
  );
};

export default TVSearch;
