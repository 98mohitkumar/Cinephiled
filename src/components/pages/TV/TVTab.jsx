import { Image as ImageIcon, MessageSquareMore, ScrollText, TvMinimalPlay } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import MediaReviews from "components/Shared/MediaReviews";
import PlaceholderText from "components/Shared/PlaceholderText";
import { OverviewTabContent, PhotosTabContent, TabTemplate } from "components/Shared/TabHelpers";
import LayoutContainer from "components/UI/LayoutContainer";
import { opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { cn, matches } from "utils/helper";

import TVSeasons from "./TVSeasons";

const iconClasses = "h-4 w-4 sm:h-5 sm:w-5 shrink-0";

const tabList = [
  {
    key: "overview",
    name: "Overview",
    icon: (active) => <ScrollText className={cn(active ? "text-white" : "text-black", iconClasses)} />
  },
  {
    key: "seasons",
    name: "Seasons",
    icon: (active) => <TvMinimalPlay className={cn(active ? "text-white" : "text-black", iconClasses)} />
  },
  {
    key: "reviews",
    name: "Reviews",
    icon: (active) => <MessageSquareMore className={cn(active ? "text-white" : "text-black", iconClasses)} size={16} />
  },
  {
    key: "photos",
    name: "Photos",
    icon: (active) => <ImageIcon className={cn(active ? "text-white" : "text-black", iconClasses)} size={16} />
  }
];

const TVTab = ({ cast, reviews, posters, backdrops, seasons, title, overviewData }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "tvTab" });
  const activeTabIndex = tabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <LayoutContainer>
        <TabTemplate tabList={tabList} activeTab={activeTab} setTab={setTab} activeTabIndex={activeTabIndex} />
      </LayoutContainer>

      {/* overview */}
      <AnimatePresence mode='wait' initial={false}>
        {matches(activeTab, "overview") && (
          <motion.div key='overview' {...opacityMotionTransition}>
            <LayoutContainer className='py-3248'>
              <OverviewTabContent overviewData={overviewData} cast={cast} mediaType='tv' />
            </LayoutContainer>
          </motion.div>
        )}

        {/* seasons */}
        {matches(activeTab, "seasons") && (
          <motion.div key='seasons' {...opacityMotionTransition}>
            <LayoutContainer className='py-3248'>
              {seasons?.length > 0 ? <TVSeasons seasons={seasons} title={title} /> : <PlaceholderText>TBA</PlaceholderText>}
            </LayoutContainer>
          </motion.div>
        )}

        {/* reviews */}
        {matches(activeTab, "reviews") && (
          <motion.div key='reviews' {...opacityMotionTransition}>
            <LayoutContainer className='py-3248'>
              {reviews?.length > 0 ? <MediaReviews reviews={reviews} /> : <PlaceholderText>No reviews found for this TV show</PlaceholderText>}
            </LayoutContainer>
          </motion.div>
        )}

        {/* backdrops & posters */}
        {matches(activeTab, "photos") && (
          <motion.div key='photos' {...opacityMotionTransition}>
            <LayoutContainer className='py-3248'>
              {backdrops.concat(posters)?.length > 0 ? (
                <PhotosTabContent backdrops={backdrops} posters={posters} />
              ) : (
                <PlaceholderText>No photos found for this TV show</PlaceholderText>
              )}
            </LayoutContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default TVTab;
