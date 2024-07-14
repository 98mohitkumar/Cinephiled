import Backdrops from "components/Backdrops/Backdrops";
import Cast from "components/Cast/Cast";
import Posters from "components/Posters/Posters";
import Reviews from "components/Reviews/Reviews";
import BackdropsSvg from "components/Svg/backdrops";
import CastSvg from "components/Svg/cast";
import PostersSvg from "components/Svg/posters";
import ReviewsSvg from "components/Svg/reviews";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { Fragment } from "react";
import { framerTabVariants } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";
import { TabIcon, TabSelectionTitle, tabStyling } from "./MovieTabStyles";

const tabList = [
  {
    key: "cast",
    name: "Cast",
    svg: (active) => <CastSvg color={active ? "white" : "black"} />
  },
  {
    key: "reviews",
    name: "Reviews",
    svg: (active) => <ReviewsSvg color={active ? "white" : "black"} />
  },
  {
    key: "backdrops",
    name: "Backdrops",
    svg: (active) => <BackdropsSvg color={active ? "white" : "black"} />
  },
  {
    key: "posters",
    name: "Posters",
    svg: (active) => <PostersSvg color={active ? "white" : "black"} />
  }
];

const MovieTab = ({ cast, reviews, posters, backdrops }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "movieTabState", defaultState: "cast" });

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} styling={{ tabStyling }}>
        {tabList.map(({ key, name, svg }) => (
          <TabSelectionTitle key={key} onClick={() => setTab(key)} $active={activeTab === key}>
            <TabIcon>{svg(key === activeTab)}</TabIcon>
            {name}
          </TabSelectionTitle>
        ))}
      </Tabs>

      <AnimatePresence mode='wait' initial={false}>
        {activeTab === "cast" && (
          <motion.div
            key='cast'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            <ModulesWrapper>
              <Cast cast={cast} showFullCastLink />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            key='reviews'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            <ModulesWrapper>
              <Reviews reviews={reviews} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "backdrops" && (
          <motion.div
            key='backdrops'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            <ModulesWrapper>
              <Backdrops backdrops={backdrops} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "posters" && (
          <motion.div
            key='posters'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            <ModulesWrapper>
              <Posters posters={posters} />
            </ModulesWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default MovieTab;
