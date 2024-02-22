import Hero from "components/Hero/Hero";
import IndexTab from "components/IndexTab/IndexTab";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { fetchOptions, removeDuplicates } from "src/utils/helper";
import { Error404 } from "styles/GlobalComponents";

const BackdropBanner = dynamic(() => import("components/Hero/BackdropBanner"), {
  ssr: false
});

export default function Home({
  popularMovies,
  popularTv,
  trendingMovies,
  trendingTv,
  error,
  posters
}) {
  if (error) {
    return (
      <div className='grid place-items-center min-h-[75vh]'>
        <Error404 className='index-page'>
          404
          <p className='text-2xl text-center'>
            Please check your internet connection or try again later.
          </p>
        </Error404>
      </div>
    );
  } else {
    return (
      <Fragment>
        <MetaWrapper
          title='Cinephiled'
          description='Cinephiled - A progressive web app (PWA) to preview any movie or tv show with reviews, ratings, description and posters. Acting as a TMDB client, Cinephiled gives you access to login into your TMDB account and add movies or tv shows to your watchlist, set as favorites, rate and get personalized recommendations.'
          url='https://cinephiled.vercel.app'
        />

        {/* hero section */}
        <Hero banner={<BackdropBanner posters={posters} />} />

        {/* index tabs */}
        <IndexTab
          moviesData={popularMovies}
          TVData={popularTv}
          trendingMovies={trendingMovies}
          trendingTv={trendingTv}
        />
      </Fragment>
    );
  }
}

export async function getStaticProps() {
  try {
    const indexPageMedia = await Promise.all([
      fetch(apiEndpoints.movie.popularMovies, fetchOptions()),
      fetch(apiEndpoints.tv.popularTV, fetchOptions()),
      fetch(apiEndpoints.movie.trendingMovies, fetchOptions()),
      fetch(apiEndpoints.tv.trendingTV, fetchOptions())
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
      [...popularMovies.results, ...trendingMovies.results, ...trendingTv.results].map((item) => ({
        src: item.poster_path,
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
        posters
      },
      revalidate: 3600
    };
  } catch {
    return {
      props: { error: true }
    };
  }
}
