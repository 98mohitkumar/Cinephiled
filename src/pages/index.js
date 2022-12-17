import { Fragment } from 'react';
import Hero from '../components/Hero/Hero';
import IndexTab from '../components/IndexTab/IndexTab';
import MetaWrapper from '../components/MetaWrapper';
import { apiEndpoints } from '../constants';
import { Error404 } from '../styles/GlobalComponents';

export default function Home({
  popularMovies,
  popularTv,
  trendingMovies,
  trendingTv,
  error
}) {
  if (error) {
    return (
      <div>
        <Error404>404</Error404>
        <p className='fs-4 text-center'>
          Please check your internet connection or try again later.
        </p>
      </div>
    );
  } else {
    return (
      <Fragment>
        <MetaWrapper
          title='Cinephiled'
          description='Cinephiled - A one stop website to preview any movie or tv show with reviews, ratings, description and posters.'
          url='https://cinephiled.vercel.app'
          image='https://i.imgur.com/1tH4WvQ.jpg'
        >
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
    const popularMoviesRes = await fetch(apiEndpoints.movie.popularMovies);
    const popularTvRes = await fetch(apiEndpoints.tv.popularTV);

    const trendingMoviesRes = await fetch(apiEndpoints.movie.trendingMovies);
    const trendingTvRes = await fetch(apiEndpoints.tv.trendingTV);

    const error = popularMoviesRes.ok && popularTvRes.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const popularMovies = await popularMoviesRes.json();
      const popularTv = await popularTvRes.json();

      const trendingMovies = await trendingMoviesRes.json();
      const trendingTv = await trendingTvRes.json();

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
    }
  } catch {
    return {
      props: { error: true }
    };
  }
}
