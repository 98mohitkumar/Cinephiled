import Head from "next/head";
import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import IndexTab from "../components/Popular/IndexTab";
import { motion } from "framer-motion";

export default function Home({ moviesData, TVData }) {
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    localStorage.setItem("SearchTabPosition", "");
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getTrending() {
      const trendingResMovies = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
      );

      const trendingResTv = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}`
      );

      const trendingMoviesResults = await trendingResMovies.json();

      const trendingTvResults = await trendingResTv.json();

      return {
        trendingMoviesArr: trendingMoviesResults.results,
        trendingTvArr: trendingTvResults.results,
      };
    }

    getTrending().then((data) => {
      setTrendingTv(data.trendingTvArr);
      setTrendingMovies(data.trendingMoviesArr);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Cinephiled</title>
      </Head>
      <Hero />
      <IndexTab
        moviesData={moviesData}
        TVData={TVData}
        trendingMovies={trendingMovies}
        trendingTv={trendingTv}
      />
    </>
  );
}

export async function getStaticProps() {
  const api_key = process.env.API_KEY;

  const responseMovies = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
  );

  const responseTV = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`
  );

  const resMovies = await responseMovies.json();
  const resTV = await responseTV.json();
  const moviesData = await resMovies.results;
  const TVData = await resTV.results;

  return {
    props: {
      moviesData,
      TVData,
    },
    revalidate: 3600,
  };
}
