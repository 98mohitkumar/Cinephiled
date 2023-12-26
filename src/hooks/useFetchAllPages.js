import { getFavorites, getRated, getRecommendations, getWatchlist } from "api/user";
import { useState, useEffect, useCallback } from "react";
import { useUserContext } from "Store/UserContext";

const endpoints = {
  watchlist: getWatchlist,
  ratings: getRated,
  favorites: getFavorites,
  recommendations: getRecommendations
};

const useFetchAllPages = ({ endpoint, mediaType }) => {
  const { userInfo } = useUserContext();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchAllData = useCallback(async () => {
    try {
      const fetcher = endpoints[endpoint];
      if (!fetcher) throw new Error("Invalid endpoint");

      if (userInfo?.accountId && userInfo?.sessionId) {
        setLoading(true);
        const response = await fetcher({
          mediaType,
          pageQuery: page
        });

        const { total_pages, results } = response;

        if (results?.length > 0) {
          setMedia((prev) => prev.concat(results));
          setLoading(total_pages > page);
          setPage((prev) => (total_pages > prev ? prev + 1 : prev));
        } else {
          setLoading(false);
        }
      } else {
        setMedia([]);
        setLoading(false);
      }
    } catch {
      setMedia([]);
      setLoading(false);
    }
  }, [endpoint, mediaType, page, userInfo?.accountId, userInfo?.sessionId]);

  const revalidateAllPages = () => {
    setMedia([]);
    setPage(1);
  };

  const validateMedia = ({ state, id, media }) => {
    if (state === "removed") {
      // remove media
      setMedia((prev) => prev?.filter((item) => item?.id !== id));
    } else {
      // add media
      setMedia(media);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData, page]);

  return { media, validateMedia, revalidateAllPages, loading };
};

export default useFetchAllPages;
