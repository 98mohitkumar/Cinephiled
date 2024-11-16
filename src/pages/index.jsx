import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import Hero from "components/Hero/Hero";
import { LayoutContainer } from "components/Layout/helpers";
import MetaWrapper from "components/MetaWrapper";
import { TabItem, Tabs } from "components/Tabs/Tabs";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "globals/constants";
import useTabs from "hooks/useTabs";
import { fetchOptions, removeDuplicates, framerTabVariants, matches } from "utils/helper";

const tabList = [
  { key: "movies", title: `Movies` },
  { key: "tv", title: `TV Shows` }
];

const SectionTitle = ({ title }) => (
  <H2 className='mb-2432 text-center text-white' weight='semibold'>
    {title}
  </H2>
);

export default function Home({ popularMovies, popularTv, trendingMovies, trendingTv, posters }) {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab" });

  const activeIndex = tabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <MetaWrapper
        title='Cinephiled'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url='https://cinephiled.vercel.app'
      />

      {/* hero section (memoized) */}
      <Hero posters={posters} />

      {/* movies and tv shows tabs */}
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
      revalidate: 3600
    };
  } catch {
    return {
      notFound: true
    };
  }
}
