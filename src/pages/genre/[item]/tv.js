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
import MetaWrapper from '../../../components/MetaWrapper';

const TvShows = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery(3, 'tv', genreId);

  return (
    <>
      <MetaWrapper
        title={
          !error
            ? `${genreName} TV Shows - Cinephiled`
            : 'Not Found - Cinephiled'
        }
        description={!error ? `${genreName} TV Shows` : 'Not Found'}
        url={`https://cinephiled.vercel.app/genre/${genreId}-${genreName}/tv`}
      />

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
                          href={`/tv/${item.id}-${item.name.replace(
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
                        {item.name}
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
