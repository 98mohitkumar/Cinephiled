import { Fragment } from "react";
import { getCountryCode } from "apiEndpoints/user";
import DominantColor from "components/DominantColor/DominantColor";
import Genres from "components/Explore/Genres";
import NowPlayingMovies from "components/Explore/NowPlayingMovies";
import StreamingProvides from "components/Explore/Providers";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { LayoutContainer } from "styles/GlobalComponents";
import { fetchOptions } from "utils/helper";

const Explore = ({ movieGenres, tvGenres, nowPlaying }) => {
  return (
    <Fragment>
      <MetaWrapper
        title='Explore - Cinephiled'
        description="Embark on a cinematic journey through diverse genres of movies and TV shows. Uncover the latest releases and discover what's currently captivating audiences in theaters near you."
        url='https://cinephiled.vercel.app/explore'
      />

      <Fragment>
        <section className='relative'>
          <DominantColor flip tint />

          {/* genres for movies and tv shows */}
          <LayoutContainer className='relative z-20 mb-auto !pr-0'>
            <Genres movieGenres={movieGenres} tvGenres={tvGenres} />
          </LayoutContainer>

          <LayoutContainer className='relative z-20 mt-8'>
            <StreamingProvides />
          </LayoutContainer>
        </section>

        {/* movies that are currently in theatres */}
        {nowPlaying.length > 0 ? <NowPlayingMovies nowPlaying={nowPlaying} /> : null}
      </Fragment>
    </Fragment>
  );
};

export const getServerSideProps = async ({ req }) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const region = await getCountryCode(ip);

  try {
    const explorePageData = await Promise.all([
      fetch(apiEndpoints.movie.movieGenreList, fetchOptions()),
      fetch(apiEndpoints.tv.tvGenreList, fetchOptions()),
      fetch(apiEndpoints.movie.nowPlaying({ region, pageQuery: 1 }), fetchOptions()),
      fetch(apiEndpoints.movie.nowPlaying({ region, pageQuery: 2 }), fetchOptions())
    ]);

    const error = explorePageData.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch genres");

    const [movieGenresRes, tvGenresRes, nowPlayingRes, nowPlayingNextPage] = explorePageData;
    const [movieGenresList, tvGenresList, nowPlayingList, nowPlayingNextPageList] = await Promise.all([
      movieGenresRes.json(),
      tvGenresRes.json(),
      nowPlayingRes.json(),
      nowPlayingNextPage.json()
    ]);

    return {
      props: {
        movieGenres: movieGenresList?.genres || [],
        tvGenres: tvGenresList?.genres || [],
        nowPlaying: nowPlayingList?.results.concat(nowPlayingNextPageList?.results) || []
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default Explore;
