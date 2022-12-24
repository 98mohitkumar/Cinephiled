import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import Tabs from 'components/Tabs/Tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { Fragment, useCallback, useState, useEffect, useMemo } from 'react';
import KeywordSearch from './KeywordSearch';
import MoviesSearch from './MoviesSearch';
import { tabStyling, tabTitleStyling } from './SearchTabStyles';
import TVSearch from './TVSearch';

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

  const tabList = useMemo(
    () => [
      { key: 'movies', name: `Movies (${searchLength?.movies})` },
      { key: 'tv', name: `TV (${searchLength?.tv})` },
      { key: 'keywords', name: `Keywords (${searchLength?.keywords})` }
    ],
    [searchLength?.keywords, searchLength?.movies, searchLength?.tv]
  );

  return (
    <Fragment>
      <Tabs
        tabList={tabList}
        currentTab={tabState}
        setTab={tabSelectionHandler}
        styling={{ tabStyling, tabTitleStyling }}
      />

      <AnimatePresence exitBeforeEnter>
        {tabState === 'movies' && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {movies.length !== 0 && (
              <Span className='d-block fs-2 text-center'>
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
            transition={{ duration: 0.5 }}
          >
            {tv.length !== 0 && (
              <Span className='d-block fs-2 text-center'>
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
            transition={{ duration: 0.5 }}
          >
            {keywords.length !== 0 && (
              <Span className='d-block fs-2 text-center'>
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
    </Fragment>
  );
};

export default SearchTab;
