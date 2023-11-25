/* eslint-disable no-undef */
import { ExploreContainer } from "components/Explore/ExploreStyles";
import Genres from "components/Explore/Genres";
import NowPlayingMovies from "components/Explore/NowPlayingMovies";
import MetaWrapper from "components/MetaWrapper";
import { apiEndpoints } from "globals/constants";
import { Fragment } from "react";
import { Error404 } from "styles/GlobalComponents";

const Explore = ({ movieGenres, tvGenres, error }) => {
  return (
    <Fragment>
      <MetaWrapper
        title='Cinephiled - Explore'
        description="Explore different genres of movies and tv shows. Find out what's playing in theatres near you."
        url='https://cinephiled.vercel.app/explore'
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          {/* genres for movies and tv shows */}
          <ExploreContainer className='mb-auto'>
            <Genres movieGenres={movieGenres} tvGenres={tvGenres} />
          </ExploreContainer>

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

    if (!genres[0].ok || !genres[1].ok) throw new Error("Failed to fetch genres");
    const combinedGenresList = await Promise.all(genres.map((res) => res.json()));

    return {
      movieGenres: combinedGenresList[0]?.genres,
      tvGenres: combinedGenresList[1]?.genres
    };
  } catch {
    return {
      error: true
    };
  }
};

export default Explore;
