import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useCallback, useState, useEffect, useMemo } from 'react';
import Backdrops from '../Backdrops/Backdrops';
import Cast from '../Cast/Cast';
import {
  TabSelectionTitle,
  tabStyling,
  TabIcon
} from '../MovieInfo/MovieTabStyles';
import Posters from '../Posters/Posters';
import Reviews from '../Reviews/Reviews';
import BackdropsSvg from '../Svg/backdrops';
import CastSvg from '../Svg/cast';
import PostersSvg from '../Svg/posters';
import ReviewsSvg from '../Svg/reviews';
import SeasonsSvg from '../Svg/seasons';
import Tabs from '../Tabs/Tabs';
import TVSeasons from './TVSeasons';

const TVTab = ({ cast, seasons, reviews, posters, backdrops }) => {
  const [tabState, setTabState] = useState('cast');

  useEffect(() => {
    let tabPosition = localStorage.getItem('TvTabState');
    !tabPosition ? setTabState('cast') : setTabState(tabPosition);
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    setTabState(tab);
    localStorage.setItem('TvTabState', tab);
  }, []);

  const tabList = useMemo(
    () => [
      {
        key: 'cast',
        name: 'Cast',
        svg: (tab) => <CastSvg color={tabState === tab ? 'white' : 'black'} />
      },
      {
        key: 'seasons',
        name: 'Seasons',
        svg: (tab) => (
          <SeasonsSvg color={tabState === tab ? 'white' : 'black'} />
        )
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
            tv={true}
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

        {tabState === 'seasons' && (
          <motion.div
            key='seasons'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TVSeasons seasons={seasons} />
          </motion.div>
        )}

        {tabState === 'reviews' && (
          <motion.div
            key='cast'
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

export default TVTab;
