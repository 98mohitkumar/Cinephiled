import MetaWrapper from 'components/MetaWrapper';
import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import {
  RecommendationsContainer,
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from 'components/Recommendations/RecommendationsStyles';
import { motion } from 'framer-motion';
import { apiEndpoints } from 'globals/constants';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { NoDataText, Error404 } from 'styles/GlobalComponents/index';

const TvShows = ({ renderList, genreName, error, genreId }) => {
  const { list } = useInfiniteQuery({
    initialPage: 3,
    type: 'tvGenre',
    genreId
  });

  return (
    <Fragment>
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
        <RecommendationsContainer>
          {renderList.length === 0 ? (
            <NoDataText className='fw-bold text-center my-5'>
              No Tv Shows For Now
            </NoDataText>
          ) : (
            <Fragment>
              <Span className='d-block fs-1 text-center genre'>
                {genreName} TV Shows
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
                              placeholder='blur'
                              blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
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
            </Fragment>
          )}
        </RecommendationsContainer>
      )}
    </Fragment>
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

    const response = await fetch(
      apiEndpoints.tv.tvGenre({ genreId, pageQuery: 1 })
    );
    const nextPage = await fetch(
      apiEndpoints.tv.tvGenre({ genreId, pageQuery: 2 })
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
