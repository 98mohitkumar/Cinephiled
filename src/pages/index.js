import Hero from "components/Hero/Hero";
import IndexTab from "components/IndexTab/IndexTab";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { Error404 } from "styles/GlobalComponents";

export default function Home({ popularMovies, popularTv, trendingMovies, trendingTv, error }) {
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
          image='https://i.imgur.com/1tH4WvQ.jpg'>
          {/* Preloads */}
          <link rel='preload' href='/Images/poster.webp' as='image' />
        </MetaWrapper>

        {/* hero section */}
        <Hero />

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
      fetch(apiEndpoints.movie.popularMovies),
      fetch(apiEndpoints.tv.popularTV),
      fetch(apiEndpoints.movie.trendingMovies),
      fetch(apiEndpoints.tv.trendingTV)
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

    return {
      props: {
        popularMovies: popularMovies.results,
        popularTv: popularTv.results,
        trendingMovies: trendingMovies.results,
        trendingTv: trendingTv.results,
        error
      },
      revalidate: 3600
    };
  } catch {
    return {
      props: { error: true }
    };
  }
}
