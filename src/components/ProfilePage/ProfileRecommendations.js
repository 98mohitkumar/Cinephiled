import { CardsContainerGrid } from 'components/Popular/PopularStyles';
import { motion, AnimatePresence } from 'framer-motion';
import useInfiniteQuery from 'hooks/useInfiniteQuery';
import { useState, useMemo, Fragment, useContext } from 'react';
import { MediaContext } from 'Store/MediaContext';
import { NoDataText } from 'styles/GlobalComponents';
import MediaCard from './MediaCard';
import { ProfileMediaTab } from './ProfilePage';

const MovieRecommendations = () => {
  const { movieRecommendations } = useContext(MediaContext);

  const { list: moviesList } = useInfiniteQuery({
    initialPage: 2,
    mediaType: 'movie',
    isProfileRecommendations: true
  });

  const cleanMovieList = useMemo(() => {
    let filtered = [];
    return movieRecommendations.concat(moviesList).map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    });
  }, [moviesList, movieRecommendations]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cleanMovieList.length > 0 ? (
        <CardsContainerGrid>
          {cleanMovieList.map(
            (movie) =>
              !movie?.duplicate && (
                <MediaCard
                  key={movie?.id}
                  data={movie}
                  link='movies'
                  recommendation
                />
              )
          )}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='fw-bold text-center my-5'>
          No recommendations for now
        </NoDataText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const { tvRecommendations } = useContext(MediaContext);

  const { list: tvList } = useInfiniteQuery({
    initialPage: 2,
    mediaType: 'tv',
    isProfileRecommendations: true
  });

  const cleanTvList = useMemo(() => {
    let filtered = [];
    return tvRecommendations.concat(tvList).map((item) => {
      if (filtered.includes(item.id)) {
        return { duplicate: true };
      } else {
        filtered.push(item.id);
        return item;
      }
    });
  }, [tvList, tvRecommendations]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cleanTvList.length > 0 ? (
        <CardsContainerGrid>
          {cleanTvList.map(
            (tv) =>
              !tv?.duplicate && (
                <MediaCard key={tv?.id} data={tv} link='tv' recommendation />
              )
          )}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='fw-bold text-center my-5'>
          No recommendations for now
        </NoDataText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  const [tabState, setTabState] = useState('movies');

  return (
    <Fragment>
      <ProfileMediaTab tabState={tabState} setTabState={setTabState} />

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === 'movies' && <MovieRecommendations key='movies' />}

        {tabState === 'tv' && <TvRecommendations key='tv' />}
      </AnimatePresence>
    </Fragment>
  );
};

export default ProfileRecommendations;
