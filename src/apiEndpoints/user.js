import { apiEndpoints } from "globals/constants";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "Store/UserContext";

export const useSetFavorite = () => {
  const { status, data } = useSession();
  const { userInfo } = useContext(UserContext);

  const setFavorite = async ({ mediaType, mediaId, favoriteState }) => {
    if (status === "authenticated" && userInfo?.id && data?.user?.sessionId) {
      const favorite = await fetch(
        apiEndpoints.user.setFavorite({
          accountId: userInfo.id,
          sessionId: data.user.sessionId
        }),
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            favorite: favoriteState
          })
        }
      );

      return await favorite.json();
    }
  };

  return { setFavorite };
};

export const useAddToWatchlist = () => {
  const { status, data } = useSession();
  const { userInfo } = useContext(UserContext);

  const addToWatchlist = async ({ mediaType, mediaId, watchlistState }) => {
    if (status === "authenticated" && userInfo?.id && data?.user?.sessionId) {
      const watchlist = await fetch(
        apiEndpoints.user.addToWatchlist({
          accountId: userInfo.id,
          sessionId: data.user.sessionId
        }),
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            watchlist: watchlistState
          })
        }
      );

      return await watchlist.json();
    }
  };

  return { addToWatchlist };
};

export const getFavorites = async ({ mediaType, accountId, sessionId, pageQuery }) => {
  const favoritesRes = await fetch(
    apiEndpoints.user.getFavorites({
      mediaType,
      accountId,
      sessionId,
      pageQuery
    })
  );

  if (favoritesRes?.ok) {
    const favoritesList = await favoritesRes.json();
    return favoritesList;
  } else {
    throw Error("cannot fetch data");
  }
};

export const getWatchlist = async ({ mediaType, accountId, sessionId, pageQuery }) => {
  const watchlistRes = await fetch(
    apiEndpoints.user.getWatchlist({
      mediaType,
      accountId,
      sessionId,
      pageQuery
    })
  );

  if (watchlistRes?.ok) {
    const watchlist = await watchlistRes.json();
    return watchlist;
  } else {
    throw Error("cannot fetch data");
  }
};

export const useSetRating = () => {
  const { status, data } = useSession();

  const setRating = async ({ mediaType, mediaId, rating }) => {
    if (status === "authenticated" && data?.user?.sessionId) {
      const favorite = await fetch(
        apiEndpoints.user.setRating({
          mediaType,
          mediaId,
          sessionId: data.user.sessionId
        }),
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=utf-8"
          },
          body: JSON.stringify({
            value: rating
          })
        }
      );

      return await favorite.json();
    }
  };

  return { setRating };
};

export const getRated = async ({ mediaType, accountId, sessionId, pageQuery }) => {
  const ratedRes = await fetch(
    apiEndpoints.user.getRated({ mediaType, accountId, sessionId, pageQuery })
  );

  if (ratedRes?.ok) {
    const rated = await ratedRes.json();
    return rated;
  } else {
    throw Error("cannot fetch data");
  }
};

export const useDeleteRating = () => {
  const { status, data } = useSession();

  const deleteRating = async ({ mediaType, mediaId }) => {
    if (status === "authenticated" && data?.user?.sessionId) {
      const favorite = await fetch(
        apiEndpoints.user.deleteRating({
          mediaType,
          mediaId,
          sessionId: data.user.sessionId
        }),
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json;charset=utf-8"
          }
        }
      );

      return await favorite.json();
    }
  };

  return { deleteRating };
};

export const revalidationWrapper = (revalidate, delay = 1000) => {
  setTimeout(() => {
    revalidate();
  }, delay);
};

export const getRecommendations = async ({ mediaType, accountId, pageQuery }) => {
  const read_access_token = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;

  const recommendationsRes = await fetch(
    apiEndpoints.user.getRecommendations({ mediaType, accountId, pageQuery }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=utf-8",
        authorization: `Bearer ${read_access_token}`
      }
    }
  );

  if (recommendationsRes?.ok) {
    const recommendations = await recommendationsRes.json();
    return recommendations;
  } else {
    throw Error("cannot fetch data");
  }
};
