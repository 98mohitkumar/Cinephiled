import { useEffect, useState } from 'react';
import Hero from '../components/Hero/Hero';
import IndexTab from '../components/IndexTab/IndexTab';
import MetaWrapper from '../components/MetaWrapper';
import { Error404 } from '../styles/GlobalComponents';

export default function Home({ moviesData, TVData, error }) {
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const abortCtrl = new AbortController();
    if (!error) {
      localStorage.setItem('SearchTabPosition', '');
      const api_key = process.env.NEXT_PUBLIC_API_KEY;

      async function getTrending() {
        const trendingResMovies = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`,
          { signal: abortCtrl.signal }
        );

        const trendingResTv = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`,
          { signal: abortCtrl.signal }
        );

        const trendingMoviesResults = await trendingResMovies.json();

        const trendingTvResults = await trendingResTv.json();

        return {
          trendingMoviesArr: trendingMoviesResults.results,
          trendingTvArr: trendingTvResults.results
        };
      }

      getTrending()
        .then((data) => {
          setTrendingTv(data.trendingTvArr);
          setTrendingMovies(data.trendingMoviesArr);
        })
        .catch((err) => console.log(err));
    }

    return () => {
      abortCtrl.abort();
    };
  }, [error]);

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
      <>
        <MetaWrapper
          title='Cinephiled'
          description='Cinephiled - A one stop website to preview any movie or tv show with reviews, ratings, description and posters.'
          url='https://cinephiled.vercel.app'
          image='https://i.imgur.com/Jtl3tJG.png'
        >
          {/* Preloads */}
          <link rel='preload' href='/Images/poster.webp' as='image' />
        </MetaWrapper>

        {/* hero section */}
        <Hero />

        {/* index tabs */}
        <IndexTab
          moviesData={moviesData}
          TVData={TVData}
          trendingMovies={trendingMovies}
          trendingTv={trendingTv}
        />
      </>
    );
  }
}
export async function getStaticProps() {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    const responseMovies = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
    );

    const responseTV = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
    );
    const error = responseMovies.ok && responseTV.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const resMovies = await responseMovies.json();
      const resTV = await responseTV.json();
      const moviesData = await resMovies.results;
      const TVData = await resTV.results;

      return {
        props: {
          moviesData,
          TVData,
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
