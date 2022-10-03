import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import Backdrops from '../CommonComponents/Backdrops';
import Cast from '../CommonComponents/Cast';
import Posters from '../CommonComponents/Posters';
import Reviews from '../CommonComponents/Reviews';
import {
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
  TabIcon,
} from '../MovieInfo/MovieTabStyles';
import BackdropsSvg from '../Svg/backdrops';
import CastSvg from '../Svg/cast';
import PostersSvg from '../Svg/posters';
import ReviewsSvg from '../Svg/reviews';
import SeasonsSvg from '../Svg/seasons';
import TVRecommendations from './TVRecommendations';
import TVSeasons from './TVSeasons';
import { AnimatePresence, motion } from 'framer-motion';

const TVTab = (props) => {
  const [tabState, setTabState] = useState('cast');
  const [tvRecommended, setTvRecommended] = useState([]);

  useEffect(() => {
    let tabPosition = localStorage.getItem('TvTabState');
    !tabPosition ? setTabState('cast') : setTabState(tabPosition);
  }, []);

  const tabStateHandler = useCallback((tab) => {
    setTabState(tab);
    localStorage.setItem('TvTabState', tab);
  }, []);

  useEffect(() => {
    const abortCtrl = new AbortController();
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        { signal: abortCtrl.signal }
      );

      const res = await response.json();

      return res;
    }

    getRecommended()
      .then((data) => setTvRecommended(data.results))
      .catch((err) => console.log(err));

    return () => {
      abortCtrl.abort();
    };
  }, [props.id]);

  return (
    <>
      <TabWrapper className='my-5' tabCheck={tabState} tv={true}>
        <TabSlider tabCheck={tabState} tv={true} />
        <TabSelectionTitle tv={true} onClick={() => tabStateHandler('cast')}>
          <TabIcon>
            <CastSvg color={tabState === 'cast' ? 'white' : 'black'} />
          </TabIcon>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={() => tabStateHandler('seasons')}>
          <TabIcon>
            <SeasonsSvg color={tabState === 'seasons' ? 'white' : 'black'} />
          </TabIcon>
          Seasons
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={() => tabStateHandler('reviews')}>
          <TabIcon>
            <ReviewsSvg color={tabState === 'reviews' ? 'white' : 'black'} />
          </TabIcon>
          Reviews
        </TabSelectionTitle>
        <TabSelectionTitle
          tv={true}
          onClick={() => tabStateHandler('backdrops')}
        >
          <TabIcon>
            <BackdropsSvg
              color={tabState === 'backdrops' ? 'white' : 'black'}
            />
          </TabIcon>
          Backdrops
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={() => tabStateHandler('posters')}>
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

        {tabState === 'seasons' && (
          <motion.div
            key='seasons'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TVSeasons seasons={props.seasons} />
          </motion.div>
        )}

        {tabState === 'reviews' && (
          <motion.div
            key='cast'
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
      <TVRecommendations Tv={tvRecommended} />
    </>
  );
};

export default TVTab;
