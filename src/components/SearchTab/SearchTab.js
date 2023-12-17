import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Tabs from "components/Tabs/Tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from "react";
import KeywordSearch from "./KeywordSearch";
import MoviesSearch from "./MoviesSearch";
import { tabStyling, tabTitleStyling } from "./SearchTabStyles";
import TVSearch from "./TVSearch";

const SearchTab = ({ movies, tv, search, keywords }) => {
  const [tabState, setTabState] = useState("");
  const router = useRouter();

  useEffect(() => {
    let savedTabState = localStorage.getItem("SearchTabPosition");
    setTabState(savedTabState ?? "movies");
  }, []);

  const tabSelectionHandler = (tab) => {
    localStorage.setItem("SearchTabPosition", tab);
    setTabState(tab);
    router.replace(
      {
        pathname: router.pathname,
        query: { query: router.query.query }
      },
      undefined,
      { shallow: true }
    );
  };

  const tabList = [
    { key: "movies", name: `Movies (${movies.count})` },
    { key: "tv", name: `TV (${tv.count})` },
    { key: "keywords", name: `Keywords (${keywords.count})` }
  ];
  return (
    <Fragment>
      <Tabs
        tabList={tabList}
        currentTab={tabState}
        setTab={tabSelectionHandler}
        styling={{ tabStyling, tabTitleStyling }}
      />

      <AnimatePresence exitBeforeEnter>
        {tabState === "movies" && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {movies.length !== 0 && (
              <Span className='block text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-medium text-center'>
                Movies matching : {search}
              </Span>
            )}
            <p className='text-center mt-2 mb-0'>
              <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year.
              Example: <b>&#39;Avatar y:2009&#39;.</b>
            </p>
            <MoviesSearch searchQuery={search} movieRes={movies} />
          </motion.div>
        )}

        {tabState === "tv" && (
          <motion.div
            key='tv'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {tv.length !== 0 && (
              <Span className='block text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-medium text-center'>
                TV shows matching : {search}
              </Span>
            )}
            <p className='text-center mt-2 mb-0'>
              <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year.
              Example: <b>&#39;Sherlock y:2010&#39;</b>.
            </p>
            <TVSearch searchQuery={search} tvRes={tv} />
          </motion.div>
        )}

        {tabState === "keywords" && (
          <motion.div
            key='keywords'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {keywords.length !== 0 && (
              <Span className='block text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-medium text-center'>
                Keywords matching : {search}
              </Span>
            )}
            <KeywordSearch searchQuery={search} keywords={keywords} />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SearchTab;
