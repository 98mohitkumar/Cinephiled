import Backdrops from 'components/Backdrops/Backdrops';
import Cast from 'components/Cast/Cast';
import Posters from 'components/Posters/Posters';
import Reviews from 'components/Reviews/Reviews';
import BackdropsSvg from 'components/Svg/backdrops';
import CastSvg from 'components/Svg/cast';
import PostersSvg from 'components/Svg/posters';
import ReviewsSvg from 'components/Svg/reviews';
import Tabs from 'components/Tabs/Tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useCallback, Fragment, useMemo } from 'react';
import { TabIcon, TabSelectionTitle, tabStyling } from './MovieTabStyles';

const MovieTab = ({ cast, reviews, posters, backdrops }) => {
  const [tabState, setTabState] = useState('cast');

  useEffect(() => {
    let tabPosition = localStorage.getItem('MovieTabState');
    tabPosition && setTabState(tabPosition);
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    setTabState(tab);
    localStorage.setItem('MovieTabState', tab);
  }, []);

  const tabList = useMemo(
    () => [
      {
        key: 'cast',
        name: 'Cast',
        svg: (tab) => <CastSvg color={tabState === tab ? 'white' : 'black'} />
      },
      {
        key: 'reviews',
        name: 'Reviews',
        svg: (tab) => (
          <ReviewsSvg color={tabState === tab ? 'white' : 'black'} />
        )
      },
      {
        key: 'backdrops',
        name: 'Backdrops',
        svg: (tab) => (
          <BackdropsSvg color={tabState === tab ? 'white' : 'black'} />
        )
      },
      {
        key: 'posters',
        name: 'Posters',
        svg: (tab) => (
          <PostersSvg color={tabState === tab ? 'white' : 'black'} />
        )
      }
    ],
    [tabState]
  );

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={tabState} styling={{ tabStyling }}>
        {tabList.map(({ key, name, svg }) => (
          <TabSelectionTitle
            key={key}
            onClick={() => tabSelectionHandler(key)}
            active={tabState === key}
          >
            <TabIcon>{svg(key)}</TabIcon>
            {name}
          </TabSelectionTitle>
        ))}
      </Tabs>

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === 'cast' && (
          <motion.div
            key='cast'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cast cast={cast} />
          </motion.div>
        )}

        {tabState === 'reviews' && (
          <motion.div
            key='reviews'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Reviews reviews={reviews} />
          </motion.div>
        )}

        {tabState === 'backdrops' && (
          <motion.div
            key='backdrops'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Backdrops backdrops={backdrops} />
          </motion.div>
        )}

        {tabState === 'posters' && (
          <motion.div
            key='posters'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Posters posters={posters} />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MovieTab;
