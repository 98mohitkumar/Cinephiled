import { useState, useEffect, useCallback } from 'react';
import Backdrops from '../CommonComponents/Backdrops';
import Cast from '../CommonComponents/Cast';
import Posters from '../CommonComponents/Posters';
import Reviews from '../CommonComponents/Reviews';
import BackdropsSvg from '../Svg/backdrops';
import CastSvg from '../Svg/cast';
import PostersSvg from '../Svg/posters';
import ReviewsSvg from '../Svg/reviews';
import { AnimatePresence, motion } from 'framer-motion';
import MovieRecommendations from './MovieRecommendations';
import {
  TabIcon,
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
} from './MovieTabStyles';

const MovieTab = (props) => {
  const [tabState, setTabState] = useState('cast');
  const [moviesRecommended, setMoviesRecommended] = useState([]);

  useEffect(() => {
    let tabPosition = localStorage.getItem('MovieTabState');
    !tabPosition ? setTabState('cast') : setTabState(tabPosition);
  }, []);

  const tabStateHandler = useCallback((tab) => {
    setTabState(tab);
    localStorage.setItem('MovieTabState', tab);
  }, []);

  useEffect(() => {
    const abortCtrl = new AbortController();

    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        { signal: abortCtrl.signal }
      );

      const res = await response.json();

      return res;
    }

    getRecommended()
      .then((data) => setMoviesRecommended(data.results))
      .catch((err) => console.log(err));

    return () => {
      abortCtrl.abort();
    };
  }, [props.id]);

  return (
    <>
      <TabWrapper className='my-5' tabCheck={tabState}>
        <TabSlider tabCheck={tabState} />
        <TabSelectionTitle onClick={() => tabStateHandler('cast')}>
          <TabIcon>
            <CastSvg color={tabState === 'cast' ? 'white' : 'black'} />
          </TabIcon>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle onClick={() => tabStateHandler('reviews')}>
          <TabIcon>
            <ReviewsSvg color={tabState === 'reviews' ? 'white' : 'black'} />
          </TabIcon>
          Reviews
        </TabSelectionTitle>
        <TabSelectionTitle onClick={() => tabStateHandler('backdrops')}>
          <TabIcon>
            <BackdropsSvg
              color={tabState === 'backdrops' ? 'white' : 'black'}
            />
          </TabIcon>
          Backdrops
        </TabSelectionTitle>
        <TabSelectionTitle onClick={() => tabStateHandler('posters')}>
          <TabIcon>
            <PostersSvg color={tabState === 'posters' ? 'white' : 'black'} />
          </TabIcon>
          Posters
        </TabSelectionTitle>
      </TabWrapper>
      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === 'cast' && (
          <motion.div
            key='cast'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Cast cast={props.cast} />
          </motion.div>
        )}

        {tabState === 'reviews' && (
          <motion.div
            key='reviews'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Reviews reviews={props.reviews} />
          </motion.div>
        )}

        {tabState === 'backdrops' && (
          <motion.div
            key='backdrops'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Backdrops backdrops={props.backdrops} />
          </motion.div>
        )}

        {tabState === 'posters' && (
          <motion.div
            key='posters'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Posters posters={props.posters} />
          </motion.div>
        )}
      </AnimatePresence>
      <h1 className='display-6 fw-bold text-white text-center'>
        Recommendations
      </h1>
      <MovieRecommendations movies={moviesRecommended} />
    </>
  );
};

export default MovieTab;
