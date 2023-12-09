import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState, useMemo } from "react";
import { LayoutContainer } from "styles/GlobalComponents";

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [tabState, setTabState] = useState("");

  useEffect(() => {
    const savedTabState = localStorage.getItem("indexTabState");
    setTabState(savedTabState ?? "movies");
  }, []);

  const tabSelectionHandler = (tab) => {
    localStorage.setItem("indexTabState", tab);
    setTabState(tab);
  };

  const tabList = useMemo(
    () => [
      { key: "movies", name: "Movies" },
      { key: "tv", name: "TV Shows" }
    ],
    []
  );

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={tabState} setTab={tabSelectionHandler} />

      <AnimatePresence initial={false} exitBeforeEnter>
        {tabState === "movies" && (
          <motion.div
            key='movies'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {/* popular movies */}
            <section>
              <span className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl font-bold text-white text-center my-4 block'>
                What&#39;s Popular
              </span>
              <LayoutContainer className='index-page'>
                <MoviesTemplate movies={moviesData} />
              </LayoutContainer>
            </section>

            {/* Trending Movies */}
            <section className='pt-5'>
              <span className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl font-bold text-white text-center my-4 block'>
                Trending Today
              </span>
              <LayoutContainer className='index-page'>
                <MoviesTemplate movies={trendingMovies} />
              </LayoutContainer>
            </section>
          </motion.div>
        )}

        {tabState === "tv" && (
          <motion.div
            key='tv'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {/* popular TV */}
            <section>
              <span className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl font-bold text-white text-center my-4 block'>
                What&#39;s Popular
              </span>
              <LayoutContainer className='index-page'>
                <TVTemplate TV={TVData} />
              </LayoutContainer>
            </section>

            {/* Trending TV */}
            <section className='pt-5'>
              <span className='text-[calc(1.425rem_+_2.1vw)] xl:text-5xl font-bold text-white text-center my-4 block'>
                Trending Today
              </span>
              <LayoutContainer className='index-page'>
                <TVTemplate TV={trendingTv} />
              </LayoutContainer>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default IndexTab;
