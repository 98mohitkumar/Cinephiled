import { motion, AnimatePresence } from "motion/react";
import { Fragment, useEffect, useRef } from "react";

import { LinearTabs } from "components/Shared/Tabs/Tabs";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { matches } from "utils/helper";

import CollectionsSearch from "./CollectionsSearch";
import CompaniesSearch from "./CompaniesSearch";
import KeywordSearch from "./KeywordSearch";
import MoviesSearch from "./MoviesSearch";
import PeopleSearch from "./PeopleSearch";
import TVSearch from "./TVSearch";

const SearchTab = ({ movies, tv, searchQuery, keywords, people, collections, year, companies }) => {
  const tabContainerRef = useRef(null);

  const { activeTab, setTab } = useTabs({
    tabLocation: "searchTab"
  });

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
      key: "companies",
      name: `Companies (${companies.count})`
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

  const currentTab = tabList.find((tab) => tab.key === activeTab).key;

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
      <LinearTabs tabList={tabList} currentTab={currentTab} setTab={setTab} />

      <div className='mt-2440'>
        <AnimatePresence mode='wait'>
          {matches(activeTab, "movies") && (
            <motion.div key='movies' {...opacityMotionTransition}>
              <div className='mb-3240 text-center'>
                <H4 tag='p' weight='semibold'>
                  Movies Matching : {searchQuery}
                </H4>
                <P className='mt-8'>
                  <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Avatar y:2009&#39;</b>
                </P>
              </div>
              <MoviesSearch searchQuery={searchQuery} movies={movies} year={year} />
            </motion.div>
          )}

          {matches(activeTab, "tv") && (
            <motion.div key='tv' {...opacityMotionTransition}>
              <div className='mb-3240 text-center'>
                <H4 tag='p' weight='semibold'>
                  TV Shows Matching : {searchQuery}
                </H4>
                <P className='mt-8'>
                  <b>Tip</b>: You can use the &#39;y:&#39; filter to narrow your results by year. Example: <b>&#39;Sherlock y:2010&#39;</b>
                </P>
              </div>
              <TVSearch searchQuery={searchQuery} tv={tv} year={year} />
            </motion.div>
          )}

          {matches(activeTab, "companies") && (
            <motion.div key='companies' {...opacityMotionTransition}>
              {companies?.count > 0 && (
                <H4 tag='p' weight='semibold' className='mb-3240 text-center'>
                  Companies Matching : {searchQuery}
                </H4>
              )}
              <CompaniesSearch searchQuery={searchQuery} companies={companies} />
            </motion.div>
          )}

          {matches(activeTab, "people") && (
            <motion.div key='people' {...opacityMotionTransition}>
              {people?.count > 0 && (
                <H4 tag='p' weight='semibold' className='mb-3240 text-center'>
                  People Matching : {searchQuery}
                </H4>
              )}
              <PeopleSearch searchQuery={searchQuery} people={people} />
            </motion.div>
          )}

          {matches(activeTab, "collections") && (
            <motion.div key='collections' {...opacityMotionTransition}>
              {collections?.count > 0 && (
                <H4 tag='p' weight='semibold' className='mb-3240 text-center'>
                  Collections Matching : {searchQuery}
                </H4>
              )}
              <CollectionsSearch searchQuery={searchQuery} collections={collections} />
            </motion.div>
          )}

          {matches(activeTab, "keywords") && (
            <motion.div key='keywords' {...opacityMotionTransition}>
              {keywords?.count > 0 && (
                <H4 tag='p' weight='semibold' className='mb-3240 text-center'>
                  Keywords Matching : {searchQuery}
                </H4>
              )}
              <KeywordSearch searchQuery={searchQuery} keywords={keywords} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default SearchTab;
