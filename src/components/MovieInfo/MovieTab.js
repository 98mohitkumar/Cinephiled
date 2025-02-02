import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import Backdrops from "components/Backdrops/Backdrops";
import Cast from "components/Cast/Cast";
import Posters from "components/Posters/Posters";
import Reviews from "components/Reviews/Reviews";
import { Tabs } from "components/Shared/Tabs/Tabs";
import BackdropsSvg from "components/Svg/backdrops";
import CastSvg from "components/Svg/cast";
import PostersSvg from "components/Svg/posters";
import ReviewsSvg from "components/Svg/reviews";
import useTabs from "hooks/useTabs";
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
  const { activeTab, setTab } = useTabs({ tabLocation: "movieTab" });

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
          <motion.div key='cast'>
            <ModulesWrapper>
              <Cast cast={cast} showFullCastLink />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div key='reviews'>
            <ModulesWrapper>
              <Reviews reviews={reviews} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "backdrops" && (
          <motion.div key='backdrops'>
            <ModulesWrapper>
              <Backdrops backdrops={backdrops} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "posters" && (
          <motion.div key='posters'>
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
