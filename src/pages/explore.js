import Genres from "components/Explore/Genres";
import NowPlayingMovies from "components/Explore/NowPlayingMovies";
import StreamingProvides from "components/Explore/Providers";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { LayoutContainer, Error404 } from "styles/GlobalComponents";

const Explore = ({ movieGenres, tvGenres, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title={error ? "Not Found - Not Found - Cinephiled" : "Explore - Cinephiled"}
        description="Embark on a cinematic journey through diverse genres of movies and TV shows. Uncover the latest releases and discover what's currently captivating audiences in theaters near you."
        url='https://cinephiled.vercel.app/explore'
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* genres for movies and tv shows */}
          <LayoutContainer className='mb-auto'>
            <Genres movieGenres={movieGenres} tvGenres={tvGenres} />
          </LayoutContainer>

          <LayoutContainer className='mt-8'>
            <StreamingProvides />
          </LayoutContainer>

          {/* movies that are currently in theatres */}
          <NowPlayingMovies />
        </Fragment>
      )}
    </Fragment>
  );
};

Explore.getInitialProps = async () => {
  try {
    const genres = await Promise.all([
      fetch(apiEndpoints.movie.movieGenreList),
      fetch(apiEndpoints.tv.tvGenreList)
    ]);

    const error = genres.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch genres");

    const [movieGenresRes, tvGenresRes] = genres;
    const [movieGenresList, tvGenresList] = await Promise.all([
      movieGenresRes.json(),
      tvGenresRes.json()
    ]);

    return {
      movieGenres: movieGenresList?.genres || [],
      tvGenres: tvGenresList?.genres || []
    };
  } catch {
    return {
      error: true
    };
  }
};

export default Explore;
