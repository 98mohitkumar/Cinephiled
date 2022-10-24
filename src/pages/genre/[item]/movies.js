import Head from 'next/head';
import { NoDataText, Error404 } from '../../../styles/GlobalComponents/index';
import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from '../../../components/Recommendations/RecommendationsStyles';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Span } from '../../../components/MovieInfo/MovieDetailsStyles';
import useInfiniteQuery from '../../../hooks/useInfiniteQuery';
import Image from 'next/image';

const Movies = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery(3, 'movie', genreId);

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
                  {renderList.concat(list).map((item) => (
                    <RecommendedWrapper key={item.id}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href={`/movies/${item.id}-${item.title.replace(
                            /[' ']/g,
                            '-'
                          )}`}
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
                                alt='movie-poster'
                                layout='fill'
                                objectFit='cover'
                              />
                            </RecommendedImg>
                          </a>
                        </Link>
                      </motion.div>
                      <InfoTitle className='my-3 text-center'>
                        {item.title}
                      </InfoTitle>
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
