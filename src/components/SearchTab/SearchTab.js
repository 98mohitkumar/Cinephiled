import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";

import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { ActiveTabIndicator } from "components/Shared/Tabs/TabsStyles";
import useTabs from "hooks/useTabs";
import { ModulesWrapper } from "styles/GlobalComponents";
import { framerTabVariants } from "utils/helper";

import CollectionsSearch from "./CollectionsSearch";
import KeywordSearch from "./KeywordSearch";
import MoviesSearch from "./MoviesSearch";
import PeopleSearch from "./PeopleSearch";
import { SearchTabSelector, SearchTabWrapper } from "./SearchTabStyles";
import TVSearch from "./TVSearch";

const SearchTab = ({ movies, tv, search, keywords, people, collections }) => {
  const router = useRouter();
  const tabContainerRef = useRef(null);

  const { activeTab, setTab } = useTabs({
    tabLocation: "searchTab"
  });

  const tabSelectionHandler = (tab) => {
    setTab(tab);
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  };

  const tabList = [
    {
      key: "movies",
      name: `Movies (${movies.count})`
    },
    {
      key: "tv",
      name: `TV (${tv.count})`
    },
    {
      key: "people",
      name: `People (${people.count})`
    },
    {
      key: "collections",
      name: `Collections (${collections.count})`
    },
    {
      key: "keywords",
      name: `Keywords (${keywords.count})`
    }
  ];

  useEffect(() => {
    // scroll to active tab
    if (tabContainerRef?.current) {
      const activeTabElement = tabContainerRef.current.querySelector(".active");
      if (activeTabElement) {
        tabContainerRef.current.scrollLeft = activeTabElement.offsetLeft - 150;
      }
    }
  }, [activeTab]);

  return (
    <Fragment>
      <div className='px-3 my-7 lg:my-9'>
        <SearchTabWrapper ref={tabContainerRef}>
          {tabList.map(({ key, name }) => (
            <SearchTabSelector
              key={key}
              $count={tabList.length}
              $active={key === activeTab}
              onClick={() => tabSelectionHandler(key)}
              className={key === activeTab && "active relative"}>
              {name}
              {key === activeTab && <ActiveTabIndicator />}
            </SearchTabSelector>
          ))}
        </SearchTabWrapper>
      </div>

      <ModulesWrapper>
        <AnimatePresence mode='wait'>
          {activeTab === "movies" && (
            <motion.div key='movies' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {movies?.count > 0 ? (
                <Span className='block text-pretty text-center text-[calc(1.325rem_+_.9vw)] font-medium lg:text-[2rem]'>
                  Movies matching : {search}
                </Span>
              ) : null}
              <p className='mb-0 mt-2 text-center'>
                <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Avatar y:2009&#39;.</b>
              </p>
              <MoviesSearch searchQuery={search} movieRes={movies} />
            </motion.div>
          )}

          {activeTab === "tv" && (
            <motion.div key='tv' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {tv?.count > 0 && (
                <Span className='block text-pretty text-center text-[calc(1.325rem_+_.9vw)] font-medium lg:text-[2rem]'>
                  TV shows matching : {search}
                </Span>
              )}
              <p className='mb-0 mt-2 text-center'>
                <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Sherlock y:2010&#39;</b>.
              </p>
              <TVSearch searchQuery={search} tvRes={tv} />
            </motion.div>
          )}

          {activeTab === "people" && (
            <motion.div key='people' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {people?.count > 0 && (
                <Span className='block text-pretty text-center text-[calc(1.325rem_+_.9vw)] font-medium lg:text-[2rem]'>
                  People matching : {search}
                </Span>
              )}
              <PeopleSearch searchQuery={search} peopleRes={people} />
            </motion.div>
          )}

          {activeTab === "keywords" && (
            <motion.div key='keywords' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {keywords?.count > 0 && (
                <Span className='block text-pretty text-center text-[calc(1.325rem_+_.9vw)] font-medium lg:text-[2rem]'>
                  Keywords matching : {search}
                </Span>
              )}
              <KeywordSearch searchQuery={search} keywords={keywords} />
            </motion.div>
          )}

          {activeTab === "collections" && (
            <motion.div
              key='collections'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.325 }}>
              {collections?.count > 0 && (
                <Span className='block text-pretty text-center text-[calc(1.325rem_+_.9vw)] font-medium lg:text-[2rem]'>
                  Collections matching : {search}
                </Span>
              )}
              <CollectionsSearch searchQuery={search} collections={collections} />
            </motion.div>
          )}
        </AnimatePresence>
      </ModulesWrapper>
    </Fragment>
  );
};

export default SearchTab;
