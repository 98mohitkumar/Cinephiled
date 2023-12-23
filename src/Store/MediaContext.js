import useFetchAllPages from "hooks/useFetchAllPages";
import { createContext } from "react";

export const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const { media: moviesWatchlist, validateMedia: validateMoviesWatchlist } = useFetchAllPages({
    endpoint: "watchlist",
    mediaType: "movies"
  });

  const { media: tvShowsWatchlist, validateMedia: validateTvWatchlist } = useFetchAllPages({
    endpoint: "watchlist",
    mediaType: "tv"
  });

  const { media: favoriteMovies, validateMedia: validateFavoriteMovies } = useFetchAllPages({
    endpoint: "favorites",
    mediaType: "movies"
  });

  const { media: favoriteTvShows, validateMedia: validateFavoriteTvShows } = useFetchAllPages({
    endpoint: "favorites",
    mediaType: "tv"
  });

  const { media: ratedMovies, validateMedia: validateRatedMovies } = useFetchAllPages({
    endpoint: "ratings",
    mediaType: "movies"
  });

  const { media: ratedTvShows, validateMedia: validateRatedTvShows } = useFetchAllPages({
    endpoint: "ratings",
    mediaType: "tv"
  });

  const { media: movieRecommendations } = useFetchAllPages({
    endpoint: "recommendations",
    mediaType: "movie"
  });

  const { media: tvRecommendations } = useFetchAllPages({
    endpoint: "recommendations",
    mediaType: "tv"
  });

  return (
    <MediaContext.Provider
      value={{
        favoriteMovies,
        favoriteTvShows,
        moviesWatchlist,
        tvShowsWatchlist,
        ratedMovies,
        ratedTvShows,
        movieRecommendations,
        tvRecommendations,
        validateFavoriteMovies,
        validateFavoriteTvShows,
        validateMoviesWatchlist,
        validateTvWatchlist,
        validateRatedMovies,
        validateRatedTvShows
      }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
