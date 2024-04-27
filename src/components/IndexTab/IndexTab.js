import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { Fragment } from "react";
import { framerTabVariants } from "src/utils/helper";
import { LayoutContainer } from "styles/GlobalComponents";

const tabList = [
  { key: "movies", name: `Movies` },
  { key: "tv", name: `TV Shows` }
];

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab", defaultState: "movies" });

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} setTab={setTab} />

      <AnimatePresence initial={false} mode='wait'>
        {activeTab === "movies" && (
          <motion.div
            key='movies'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
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

        {activeTab === "tv" && (
          <motion.div
            key='tv'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
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
