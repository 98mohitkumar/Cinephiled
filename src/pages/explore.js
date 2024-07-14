import { getCountryCode } from "api/user";
import DominantColor from "components/DominantColor/DominantColor";
import Genres from "components/Explore/Genres";
import NowPlayingMovies from "components/Explore/NowPlayingMovies";
import StreamingProvides from "components/Explore/Providers";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { fetchOptions } from "src/utils/helper";
import { LayoutContainer, Error404 } from "styles/GlobalComponents";

const Explore = ({ movieGenres, tvGenres, error, nowPlaying }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Cinephiled" : "Explore - Cinephiled"}
        description="Embark on a cinematic journey through diverse genres of movies and TV shows. Uncover the latest releases and discover what's currently captivating audiences in theaters near you."
        url='https://cinephiled.vercel.app/explore'
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          <section className='relative'>
            <DominantColor flip tint />

            {/* genres for movies and tv shows */}
            <LayoutContainer className='mb-auto relative z-20 !pr-0'>
              <Genres movieGenres={movieGenres} tvGenres={tvGenres} />
            </LayoutContainer>

            <LayoutContainer className='mt-8 relative z-20'>
              <StreamingProvides />
            </LayoutContainer>
          </section>

          {/* movies that are currently in theatres */}
          {nowPlaying.length > 0 ? <NowPlayingMovies nowPlaying={nowPlaying} /> : null}
        </Fragment>
      )}
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
      fetch(apiEndpoints.movie.nowPlaying({ region }), fetchOptions())
    ]);

    const error = explorePageData.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch genres");

    const [movieGenresRes, tvGenresRes, nowPlayingRes] = explorePageData;
    const [movieGenresList, tvGenresList, nowPlayingList] = await Promise.all([
      movieGenresRes.json(),
      tvGenresRes.json(),
      nowPlayingRes.json()
    ]);

    return {
      props: {
        movieGenres: movieGenresList?.genres || [],
        tvGenres: tvGenresList?.genres || [],
        nowPlaying: nowPlayingList?.results || []
      }
    };
  } catch {
    return {
      props: {
        error: true
      }
    };
  }
};

export default Explore;
