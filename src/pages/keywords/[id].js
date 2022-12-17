import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import MetaWrapper from '../../components/MetaWrapper';
import {
  QueryContainer,
  QueryImg,
  QueryInfoWrapper,
  QueryTitle,
  QueryReleaseDate,
  QueryDescription,
  SearchResultsContainer
} from '../../components/SearchTab/SearchTabStyles';
import { apiEndpoints } from '../../constants';
import useGetReleaseDates from '../../hooks/useGetReleaseDates';
import {
  Error404,
  SearchContainer,
  EmptySearch
} from '../../styles/GlobalComponents';

const Keyword = ({ error, results, name, id }) => {
  const releaseDates = useGetReleaseDates(error ? [] : results);

  return (
    <Fragment>
      <MetaWrapper
        title={!error ? `${name} - Movies` : 'Not Found - Cinephiled'}
        description={`Movies matching the keyword : ${name}`}
        url={`https://cinephiled.vercel.app/keywords/${id}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <SearchContainer>
          <SearchResultsContainer>
            {results.length === 0 ? (
              <EmptySearch className='display-5 text-center'>
                No movie results for this keyword.
              </EmptySearch>
            ) : (
              <Fragment>
                <p className='fs-4'>Results Matching : {name}</p>
                {results.map((item, i) => (
                  <motion.div whileTap={{ scale: 0.98 }} key={item.id}>
                    <Link
                      href={`/movies/${item.id}-${item.title.replace(
                        /[' ']/g,
                        '-'
                      )}`}
                      passHref
                      scroll={false}
                    >
                      <a>
                        <QueryContainer>
                          <QueryImg className='position-relative text-center'>
                            <Image
                              src={
                                item.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                  : '/Images/DefaultImage.png'
                              }
                              alt='movie-poster'
                              layout='fill'
                              objectFit='cover'
                            />
                          </QueryImg>
                          <QueryInfoWrapper>
                            <div>
                              <QueryTitle>{item.title}</QueryTitle>
                              <QueryReleaseDate>
                                {releaseDates[i]}
                              </QueryReleaseDate>
                            </div>
                            <QueryDescription>{item.overview}</QueryDescription>
                          </QueryInfoWrapper>
                        </QueryContainer>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </Fragment>
            )}
          </SearchResultsContainer>
        </SearchContainer>
      )}
    </Fragment>
  );
};

Keyword.getInitialProps = async (ctx) => {
  try {
    const keyword = ctx.query.id;

    const keywordRes = await fetch(
      apiEndpoints.keywords.keywordDetails(keyword)
    );

    const error = keywordRes.ok ? false : true;

    if (error) {
      throw new Error('cannot fetch data');
    } else {
      const keywordData = await keywordRes.json();

      return {
        error,
        results: keywordData.results,
        name: keyword.split('-')[1],
        id: keyword
      };
    }
  } catch {
    return { error: true };
  }
};
export default Keyword;
