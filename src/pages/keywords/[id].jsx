import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import MovieResults from "components/pages/Keyword/MovieResults";
import TVResults from "components/pages/Keyword/TVResults";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import PlaceholderText from "components/Shared/PlaceholderText";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import LayoutContainer from "components/UI/LayoutContainer";
import H3 from "components/UI/Typography/H3";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, mediaTypeTabList, opacityMotionTransition, siteInfo } from "data/global";
import useTabs from "hooks/useTabs";
import { fetchOptions, getNiceName, matches } from "utils/helper";

const Keyword = ({ movies, tv, name, id }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "keywordTab" });
  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <MetaWrapper
        title={`${name} - Movies`}
        description={`Get all movies and tv shows matching the keyword : ${name}`}
        url={`${siteInfo.url}/${ROUTES.keywords}/${getNiceName({ id, name })}`}
      />

      <section className='relative'>
        <DominantColor tint />

        <LayoutContainer className='relative z-5 pb-24 pt-4864'>
          <H3 tag='p' weight='semibold' className='mx-auto mb-2440 max-w-screen-md text-center'>
            Results matching : {name}
          </H3>

          <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex}>
            {mediaTypeTabList.map(({ key, title }) => (
              <TabItem title={title} key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
                {title}
              </TabItem>
            ))}
          </Tabs>

          <AnimatePresence initial={false} mode='wait'>
            {matches(activeTab, "movies") && (
              <motion.div key='movies' {...opacityMotionTransition} className='mt-2440'>
                {movies?.length > 0 ? (
                  <MovieResults keywordId={id} movies={movies} />
                ) : (
                  <PlaceholderText height='large'>No Movies are available for this keyword.</PlaceholderText>
                )}
              </motion.div>
            )}

            {matches(activeTab, "tv") && (
              <motion.div key='tv' {...opacityMotionTransition} className='mt-3264'>
                {tv?.length > 0 ? (
                  <TVResults keywordId={id} tv={tv} />
                ) : (
                  <PlaceholderText height='large'>No TV shows are available for this keyword.</PlaceholderText>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutContainer>
      </section>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const keywordId = ctx.query.id;

    const [keywordMoviesRes, keywordTvRes] = await Promise.all([
      fetch(apiEndpoints.keywords.keywordMovies({ id: keywordId }), fetchOptions()),
      fetch(apiEndpoints.keywords.keywordTv({ id: keywordId }), fetchOptions())
    ]);

    if (![keywordMoviesRes.ok, keywordTvRes.ok].every(Boolean)) {
      throw new Error("error fetch data");
    }

    const keywordMovies = await keywordMoviesRes.json();
    const keywordTv = await keywordTvRes.json();

    return {
      props: {
        id: keywordId.split("-")[0],
        name: keywordId.split("-").slice(1).join(" "),
        movies: keywordMovies.results,
        tv: keywordTv.results
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
export default Keyword;
