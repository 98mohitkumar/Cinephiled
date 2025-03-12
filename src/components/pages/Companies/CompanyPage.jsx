import { AnimatePresence, motion } from "motion/react";

import PlaceholderText from "components/Shared/PlaceholderText";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import LayoutContainer from "components/UI/LayoutContainer";
import { mediaTypeTabList, opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { matches } from "utils/helper";

import CompanyMoviesTab from "./CompanyMoviesTab";
import CompanyTVTab from "./CompanyTVTab";

const CompanyPage = ({ movies, tvShows, id }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "companyTab" });

  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <LayoutContainer className='grow py-24'>
      <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex}>
        {mediaTypeTabList.map(({ key, title }) => (
          <TabItem title={title} key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
            {title}
          </TabItem>
        ))}
      </Tabs>

      <AnimatePresence initial={false} mode='wait'>
        {matches(activeTab, "movies") && (
          <motion.div key='movies' {...opacityMotionTransition} className='mt-3264'>
            {movies?.length > 0 ? (
              <CompanyMoviesTab initialData={movies} id={id} />
            ) : (
              <PlaceholderText height='large'>No Movies are available for this company</PlaceholderText>
            )}
          </motion.div>
        )}

        {matches(activeTab, "tv") && (
          <motion.div key='tv' {...opacityMotionTransition} className='mt-3264'>
            {tvShows?.length > 0 ? (
              <CompanyTVTab initialData={tvShows} id={id} />
            ) : (
              <PlaceholderText height='large'>No TV Shows are available for this company</PlaceholderText>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default CompanyPage;
