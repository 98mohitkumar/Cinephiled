import {
  SearchResultsContainer,
  EmptySearch,
  QueryContainer,
  QueryImg,
  QueryTitle,
  QueryInfoWrapper,
  QueryRealeaseDate,
  QueryDescription
} from '../../styles/GlobalComponents';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
                    <QueryImg poster={item.poster_path} />
                    <QueryInfoWrapper>
                      <div>
                        <QueryTitle>{item.name}</QueryTitle>
                        <QueryRealeaseDate>
                          {tvReleaseDates[i]}
                        </QueryRealeaseDate>
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
