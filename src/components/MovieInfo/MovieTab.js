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
import { useState, useEffect, Fragment } from "react";
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
  const [tabState, setTabState] = useState("");

  useEffect(() => {
    let savedTabState = localStorage.getItem("MovieTabState");
    setTabState(savedTabState ?? "cast");
  }, []);

  const tabSelectionHandler = (tab) => {
    setTabState(tab);
    localStorage.setItem("MovieTabState", tab);
  };

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={tabState} styling={{ tabStyling }}>
        {tabList.map(({ key, name, svg }) => (
          <TabSelectionTitle
            key={key}
            onClick={() => tabSelectionHandler(key)}
            active={tabState === key}>
            <TabIcon>{svg(key === tabState)}</TabIcon>
            {name}
          </TabSelectionTitle>
        ))}
      </Tabs>

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === "cast" && (
          <motion.div
            key='cast'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <ModulesWrapper>
              <Cast cast={cast} />
            </ModulesWrapper>
          </motion.div>
        )}

        {tabState === "reviews" && (
          <motion.div
            key='reviews'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <ModulesWrapper>
              <Reviews reviews={reviews} />
            </ModulesWrapper>
          </motion.div>
        )}

        {tabState === "backdrops" && (
          <motion.div
            key='backdrops'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <ModulesWrapper>
              <Backdrops backdrops={backdrops} />
            </ModulesWrapper>
          </motion.div>
        )}

        {tabState === "posters" && (
          <motion.div
            key='posters'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
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
