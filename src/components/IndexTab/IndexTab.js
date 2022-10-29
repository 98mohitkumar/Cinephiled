import { useEffect, useRef, useState } from 'react';
import PopularMovies from '../Popular/PopularMovies';
import TabSelector from './Tab';
import PopularTV from '../Popular/PopularTV';
import TrendingMovies from '../Trending/TrendingMovies';
import TrendingTv from '../Trending/TrendingTv';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import useIntersection from '../../hooks/useIntersection';
import { FloatingTab } from './IndexTabStyles';

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [indexTabState, setIndexTabState] = useState('movies');
  const tabRef = useRef(null);
  const { isVisible } = useIntersection(tabRef, '100px');
  const [showTab, setShowTab] = useState(false);

  useEffect(() => {
    const tabState = localStorage.getItem('indexTabState');
    tabState && setIndexTabState(tabState);

    const scrollHandler = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        setShowTab(false);
      } else {
        setShowTab(true);
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    localStorage.setItem('indexTabState', tab);
    setIndexTabState(tab);
  }, []);

  return (
    <>
      <TabSelector
        tabState={indexTabState}
        tabHandler={tabSelectionHandler}
        tabRef={tabRef}
      />
      <h1 className='display-5 fw-bold text-white text-center my-4'>
        What&#39;s Popular
      </h1>
      <AnimatePresence initial={false}>
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

        {!isVisible && tabRef.current && showTab && (
          <motion.div
            key='floating-tab'
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: 1,
              zIndex: 100
            }}
            exit={{ opacity: 0, zIndex: 100 }}
          >
            <FloatingTab className='floating-tab'>
              <TabSelector
                tabState={indexTabState}
                tabHandler={tabSelectionHandler}
                className='float'
              />
            </FloatingTab>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IndexTab;
