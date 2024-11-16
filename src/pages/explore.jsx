import { Fragment } from "react";
import { getCountryCode } from "apiEndpoints/user";
import DominantColor from "components/DominantColor/DominantColor";
import Genres from "components/Explore/Genres";
import WatchProviders from "components/Explore/WatchProviders";
import { LayoutContainer } from "components/Layout/helpers";
import MetaWrapper from "components/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import H2 from "components/Typography/H2";
import { apiEndpoints } from "globals/constants";
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
          <LayoutContainer className='relative z-5 py-2440 pe-4'>
            <Genres movieGenres={movieGenres} tvGenres={tvGenres} />
          </LayoutContainer>

          <LayoutContainer className='relative z-5 py-4864'>
            <WatchProviders />
          </LayoutContainer>
        </section>

        {/* movies that are currently in theatres */}
        {nowPlaying.length > 0 ? (
          <LayoutContainer className='py-2440'>
            <H2 className='mb-2432 text-center text-white' weight='semiBold'>
              Movies playing in theaters
            </H2>
            <MediaTemplateGrid mediaType='movie' media={nowPlaying} />
          </LayoutContainer>
        ) : null}
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
