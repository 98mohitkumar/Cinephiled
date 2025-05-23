import { Fragment } from "react";

import { getCountryCode } from "apiRoutes/user";
import GenresCarousel from "components/pages/Explore/GenresCarousel";
import WatchProvidersCard from "components/pages/Explore/WatchProvidersCard";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import { apiEndpoints } from "data/apiEndpoints";
import { ROUTES, siteInfo } from "data/global";
import { fetchOptions, removeDuplicates } from "utils/helper";

const Explore = ({ movieGenres, tvGenres, nowPlaying }) => {
  const { cleanedItems: nowPlayingMovies } = removeDuplicates(nowPlaying);

  return (
    <Fragment>
      <MetaWrapper
        title='Explore - Cinephiled'
        description="Embark on a cinematic journey through diverse genres of movies and TV shows. Uncover the latest releases and discover what's currently captivating audiences in theaters near you."
        url={`${siteInfo.url}/${ROUTES.explore}`}
      />

      <Fragment>
        <section className='relative'>
          <DominantColor tint />

          {/* genres for movies and tv shows */}
          <LayoutContainer className='relative z-5 py-2440 pe-0'>
            <GenresCarousel movieGenres={movieGenres} tvGenres={tvGenres} />
          </LayoutContainer>

          <LayoutContainer className='relative z-5 py-4864'>
            <WatchProvidersCard />
          </LayoutContainer>
        </section>

        {/* movies that are currently in theatres */}
        {nowPlaying.length > 0 ? (
          <LayoutContainer className='py-2440'>
            <H2 className='mb-2432 text-center text-white'>Movies playing in theaters</H2>
            <MediaTemplateGrid media={nowPlayingMovies} mediaType='movie' />
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
