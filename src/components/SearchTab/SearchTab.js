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

const SearchTab = ({ movies, tv, search, keywords }) => {
  const [tabState, setTabState] = useState('movies');
  const [searchLength, setSearchLength] = useState({
    movies: movies.length,
    tv: tv.length,
    keywords: keywords.length
  });

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
          Movies ({searchLength.movies})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle
          onClick={() => tabSelectionHandler('tv')}
          isActive={tabState === 'tv'}
        >
          TV ({searchLength.tv})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle
          onClick={() => tabSelectionHandler('keywords')}
          isActive={tabState === 'keywords'}
        >
          keywords ({searchLength.keywords})
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
              searchQuery={search}
              movieRes={movies}
              searchLength={searchLength}
              setLength={setSearchLength}
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
            <TVSearch
              searchQuery={search}
              tvRes={tv}
              searchLength={searchLength}
              setLength={setSearchLength}
            />
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
            <KeywordSearch
              searchQuery={search}
              keywords={keywords}
              searchLength={searchLength}
              setLength={setSearchLength}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchTab;
