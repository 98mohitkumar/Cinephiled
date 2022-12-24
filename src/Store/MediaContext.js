import {
  getWatchlist,
  getFavorites,
  getRated,
  getRecommendations
} from 'api/user';
import { useSession } from 'next-auth/react';
import {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback
} from 'react';
import { UserContext } from './UserContext';

export const MediaContext = createContext();

const MediaContextProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [moviesWatchlist, setMoviesWatchlist] = useState([]);
  const [favoriteTvShows, setFavoriteTvShows] = useState([]);
  const [tvShowsWatchlist, setTvShowsWatchlist] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [ratedTvShows, setRatedTvShows] = useState([]);
  const [movieRecommendations, setMovieRecommendations] = useState([]);
  const [tvRecommendations, setTvRecommendations] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { data } = useSession();

  const pagesRef = useRef({
    favoriteMoviesCurrentPage: 1,
    favoriteTvShowsCurrentPage: 1,
    moviesWatchlistCurrentPage: 1,
    tvShowsWatchlistCurrentPage: 1,
    ratedMoviesCurrentPage: 1,
    ratedTvShowsCurrentPage: 1
  });

  const logoutHelper = useCallback(() => {
    setFavoriteMovies([]);
    setFavoriteTvShows([]);

    setMoviesWatchlist([]);
    setTvShowsWatchlist([]);

    setRatedMovies([]);
    setRatedTvShows([]);

    setMovieRecommendations([]);
    setTvRecommendations([]);

    pagesRef.current = {
      favoriteMoviesCurrentPage: 1,
      favoriteTvShowsCurrentPage: 1,
      moviesWatchlistCurrentPage: 1,
      tvShowsWatchlistCurrentPage: 1,
      ratedMoviesCurrentPage: 1,
      ratedTvShowsCurrentPage: 1
    };
  }, []);

  const revalidateFavorites = useCallback((key) => {
    if (key === 'favoriteMovies') {
      setFavoriteMovies([]);
    } else {
      setFavoriteTvShows([]);
    }
  }, []);

  const revalidateWatchlist = useCallback((key) => {
    if (key === 'moviesWatchlist') {
      setMoviesWatchlist([]);
    } else {
      setTvShowsWatchlist([]);
    }
  }, []);

  const revalidateRated = useCallback((key) => {
    if (key === 'movie') {
      setRatedMovies([]);
    } else {
      setRatedTvShows([]);
    }
  }, []);

  useEffect(() => {
    if (favoriteMovies?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        favoriteMoviesCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      favoriteMovies?.length ===
        (pagesRef.current.favoriteMoviesCurrentPage - 1) * 20
    ) {
      getFavorites({
        mediaType: 'movies',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.favoriteMoviesCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.favoriteMoviesCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              favoriteMoviesCurrentPage: data.page + 1
            };

            setFavoriteMovies((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setFavoriteMovies((prev) => prev));
    }
  }, [data?.user?.sessionId, favoriteMovies, userInfo?.id]);

  useEffect(() => {
    if (favoriteTvShows?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        favoriteTvShowsCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      favoriteTvShows?.length ===
        (pagesRef.current.favoriteTvShowsCurrentPage - 1) * 20
    ) {
      getFavorites({
        mediaType: 'tv',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.favoriteTvShowsCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.favoriteTvShowsCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              favoriteTvShowsCurrentPage: data.page + 1
            };

            setFavoriteTvShows((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setFavoriteTvShows((prev) => prev));
    }
  }, [data?.user?.sessionId, favoriteTvShows, userInfo?.id]);

  useEffect(() => {
    if (moviesWatchlist?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        moviesWatchlistCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      moviesWatchlist?.length ===
        (pagesRef.current.moviesWatchlistCurrentPage - 1) * 20
    ) {
      getWatchlist({
        mediaType: 'movies',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.moviesWatchlistCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.moviesWatchlistCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              moviesWatchlistCurrentPage: data.page + 1
            };

            setMoviesWatchlist((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setMoviesWatchlist((prev) => prev));
    }
  }, [data?.user?.sessionId, moviesWatchlist, userInfo?.id]);

  useEffect(() => {
    if (tvShowsWatchlist?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        tvShowsWatchlistCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      tvShowsWatchlist?.length ===
        (pagesRef.current.tvShowsWatchlistCurrentPage - 1) * 20
    ) {
      getWatchlist({
        mediaType: 'tv',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.tvShowsWatchlistCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.tvShowsWatchlistCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              tvShowsWatchlistCurrentPage: data.page + 1
            };

            setTvShowsWatchlist((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setTvShowsWatchlist((prev) => prev));
    }
  }, [data?.user?.sessionId, tvShowsWatchlist, userInfo?.id]);

  useEffect(() => {
    if (ratedMovies?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        ratedMoviesCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      ratedMovies?.length === (pagesRef.current.ratedMoviesCurrentPage - 1) * 20
    ) {
      getRated({
        mediaType: 'movies',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.ratedMoviesCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.ratedMoviesCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              ratedMoviesCurrentPage: data.page + 1
            };

            setRatedMovies((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setRatedMovies((prev) => prev));
    }
  }, [data?.user?.sessionId, ratedMovies, userInfo?.id]);

  useEffect(() => {
    if (ratedTvShows?.length === 0) {
      pagesRef.current = {
        ...pagesRef.current,
        ratedTvShowsCurrentPage: 1
      };
    }

    if (
      userInfo?.id &&
      data?.user?.sessionId &&
      ratedTvShows?.length ===
        (pagesRef.current.ratedTvShowsCurrentPage - 1) * 20
    ) {
      getRated({
        mediaType: 'tv',
        accountId: userInfo?.id,
        sessionId: data?.user?.sessionId,
        pageQuery: pagesRef.current.ratedTvShowsCurrentPage
      })
        .then((data) => {
          if (
            data?.results?.length > 0 &&
            pagesRef.current.ratedTvShowsCurrentPage === data?.page
          ) {
            pagesRef.current = {
              ...pagesRef.current,
              ratedTvShowsCurrentPage: data.page + 1
            };

            setRatedTvShows((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setRatedTvShows((prev) => prev));
    }
  }, [data?.user?.sessionId, ratedTvShows, userInfo?.id]);

  useEffect(() => {
    if (userInfo?.id && data?.user?.sessionId) {
      getRecommendations({
        mediaType: 'movie',
        accountId: userInfo?.id,
        pageQuery: 1
      })
        .then((data) => {
          if (data?.results?.length > 0) {
            setMovieRecommendations((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setMovieRecommendations((prev) => prev));
    }
  }, [data?.user?.sessionId, userInfo?.id]);

  useEffect(() => {
    if (userInfo?.id && data?.user?.sessionId) {
      getRecommendations({
        mediaType: 'tv',
        accountId: userInfo?.id,
        pageQuery: 1
      })
        .then((data) => {
          if (data?.results?.length > 0) {
            setTvRecommendations((prev) => prev.concat(data?.results ?? []));
          }
        })
        .catch(() => setTvRecommendations((prev) => prev));
    }
  }, [data?.user?.sessionId, userInfo?.id]);

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
        revalidateFavorites,
        revalidateWatchlist,
        revalidateRated,
        logoutHelper
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaContextProvider;
