import Backdrops from "components/Backdrops/Backdrops";
import Cast from "components/Cast/Cast";
import { TabSelectionTitle, tabStyling, TabIcon } from "components/MovieInfo/MovieTabStyles";
import Posters from "components/Posters/Posters";
import Reviews from "components/Reviews/Reviews";
import BackdropsSvg from "components/Svg/backdrops";
import CastSvg from "components/Svg/cast";
import PostersSvg from "components/Svg/posters";
import ReviewsSvg from "components/Svg/reviews";
import SeasonsSvg from "components/Svg/seasons";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { Fragment } from "react";
import { ModulesWrapper } from "styles/GlobalComponents";
import TVSeasons from "./TVSeasons";

const tabList = [
  {
    key: "cast",
    name: "Cast",
    svg: (active) => <CastSvg color={active ? "white" : "black"} />
  },
  {
    key: "seasons",
    name: "Seasons",
    svg: (active) => <SeasonsSvg color={active ? "white" : "black"} />
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

const TVTab = ({ cast, seasons, reviews, posters, backdrops }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "tvTabState", defaultState: "cast" });

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} styling={{ tabStyling }}>
        {tabList.map(({ key, name, svg }) => (
          <TabSelectionTitle
            key={key}
            onClick={() => setTab(key)}
            active={activeTab === key}
            tv={true}>
            <TabIcon>{svg(key === activeTab)}</TabIcon>
            {name}
          </TabSelectionTitle>
        ))}
      </Tabs>

      <AnimatePresence exitBeforeEnter initial={false}>
        {activeTab === "cast" && (
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

        {activeTab === "seasons" && (
          <motion.div
            key='seasons'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <ModulesWrapper>
              <TVSeasons seasons={seasons} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "reviews" && (
          <motion.div
            key='cast'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <ModulesWrapper>
              <Reviews reviews={reviews} />
            </ModulesWrapper>
          </motion.div>
        )}

        {activeTab === "backdrops" && (
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

        {activeTab === "posters" && (
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

export default TVTab;
