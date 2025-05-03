import { useCallback } from "react";

import { apiEndpoints } from "data/apiEndpoints";
import { isProduction } from "data/global";
import { useUserContext } from "Store/UserContext";
import { fetchOptions } from "utils/helper";

// GET requsts

export const getWatchlist = async ({ mediaType, pageQuery, accountId, token, signal }) => {
  const watchlistRes = await fetch(
    apiEndpoints.user.getWatchlist({
      mediaType,
      accountId,
      pageQuery
    }),
    fetchOptions({
      token,
      signal
    })
  );

  if (watchlistRes?.ok) {
    const watchlist = await watchlistRes.json();
    return watchlist;
  } else {
    throw Error("cannot fetch data");
  }
};

export const getRated = async ({ mediaType, pageQuery, accountId, token, signal }) => {
  const ratedRes = await fetch(
    apiEndpoints.user.getRated({ mediaType, accountId, pageQuery }),
    fetchOptions({
      token,
      signal
    })
  );

  if (ratedRes?.ok) {
    const rated = await ratedRes.json();
    return rated;
  } else {
    throw Error("cannot fetch data");
  }
};

export const getFavorites = async ({ mediaType, pageQuery, accountId, token, signal }) => {
  const favoritesRes = await fetch(
    apiEndpoints.user.getFavorites({
      mediaType,
      accountId,
      pageQuery
    }),
    fetchOptions({
      token,
      signal
    })
  );

  if (favoritesRes?.ok) {
    const favoritesList = await favoritesRes.json();
    return favoritesList;
  } else {
    throw Error("cannot fetch data");
  }
};

export const getRecommendations = async ({ mediaType, pageQuery, accountId, token, signal }) => {
  const recommendationsRes = await fetch(
    apiEndpoints.user.getRecommendations({ mediaType, accountId, pageQuery }),
    fetchOptions({
      token,
      signal
    })
  );

  if (recommendationsRes?.ok) {
    const recommendations = await recommendationsRes.json();
    return recommendations;
  } else {
    throw Error("cannot fetch data");
  }
};

export const useGetListItemStatus = () => {
  const { userInfo } = useUserContext();

  const getListItemStatus = useCallback(
    async ({ signal, listId, mediaType, mediaId }) => {
      const res = await fetch(
        "/api/getItemStatus",
        fetchOptions({
          token: userInfo.accessToken,
          method: "POST",
          body: {
            id: listId,
            mediaType,
            mediaId
          },
          signal
        })
      );

      if (res.ok) {
        return await res.json();
      } else {
        return {
          success: false
        };
      }
    },
    [userInfo.accessToken]
  );

  return {
    getListItemStatus
  };
};

export const getCountryCode = async (ip) => {
  try {
    if (isProduction) {
      const res = await fetch(apiEndpoints.user.getCountryCode(ip));

      if (res.ok && res.status === 200) {
        const data = await res.json();
        return data.country_code;
      }
    }
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "US";
  }

  return "US";
};

// POST requests

export const useSetFavorite = () => {
  const { userInfo } = useUserContext();

  const setFavorite = async ({ mediaType, mediaId, favoriteState }) => {
    const favorite = await fetch(
      apiEndpoints.user.setFavorite({
        accountId: userInfo.accountId
      }),
      fetchOptions({
        method: "POST",
        token: userInfo.accessToken,
        body: {
          media_type: mediaType,
          media_id: mediaId,
          favorite: favoriteState
        }
      })
    );

    if (favorite.ok) {
      return await favorite.json();
    } else {
      return {
        success: false
      };
    }
  };

  return {
    setFavorite
  };
};

export const useAddToWatchlist = () => {
  const { userInfo } = useUserContext();

  const addToWatchlist = async ({ mediaType, mediaId, watchlistState }) => {
    const watchlist = await fetch(
      apiEndpoints.user.addToWatchlist({
        accountId: userInfo.accountId
      }),
      fetchOptions({
        method: "POST",
        token: userInfo.accessToken,
        body: {
          media_type: mediaType,
          media_id: mediaId,
          watchlist: watchlistState
        }
      })
    );

    if (watchlist.ok) {
      return await watchlist.json();
    } else {
      return {
        success: false
      };
    }
  };

  return { addToWatchlist };
};

