import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navigation from "../components/Navigation/Navigation";
import Popular from "../components/Popular/Popular";
import { Wrapper } from "../styles/GlobalComponents";

export default function Home({ moviesData, TVData }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Wrapper>
        <Navigation />
        <Hero />
        <Popular moviesData={moviesData} TVData={TVData} />
        <Footer />
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const api_key = "146aefbfac856df49543995a6badbf0f";

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
