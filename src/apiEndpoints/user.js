import { apiEndpoints } from "globals/constants";
import { getSession } from "next-auth/react";

export const setFavorite = async ({ mediaType, mediaId, favoriteState }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

  if (accountId && sessionId) {
    const favorite = await fetch(
      apiEndpoints.user.setFavorite({
        accountId: accountId,
        sessionId: sessionId
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
    user: { accountId, sessionId }
  } = await getSession();

  if (accountId && sessionId) {
    const watchlist = await fetch(
      apiEndpoints.user.addToWatchlist({
        accountId: accountId,
        sessionId: sessionId
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

    if (watchlist.ok) {
      return await watchlist.json();
    } else {
      return {
        success: false
      };
    }
  }
};

export const getFavorites = async ({ mediaType, pageQuery }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

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

export const getWatchlist = async ({ mediaType, pageQuery }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

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

export const setRating = async ({ mediaType, mediaId, rating }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

  if (accountId && sessionId) {
    const rated = await fetch(
      apiEndpoints.user.setRating({
        mediaType,
        mediaId,
        sessionId
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

    if (rated.ok) {
      return await rated.json();
    } else {
      return {
        success: false
      };
    }
  }
};

export const getRated = async ({ mediaType, pageQuery }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

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

export const deleteRating = async ({ mediaType, mediaId }) => {
  const {
    user: { accountId, sessionId }
  } = await getSession();

  if (accountId && sessionId) {
    const deleted = await fetch(
      apiEndpoints.user.deleteRating({
        mediaType,
        mediaId,
        sessionId
      }),
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json;charset=utf-8"
        }
      }
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

export const getRecommendations = async ({ mediaType, pageQuery }) => {
  const {
    user: { accessToken, accountId }
  } = await getSession();

  const recommendationsRes = await fetch(
    apiEndpoints.user.getRecommendations({ mediaType, accountId, pageQuery }),
    {
      method: "GET",
      headers: {
        "content-type": "application/json;charset=utf-8",
        authorization: `Bearer ${accessToken}`
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
