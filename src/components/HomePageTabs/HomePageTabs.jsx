import { AnimatePresence, motion } from "framer-motion";
import TemplateGrid from "./TemplateGrid";
import { LayoutContainer } from "components/Layout/helpers";
import { TabItem, Tabs } from "components/Tabs/Tabs";
import H2 from "components/Typography/H2";
import useTabs from "hooks/useTabs";
import { framerTabVariants, matches } from "utils/helper";

const tabList = [
  { key: "movies", title: `Movies` },
  { key: "tv", title: `TV Shows` }
];

const SectionTitle = ({ title }) => <H2 className='mb-2432 text-center text-white'>{title}</H2>;

const HomePageTabs = ({ moviesData, tvData }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab" });

  const activeIndex = tabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <LayoutContainer className='py-2440'>
      <Tabs tabItemsCount={tabList.length} activeItemIndex={activeIndex}>
        {tabList.map(({ key, title }) => (
          <TabItem key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
            {title}
          </TabItem>
        ))}
      </Tabs>

      <AnimatePresence initial={false} mode='wait'>
        {matches(activeTab, "movies") && (
          <motion.div
            key='movies'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}
            className='mt-3264'>
            {/* Trending Movies */}
            <section>
              <SectionTitle title='Trending Today' />
              <TemplateGrid mediaType='movie' media={moviesData.trending} />
            </section>

            {/* popular movies */}
            <section className='mt-6480'>
              <SectionTitle title='What&#39;s Popular' />
              <TemplateGrid mediaType='movie' media={moviesData.popular} />
            </section>
          </motion.div>
        )}

        {matches(activeTab, "tv") && (
          <motion.div
            key='tv'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}
            className='mt-3264'>
            {/* Trending TV */}
            <section>
              <SectionTitle title='Trending Today' />
              <TemplateGrid mediaType='tv' media={tvData.trending} />
            </section>

            {/* popular TV */}
            <section className='mt-6480'>
              <SectionTitle title='What&#39;s Popular' />
              <TemplateGrid mediaType='tv' media={tvData.popular} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutContainer>
  );
};

export default HomePageTabs;
