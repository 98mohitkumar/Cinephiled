import { useEffect, useState } from 'react';
import PopularMovies from '../Popular/PopularMovies';
import TabSelector from './Tab';
import PopularTV from '../Popular/PopularTV';
import TrendingMovies from '../Trending/TrendingMovies';
import TrendingTv from '../Trending/TrendingTv';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [indexTabState, setIndexTabState] = useState('movies');

  useEffect(() => {
    const tabState = localStorage.getItem('indexTabState');
    tabState && setIndexTabState(tabState);
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    localStorage.setItem('indexTabState', tab);
    setIndexTabState(tab);
  }, []);

  return (
    <>
      <TabSelector tabState={indexTabState} tabHandler={tabSelectionHandler} />
      <h1 className='display-5 fw-bold text-white text-center my-4'>
        What&#39;s Popular
      </h1>
      <AnimatePresence exitBeforeEnter initial={false}>
        {indexTabState === 'movies' && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopularMovies movies={moviesData} />

            {/* Trending Movies */}
            <h1 className='display-5 fw-bold text-white text-center my-4'>
              Trending Today
            </h1>
            <TrendingMovies movies={trendingMovies} />
          </motion.div>
        )}

        {indexTabState === 'TV' && (
          <motion.div
            key='tv'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopularTV TV={TVData} />

            {/* Trending TV */}
            <h1 className='display-5 fw-bold text-white text-center my-4'>
              Trending Today
            </h1>
            <TrendingTv Tv={trendingTv} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IndexTab;
