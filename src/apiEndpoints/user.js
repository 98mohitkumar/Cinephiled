import { apiEndpoints } from "globals/constants";
import { getSession } from "next-auth/react";
import { fetchOptions } from "src/utils/helper";

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

export const getListItemStatus = async ({ listId, mediaType, mediaId, signal }) => {
  const {
    user: { accessToken }
  } = await getSession();

  const res = await fetch(
    "/api/getItemStatus",
    fetchOptions({
      token: accessToken,
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
    const data = await res.json();

    return data;
  } else {
    return {
      success: false
    };
  }
};

export const getCountryCode = async (ip) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const res = await fetch(apiEndpoints.user.getCountryCode(ip));

      if (res.ok && res.status === 200) {
        const data = await res.json();
        return data.country_code;
      }
    }
  } catch (error) {
    console.error("Error fetching country code:", error);
  }

  return "US";
};

// POST requests

export const setFavorite = async ({ mediaType, mediaId, favoriteState }) => {
  const {
    user: { accountId, accessToken }
  } = await getSession();

  if (accountId) {
    const favorite = await fetch(
      apiEndpoints.user.setFavorite({
        accountId: accountId
      }),
      fetchOptions({
        method: "POST",
        token: accessToken,
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
  }
};

export const addToWatchlist = async ({ mediaType, mediaId, watchlistState }) => {
  const {
    user: { accountId, accessToken }
  } = await getSession();

  if (accountId) {
    const watchlist = await fetch(
      apiEndpoints.user.addToWatchlist({
        accountId: accountId
      }),
      fetchOptions({
        method: "POST",
        token: accessToken,
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
  }
};

export const setRating = async ({ mediaType, mediaId, rating }) => {
  const {
    user: { accountId, accessToken }
  } = await getSession();

  if (accountId) {
    const rated = await fetch(
      apiEndpoints.user.setRating({
        mediaType,
        mediaId
      }),
      fetchOptions({
        method: "POST",
        token: accessToken,
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
  }
};

export const createList = async ({ listData }) => {
  const {
    user: { accessToken }
  } = await getSession();

  const res = await fetch(
    apiEndpoints.lists.createList,
    fetchOptions({
      method: "POST",
      body: listData,
      token: accessToken
    })
  );

  return {
    success: res.ok,
    response: res
  };
};

export const updateListItems = async ({ id, itemsData, method }) => {
  const {
    user: { accessToken }
  } = await getSession();

  const res = await fetch(
    apiEndpoints.lists.listItems({ id: id }),
    fetchOptions({
      method,
      body: itemsData,
      token: accessToken
    })
  );

  return {
    success: res.ok
  };
};

// PUT requests

export const updateList = async ({ id, listData }) => {
  const {
    user: { accessToken }
  } = await getSession();

  const res = await fetch(
    apiEndpoints.lists.updateList({ id: id }),
    fetchOptions({
      method: "PUT",
      body: listData,
      token: accessToken
    })
  );

  return {
    success: res.ok
  };
};

// DELETE requests

export const deleteRating = async ({ mediaType, mediaId }) => {
  const {
    user: { accountId, accessToken }
  } = await getSession();

  if (accountId) {
    const deleted = await fetch(
      apiEndpoints.user.deleteRating({
        mediaType,
        mediaId
      }),
      fetchOptions({
        method: "DELETE",
        token: accessToken
      })
    );

    if (deleted.ok) {
      return await deleted.json();
    } else {
      return {
        success: false
      };
    }
  }
};

export const deleteList = async ({ id }) => {
  const {
    user: { accessToken }
  } = await getSession();

  const res = await fetch(
    apiEndpoints.lists.updateList({ id: id }),
    fetchOptions({
      method: "DELETE",
      token: accessToken
    })
  );

  return {
    success: res.ok
  };
};