export const useSetRating = () => {
  const { userInfo } = useUserContext();

  const setRating = async ({ mediaType, mediaId, rating }) => {
    const rated = await fetch(
      apiEndpoints.user.setRating({
        mediaType,
        mediaId
      }),
      fetchOptions({
        method: "POST",
        token: userInfo.accessToken,
        body: {
          value: rating
        }
      })
    );

    if (rated.ok) {
      return await rated.json();
    } else {
      return {
        success: false
      };
    }
  };

  return {
    setRating
  };
};

export const useSetEpisodeRating = () => {
  const { userInfo } = useUserContext();

  const setEpisodeRating = async ({ seriesId, seasonNumber, episodeNumber, rating }) => {
    const rated = await fetch(
      apiEndpoints.user.episodeRating({ seriesId, seasonNumber, episodeNumber }),
      fetchOptions({
        method: "POST",
        token: userInfo.accessToken,
        body: {
          value: rating
        }
      })
    );

    if (rated.ok) {
      return await rated.json();
    } else {
      return {
        success: false
      };
    }
  };

  return {
    setEpisodeRating
  };
};

export const useCreateList = () => {
  const { userInfo } = useUserContext();

  const createList = async ({ listData }) => {
    const res = await fetch(
      apiEndpoints.lists.createList,
      fetchOptions({
        method: "POST",
        body: listData,
        token: userInfo.accessToken
      })
    );

    return {
      success: res.ok,
      response: res
    };
  };

  return {
    createList
  };
};

export const useUpdateListItems = () => {
  const { userInfo } = useUserContext();

  const updateListItems = async ({ id, itemsData, method }) => {
    const res = await fetch(
      apiEndpoints.lists.listItems({ id: id }),
      fetchOptions({
        method,
        body: itemsData,
        token: userInfo.accessToken
      })
    );

    return {
      success: res.ok
    };
  };

  return {
    updateListItems
  };
};

// PUT requests

export const useUpdateList = () => {
  const { userInfo } = useUserContext();

  const updateList = async ({ id, listData }) => {
    const res = await fetch(
      apiEndpoints.lists.updateList({ id: id }),
      fetchOptions({
        method: "PUT",
        body: listData,
        token: userInfo.accessToken
      })
    );

    return {
      success: res.ok
    };
  };

  return {
    updateList
  };
};

// DELETE requests
export const useDeleteRating = () => {
  const { userInfo } = useUserContext();

  const deleteRating = async ({ mediaType, mediaId }) => {
    const deleted = await fetch(
      apiEndpoints.user.deleteRating({
        mediaType,
        mediaId
      }),
      fetchOptions({
        method: "DELETE",
        token: userInfo.accessToken
      })
    );

    if (deleted.ok) {
      return await deleted.json();
    } else {
      return {
        success: false
      };
    }
  };

  return {
    deleteRating
  };
};

export const useDeleteEpisodeRating = () => {
  const { userInfo } = useUserContext();

  const deleteEpisodeRating = async ({ seriesId, seasonNumber, episodeNumber }) => {
    const deleted = await fetch(
      apiEndpoints.user.episodeRating({ seriesId, seasonNumber, episodeNumber }),
      fetchOptions({
        method: "DELETE",
        token: userInfo.accessToken
      })
    );

    if (deleted.ok) {
      return await deleted.json();
    } else {
      return {
        success: false
      };
    }
  };

  return {
    deleteEpisodeRating
  };
};

export const useDeleteList = () => {
  const { userInfo } = useUserContext();

  const deleteList = async ({ id }) => {
    const res = await fetch(
      apiEndpoints.lists.updateList({ id: id }),
      fetchOptions({
        method: "DELETE",
        token: userInfo.accessToken
      })
    );

    return {
      success: res.ok
    };
  };

  return {
    deleteList
  };
};
