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
import { useEffect, useState } from 'react';

const Movies = ({ renderList, genreName, error, genreId }) => {
  const [pageQuery, setPageQuery] = useState(3);
  const [extendedList, setExtendedList] = useState({
    list: [],
    page: pageQuery
  });

  useEffect(() => {
    function detectBottom() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPageQuery((prev) => (prev === extendedList.page ? prev + 1 : prev));
      }
    }

    window.addEventListener('scroll', detectBottom);
    return () => {
      window.removeEventListener('scroll', detectBottom);
    };
  }, [pageQuery, extendedList.page]);

  useEffect(() => {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const abortCtrl = new AbortController();

    const fetchGenreList = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,
        { signal: abortCtrl.signal }
      );

      if (res.ok) {
        const moviesList = await res.json();
        return moviesList;
      } else {
        return null;
      }
    };

    fetchGenreList()
      .then((data) =>
        setExtendedList((prev) => ({
          list: prev.list.concat(data.results),
          page: pageQuery
        }))
      )
      .catch((err) => console.error(err.message));

    return () => {
      abortCtrl.abort();
    };
  }, [pageQuery, genreId]);

  return (
    <>
      <Head>
        <title>
          {!error
            ? `${genreName} Movies - Cinephiled`
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
                No Movies For Now
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
                        <Link
                          href={'/movies/' + item.id}
                          passHref
                          scroll={false}
                        >
                          <RecommendedImg backdrop={item.backdrop_path} />
                        </Link>
                      </motion.div>
                      <MoviesInfoTitle className='my-3 text-center'>
                        {item.title}
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
                        <Link
                          href={'/movies/' + item.id}
                          passHref
                          scroll={false}
                        >
                          <RecommendedImg backdrop={item.backdrop_path} />
                        </Link>
                      </motion.div>
                      <MoviesInfoTitle className='my-3 text-center'>
                        {item.title}
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

export default Movies;

Movies.getInitialProps = async (ctx) => {
  try {
    const genreId = ctx.query.item.split('-')[0];
    const genreName = ctx.query.item.split('-')[1];
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&include_adult=false&page=1&with_genres=${genreId}`
    );

    const nextPage = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&include_adult=false&page=2&with_genres=${genreId}`
    );

    const error = response.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const moviesList = await response.json();
      const secondMoviesList = await nextPage.json();

      const renderList = moviesList['results'].concat(secondMoviesList.results);

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
