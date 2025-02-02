import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { getFavorites, getRated, getRecommendations, getWatchlist } from "apiRoutes/user";

import { useUserContext } from "./UserContext";

const defaultState = {
  favoriteMovies: [],
  favoriteTvShows: [],
  moviesWatchlist: [],
  tvShowsWatchlist: [],
  ratedMovies: [],
  ratedTvShows: [],
  movieRecommendations: [],
  tvRecommendations: [],
  isLoading: false
};

const MediaContext = createContext({
  ...defaultState,
  renderKey: "media",
  validateMedia: () => {}
});

const fetchFunctions = {
  watchlist: getWatchlist,
  ratings: getRated,
  favorites: getFavorites,
  recommendations: getRecommendations
};

const allEndpoints = [
  { key: "favoriteMovies", endpoint: "favorites", mediaType: "movies" },
  { key: "favoriteTvShows", endpoint: "favorites", mediaType: "tv" },
  { key: "moviesWatchlist", endpoint: "watchlist", mediaType: "movies" },
  { key: "tvShowsWatchlist", endpoint: "watchlist", mediaType: "tv" },
  { key: "ratedMovies", endpoint: "ratings", mediaType: "movies" },
  { key: "ratedTvShows", endpoint: "ratings", mediaType: "tv" },
  { key: "movieRecommendations", endpoint: "recommendations", mediaType: "movie", maxPages: 5 },
  { key: "tvRecommendations", endpoint: "recommendations", mediaType: "tv", maxPages: 5 }
];

export const useMediaContext = () => {
  const context = useContext(MediaContext);

  if (context === undefined) {
    throw new Error("useMediaContext must be used within MediaContextProvider");
  }

  return context;
};

const MediaContextProvider = ({ children }) => {
  const { userInfo } = useUserContext();
  const [state, setState] = useState(defaultState);
  const [renderKey, setRenderKey] = useState("media");

  const fetchData = useCallback(
    async ({ endpoint, mediaType, key, currentPage = 1, maxPages, signal }) => {
      try {
        const abortController = new AbortController();
        const fetcher = fetchFunctions[endpoint];
        if (!fetcher) throw new Error("Invalid endpoint");

        const response = await fetcher({
          mediaType: mediaType,
          pageQuery: currentPage,
          accountId: userInfo?.accountId,
          token: userInfo?.accessToken,
          signal: signal || abortController.signal
        });

        const { total_pages, results } = response;

        if (results?.length > 0) {
          setState((prev) => ({ ...prev, [key]: prev[key].concat(results) }));

          if (total_pages > currentPage) {
            // fetch next page
            fetchData({ endpoint, mediaType, key, currentPage: currentPage + 1, maxPages });
          }
        }
      } catch {
        setState(defaultState);
      }
    },
    [setState, userInfo?.accessToken, userInfo?.accountId]
  );

  useEffect(() => {
    const abortController = new AbortController();

    if (userInfo?.accountId) {
      setState((prev) => ({ ...prev, isLoading: true }));

      const fetchPromises = allEndpoints.map((media) => fetchData({ ...media, signal: abortController.signal }));

      Promise.all(fetchPromises)
        .then(() => {
          setState((prev) => ({ ...prev, isLoading: false }));
        })
        .catch(() => {
          setState(defaultState);
        });
    }

    return () => {
      setState(defaultState);
      abortController.abort("unmounted");
    };
  }, [fetchData, userInfo?.accountId]);

  const validateMedia = useCallback(({ state, id, key, media }) => {
    if (state === "removed") {
      // remove media
      setState((prev) => ({
        ...prev,
        [key]: prev[key]?.filter((item) => item?.id !== id)
      }));

      setRenderKey(`${key}-${id}-${Math.random()}`);
    } else {
      // add media
      setState((prev) => ({ ...prev, [key]: media }));
    }
  }, []);

  return <MediaContext.Provider value={{ ...state, renderKey, validateMedia }}>{children}</MediaContext.Provider>;
};

export default MediaContextProvider;
