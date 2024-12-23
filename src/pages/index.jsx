import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import Hero from "components/pages/HomePage/Hero/Hero";
import MetaWrapper from "components/Shared/MetaWrapper";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { mediaTypeTabList } from "data/global";
import useTabs from "hooks/useTabs";
import { fetchOptions, removeDuplicates, framerTabVariants, matches } from "utils/helper";

const SectionTitle = ({ title }) => <H2 className='mb-2432 text-center text-white'>{title}</H2>;

export default function Home({ popularMovies, popularTv, trendingMovies, trendingTv, posters }) {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab" });

  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <MetaWrapper />

      {/* hero section (memoized) */}
      <Hero posters={posters} />

      {/* movies and tv shows tabs */}
      <LayoutContainer className='py-2440'>
        <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex}>
          {mediaTypeTabList.map(({ key, title }) => (
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
                <MediaTemplateGrid mediaType='movie' media={trendingMovies} />
              </section>

              {/* popular movies */}
              <section className='mt-6480'>
                <SectionTitle title='What&#39;s Popular' />
                <MediaTemplateGrid mediaType='movie' media={popularMovies} />
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
                <MediaTemplateGrid mediaType='tv' media={trendingTv} />
              </section>

              {/* popular TV */}
              <section className='mt-6480'>
                <SectionTitle title='What&#39;s Popular' />
                <MediaTemplateGrid mediaType='tv' media={popularTv} />
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

    const { cleanedItems: posters } = removeDuplicates(
      [...popularMovies.results, ...trendingMovies.results, ...trendingTv.results]
        .filter((item) => item.poster_path)
        .map((item) => ({
          src: item.poster_path,
          id: item.id
        }))
    );

    const extraSet = [...posters].splice(0, 20).map((item) => ({
      src: item.src,
      id: item.id + 1000 * 1000
    }));

    return {
      props: {
        popularMovies: popularMovies.results,
        popularTv: popularTv.results,
        trendingMovies: trendingMovies.results,
        trendingTv: trendingTv.results,
        error,
        posters: posters.concat(extraSet).sort((a, b) => a.id - b.id)
      },
      revalidate: 60 * 60 * 24
    };
  } catch {
    return {
      notFound: true
    };
  }
}
