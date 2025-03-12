import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import Hero from "components/pages/HomePage/Hero/Hero";
import MetaWrapper from "components/Shared/MetaWrapper";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { mediaTypeTabList, opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { fetchOptions, removeDuplicates, matches } from "utils/helper";

const SectionTitle = ({ title }) => <H2 className='mb-2432 text-center text-white'>{title}</H2>;

export default function Home({ popularMovies, popularTv, trendingMovies, trendingTv, backdrops }) {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab" });

  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <MetaWrapper />

      {/* hero section (memoized) */}
      <Hero backdrops={backdrops} />

      {/* movies and tv shows tabs */}
      <LayoutContainer className='py-2440'>
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
              {/* Trending Movies */}
              <section>
                <SectionTitle title='Trending Today' />
                <MediaTemplateGrid media={trendingMovies} mediaType='movie' />
              </section>

              {/* popular movies */}
              <section className='mt-6480'>
                <SectionTitle title='What&#39;s Popular' />
                <MediaTemplateGrid media={popularMovies} mediaType='movie' />
              </section>
            </motion.div>
          )}

          {matches(activeTab, "tv") && (
            <motion.div key='tv' {...opacityMotionTransition} className='mt-3264'>
              {/* Trending TV */}
              <section>
                <SectionTitle title='Trending Today' />
                <MediaTemplateGrid media={trendingTv} mediaType='tv' />
              </section>

              {/* popular TV */}
              <section className='mt-6480'>
                <SectionTitle title='What&#39;s Popular' />
                <MediaTemplateGrid media={popularTv} mediaType='tv' />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutContainer>
    </Fragment>
  );
}

export async function getStaticProps() {
  try {
    const indexPageMedia = await Promise.all([
      fetch(apiEndpoints.movie.popularMovies, fetchOptions()),
      fetch(apiEndpoints.tv.popularTv, fetchOptions()),
      fetch(apiEndpoints.movie.trendingMovies, fetchOptions()),
      fetch(apiEndpoints.tv.trendingTv, fetchOptions())
    ]);

    const error = indexPageMedia.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch data");

    const [popularMoviesRes, popularTvRes, trendingMoviesRes, trendingTvRes] = indexPageMedia;

    const [popularMovies, popularTv, trendingMovies, trendingTv] = await Promise.all([
      popularMoviesRes.json(),
      popularTvRes.json(),
      trendingMoviesRes.json(),
      trendingTvRes.json()
    ]);

    const { cleanedItems: backdrops } = removeDuplicates(
      [...popularMovies.results, ...trendingMovies.results, ...trendingTv.results]
        .filter((item) => item.backdrop_path)
        .map((item) => ({
          src: item.backdrop_path,
          id: item.id
        }))
    );

    return {
      props: {
        popularMovies: popularMovies.results,
        popularTv: popularTv.results,
        trendingMovies: trendingMovies.results,
        trendingTv: trendingTv.results,
        error,
        backdrops: backdrops.sort(() => Math.random() - 0.5)
      },
      revalidate: 60 * 60 * 24
    };
  } catch {
    return {
      notFound: true
    };
  }
}
