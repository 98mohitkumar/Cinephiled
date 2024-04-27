import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Tabs from "components/Tabs/Tabs";
import { motion, AnimatePresence } from "framer-motion";
import useTabs from "hooks/useTabs";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { framerTabVariants } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";
import KeywordSearch from "./KeywordSearch";
import MoviesSearch from "./MoviesSearch";
import { tabStyling, tabTitleStyling } from "./SearchTabStyles";
import TVSearch from "./TVSearch";

const SearchTab = ({ movies, tv, search, keywords }) => {
  const router = useRouter();

  const { activeTab, setTab } = useTabs({
    tabLocation: "searchTabPosition",
    defaultState: "movies"
  });

  const tabSelectionHandler = (tab) => {
    setTab(tab);
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
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
        currentTab={activeTab}
        setTab={tabSelectionHandler}
        styling={{ tabStyling, tabTitleStyling }}
      />

      <ModulesWrapper>
        <AnimatePresence mode='wait'>
          {activeTab === "movies" && (
            <motion.div
              key='movies'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.5 }}>
              {movies?.count > 0 ? (
                <Span className='block text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-medium text-center'>
                  Movies matching : {search}
                </Span>
              ) : null}
              <p className='text-center mt-2 mb-0'>
                <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year.
                Example: <b>&#39;Avatar y:2009&#39;.</b>
              </p>
              <MoviesSearch searchQuery={search} movieRes={movies} />
            </motion.div>
          )}

          {activeTab === "tv" && (
            <motion.div
              key='tv'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.5 }}>
              {tv?.count > 0 && (
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

          {activeTab === "keywords" && (
            <motion.div
              key='keywords'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.5 }}>
              {keywords?.count > 0 && (
                <Span className='block text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-medium text-center'>
                  Keywords matching : {search}
                </Span>
              )}
              <KeywordSearch searchQuery={search} keywords={keywords} />
            </motion.div>
          )}
        </AnimatePresence>
      </ModulesWrapper>
    </Fragment>
  );
};

export default SearchTab;
