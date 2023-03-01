import PopularMovies from 'components/Popular/PopularMovies';
import PopularTV from 'components/Popular/PopularTV';
import Tabs from 'components/Tabs/Tabs';
import TrendingMovies from 'components/Trending/TrendingMovies';
import TrendingTv from 'components/Trending/TrendingTv';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useState, useCallback, useMemo } from 'react';

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [tabState, setTabState] = useState('');

  useEffect(() => {
    const savedTabState = localStorage.getItem('indexTabState');
    setTabState(savedTabState ?? 'movies');
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    localStorage.setItem('indexTabState', tab);
    setTabState(tab);
  }, []);

  const tabList = useMemo(
    () => [
      { key: 'movies', name: 'Movies' },
      { key: 'tv', name: 'TV Shows' }
    ],
    []
  );

  return (
    <Fragment>
      <Tabs
        tabList={tabList}
        currentTab={tabState}
        setTab={tabSelectionHandler}
      />

      <AnimatePresence initial={false} exitBeforeEnter>
        {tabState === 'movies' && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* popular movies */}
            <section>
              <span className='display-5 fw-bold text-white text-center my-4 d-block'>
                What&#39;s Popular
              </span>
              <PopularMovies movies={moviesData} />
            </section>

            {/* Trending Movies */}
            <section>
              <span className='display-5 fw-bold text-white text-center my-4 d-block'>
                Trending Today
              </span>
              <TrendingMovies movies={trendingMovies} />
            </section>
          </motion.div>
        )}

        {tabState === 'tv' && (
          <motion.div
            key='tv'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* popular TV */}
            <section>
              <span className='display-5 fw-bold text-white text-center my-4 d-block'>
                What&#39;s Popular
              </span>
              <PopularTV TV={TVData} />
            </section>

            {/* Trending TV */}
            <section>
              <span className='display-5 fw-bold text-white text-center my-4 d-block'>
                Trending Today
              </span>
              <TrendingTv Tv={trendingTv} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default IndexTab;
