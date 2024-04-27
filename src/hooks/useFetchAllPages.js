import { getFavorites, getRated, getRecommendations, getWatchlist } from "api/user";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const pageRef = useRef(1);

  const fetchAllData = useCallback(async () => {
    try {
      const fetcher = endpoints[endpoint];
      if (!fetcher) throw new Error("Invalid endpoint");

      const response = await fetcher({
        mediaType,
        pageQuery: pageRef.current,
        accountId: userInfo?.accountId,
        token: userInfo?.accessToken
      });

      const { total_pages, results } = response;

      if (results?.length > 0) {
        setMedia((prev) => prev.concat(results));
        setLoading(total_pages > pageRef.current);
        if (total_pages > pageRef.current) {
          // increment page
          pageRef.current += 1;

          // fetch next page
          fetchAllData();
        }
      } else {
        setLoading(false);
      }
    } catch {
      setMedia([]);
      setLoading(false);
    }
  }, [endpoint, mediaType, userInfo?.accessToken, userInfo?.accountId]);

  useEffect(() => {
    if (userInfo?.accountId) {
      setLoading(true);
      fetchAllData();
    }

    return () => {
      setMedia([]);
      pageRef.current = 1;
    };
  }, [fetchAllData, userInfo?.accountId]);

  const revalidateAllPages = () => {
    setMedia([]);
    pageRef.current = 1;
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

  return { media, validateMedia, revalidateAllPages, loading };
};

export default useFetchAllPages;
