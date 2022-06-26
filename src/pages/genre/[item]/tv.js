import Head from 'next/head';
import {
  NoDataText,
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  Error404
} from '../../../styles/GlobalComponents/index';

import Link from 'next/link';
import { MoviesInfoTitle } from '../../../components/Popular/PopularStyles';
import { motion } from 'framer-motion';
import { Span } from '../../../components/MovieInfo/MovieDetailsStyles';
import useInfiniteQuery from '../../../hooks/useInfiniteQuery';

const TvShows = ({ renderList, genreName, error, genreId }) => {
  const extendedList = useInfiniteQuery(3, 'tv', genreId);

  return (
    <>
      <Head>
        <title>
          {!error
            ? `${genreName} TV Shows - Cinephiled`
            : 'Not Found - Cinephiled'}
        </title>
      </Head>

      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          <RecommendationsContainer>
            {renderList.length === 0 ? (
              <NoDataText className='fw-bold text-center my-5'>
                No Tv Shows For Now
              </NoDataText>
            ) : (
              <>
                <Span className='d-block display-5 text-center genre'>
                  {genreName}
                </Span>
                <RecommendationsGrid>
                  {renderList.map((item) => (
                    <RecommendedWrapper key={item.id}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={'/tv/' + item.id} passHref scroll={false}>
                          <RecommendedImg backdrop={item.backdrop_path} />
                        </Link>
                      </motion.div>
                      <MoviesInfoTitle className='my-3 text-center'>
                        {item.name}
                      </MoviesInfoTitle>
                    </RecommendedWrapper>
                  ))}

                  {extendedList.list.map((item) => (
                    <RecommendedWrapper key={item.id}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link href={'/tv/' + item.id} passHref scroll={false}>
                          <RecommendedImg backdrop={item.backdrop_path} />
                        </Link>
                      </motion.div>
                      <MoviesInfoTitle className='my-3 text-center'>
                        {item.name}
                      </MoviesInfoTitle>
                    </RecommendedWrapper>
                  ))}
                </RecommendationsGrid>
              </>
            )}
          </RecommendationsContainer>
        </>
      )}
    </>
  );
};

export default TvShows;

TvShows.getInitialProps = async (ctx) => {
  try {
    const param = ctx.query.item.split('-');

    const genreId = param[0];
    const genreName = param
      .slice(1, param.length)
      .join('-')
      .replace('&', ' & ');
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&include_adult=false&page=1&with_genres=${genreId}`
    );

    const nextPage = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&include_adult=false&page=2&with_genres=${genreId}`
    );

    const error = response.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const tvList = await response.json();
      const secondTvList = await nextPage.json();

      const renderList = tvList['results'].concat(secondTvList.results);

      return {
        renderList,
        genreName,
        genreId,
        error
      };
    }
  } catch {
    return {
      error: true
    };
  }
};
