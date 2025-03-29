import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import Hero from "components/pages/HomePage/Hero/Hero";
import MetaWrapper from "components/Shared/MetaWrapper";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { PeopleTemplateGrid } from "components/Templates/PeopleTemplate";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { mediaTypeTabList, opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { fetchOptions, removeDuplicates, matches, randomizeItems } from "utils/helper";

const SectionTitle = ({ title }) => <H2 className='mb-2432 text-center text-white'>{title}</H2>;

const tabList = mediaTypeTabList.concat({ key: "people", title: "People" });

export default function Home({ trendingMovies, trendingTv, popularPeople, backdrops }) {
  const { activeTab, setTab } = useTabs({ tabLocation: "indexTab" });

  const activeTabIndex = tabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <MetaWrapper />

      {/* hero section (memoized) */}
      <Hero backdrops={backdrops} />

      {/* movies and tv shows tabs */}
      <LayoutContainer className='py-2440'>
        <Tabs tabItemsCount={tabList.length} activeItemIndex={activeTabIndex}>
          {tabList.map(({ key, title }) => (
            <TabItem title={title} key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
              <P size='p-to-large' weight='bold'>
                {title}
              </P>
            </TabItem>
          ))}
        </Tabs>

        <AnimatePresence initial={false} mode='wait'>
          {matches(activeTab, "movies") && (
            <motion.div key='movies' {...opacityMotionTransition} className='mt-3264'>
              <SectionTitle title='Trending Movies' />
              <MediaTemplateGrid media={trendingMovies} mediaType='movie' />
            </motion.div>
          )}

          {matches(activeTab, "tv") && (
            <motion.div key='tv' {...opacityMotionTransition} className='mt-3264'>
              <SectionTitle title='Trending TV Shows' />
              <MediaTemplateGrid media={trendingTv} mediaType='tv' />
            </motion.div>
          )}

          {/* popular people */}
          {matches(activeTab, "people") && (
            <motion.div key='people' {...opacityMotionTransition} className='mt-3264'>
              <section>
                <SectionTitle title='Popular People' />
                <PeopleTemplateGrid items={popularPeople}>
                  {(person) => (
                    <div className='mt-12'>
                      <P tag='h6' weight='bold' className='text-pretty' title={person.name}>
                        {person.name}
                      </P>

                      <P className='text-pretty text-neutral-400' weight='medium' size='small'>
                        {person.known_for.map((item) => item.title || item.name).join(", ")}
                      </P>
                    </div>
                  )}
                </PeopleTemplateGrid>
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
      fetch(apiEndpoints.movie.trendingMovies({ pageQuery: 1 }), fetchOptions()),
      fetch(apiEndpoints.movie.trendingMovies({ pageQuery: 2 }), fetchOptions()),
      fetch(apiEndpoints.tv.trendingTv({ pageQuery: 1 }), fetchOptions()),
      fetch(apiEndpoints.tv.trendingTv({ pageQuery: 2 }), fetchOptions()),
      fetch(apiEndpoints.popularPeople({ pageQuery: 1 }), fetchOptions()),
      fetch(apiEndpoints.popularPeople({ pageQuery: 2 }), fetchOptions())
    ]);

    const error = indexPageMedia.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch data");

    const [trendingMoviesRes, trendingMoviesResNext, trendingTvRes, trendingTvResNext, popularPeopleRes, popularPeopleResNext] = indexPageMedia;

    const [trendingMovies, trendingMoviesNext, trendingTv, trendingTvNext, popularPeople, popularPeopleNext] = await Promise.all([
      trendingMoviesRes.json(),
      trendingMoviesResNext.json(),
      trendingTvRes.json(),
      trendingTvResNext.json(),
      popularPeopleRes.json(),
      popularPeopleResNext.json()
    ]);

    const trendingMoviesList = trendingMovies?.results.concat(trendingMoviesNext?.results) || [];
    const trendingTvList = trendingTv?.results.concat(trendingTvNext?.results) || [];

    const { cleanedItems: backdrops } = removeDuplicates(
      [...trendingMoviesList, ...trendingTvList]
        .filter((item) => item.backdrop_path)
        .map((item) => ({
          src: item.backdrop_path,
          id: item.id
        }))
    );

    const allBackdrops = randomizeItems(backdrops);

    const { cleanedItems: cleanedPopularPeople } = removeDuplicates(popularPeople?.results?.concat(popularPeopleNext?.results));

    return {
      props: {
        trendingMovies: trendingMoviesList,
        trendingTv: trendingTvList,
        popularPeople: cleanedPopularPeople || [],
        error,
        backdrops: allBackdrops.length % 2 !== 0 ? allBackdrops.slice(0, -1) : allBackdrops
      },
      revalidate: 3600
    };
  } catch {
    return {
      notFound: true
    };
  }
}
