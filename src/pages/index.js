import { Fragment } from "react";
import Hero from "components/Hero/Hero";
import HomePageTabs from "components/HomePageTabs/HomePageTabs";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { fetchOptions, removeDuplicates } from "utils/helper";

export default function Home({ popularMovies, popularTv, trendingMovies, trendingTv, posters }) {
  return (
    <Fragment>
      <MetaWrapper
        title='Cinephiled'
        description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
        url='https://cinephiled.vercel.app'
      />

      {/* hero section */}
      <Hero posters={posters} />

      {/* index tabs */}
      <HomePageTabs
        moviesData={{
          popular: popularMovies,
          trending: trendingMovies
        }}
        tvData={{
          popular: popularTv,
          trending: trendingTv
        }}
      />
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
