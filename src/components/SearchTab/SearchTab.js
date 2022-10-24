import {
  SearchTabSelectionTitle,
  SearchTabSlider,
  SearchTabWrapper
} from './SearchTabStyles';

import { useCallback, useState } from 'react';
import MoviesSearch from './MoviesSearch';
import TVSearch from './TVSearch';
import { Span } from '../MovieInfo/MovieDetailsStyles';
import { useEffect } from 'react';
import KeywordSearch from './KeywordSearch';
import { motion, AnimatePresence } from 'framer-motion';

const SearchTab = ({
  movies,
  tv,
  movieReleaseDates,
  tvReleaseDates,
  search,
  keywords
}) => {
  const [tabState, setTabState] = useState('movies');

  useEffect(() => {
    let tabPosition = localStorage.getItem('SearchTabPosition');
    !tabPosition ? setTabState('movies') : setTabState(tabPosition);
  }, []);

  const tabSelectionHandler = useCallback((tab) => {
    localStorage.setItem('SearchTabPosition', tab);
    setTabState(tab);
  }, []);

  return (
    <>
      <SearchTabWrapper>
        <SearchTabSlider tabState={tabState} />
        <SearchTabSelectionTitle
          onClick={() => tabSelectionHandler('movies')}
          isActive={tabState === 'movies'}
        >
          Movies ({movies.length})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle
          onClick={() => tabSelectionHandler('tv')}
          isActive={tabState === 'tv'}
        >
          TV ({tv.length})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle
          onClick={() => tabSelectionHandler('keywords')}
          isActive={tabState === 'keywords'}
        >
          keywords ({keywords.length})
        </SearchTabSelectionTitle>
      </SearchTabWrapper>

      <AnimatePresence exitBeforeEnter>
        {tabState === 'movies' && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {movies.length !== 0 && (
              <Span className='d-block display-6 text-center'>
                Movies matching : {search}
              </Span>
            )}
            <p className='text-center mt-2 mb-0'>
              <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your
              results by year. Example: <b>&#39;Avatar y:2009&#39;.</b>
            </p>
            <MoviesSearch
              movieRes={movies}
              movieReleaseDates={movieReleaseDates}
            />
          </motion.div>
        )}

        {tabState === 'tv' && (
          <motion.div
            key='tv'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {tv.length !== 0 && (
              <Span className='d-block display-6 text-center'>
                TV shows matching : {search}
              </Span>
            )}
            <p className='text-center mt-2 mb-0'>
              <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your
              results by year. Example: <b>&#39;Sherlock y:2010&#39;</b>.
            </p>
            <TVSearch tvRes={tv} tvReleaseDates={tvReleaseDates} />
          </motion.div>
        )}

        {tabState === 'keywords' && (
          <motion.div
            key='keywords'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {keywords.length !== 0 && (
              <Span className='d-block display-6 text-center'>
                Keywords matching : {search}
              </Span>
            )}
            <KeywordSearch keywords={keywords} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchTab;
