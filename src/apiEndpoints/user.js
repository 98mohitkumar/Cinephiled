import { useSession } from 'next-auth/react';
import { useCallback, useContext } from 'react';
import { apiEndpoints } from '../constants';
import { UserContext } from '../Store/UserContext';

export const useSetFavorite = () => {
  const { status, data } = useSession();
  const { userInfo } = useContext(UserContext);

  const setFavorite = useCallback(
    async ({ mediaType, mediaId, favoriteState }) => {
      if (status === 'authenticated' && userInfo?.id && data?.user?.sessionId) {
        const favorite = await fetch(
          apiEndpoints.user.setFavorite(userInfo.id, data.user.sessionId),
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=utf-8'
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
    },
    [data?.user?.sessionId, status, userInfo?.id]
  );

  return { setFavorite };
};

export const useAddToWatchlist = () => {
  const { status, data } = useSession();
  const { userInfo } = useContext(UserContext);

  const addToWatchlist = useCallback(
    async ({ mediaType, mediaId, watchlistState }) => {
      if (status === 'authenticated' && userInfo?.id && data?.user?.sessionId) {
        const watchlist = await fetch(
          apiEndpoints.user.addToWatchlist(userInfo.id, data.user.sessionId),
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=utf-8'
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
    },
    [data?.user?.sessionId, status, userInfo?.id]
  );

  return { addToWatchlist };
};

export const getFavorites = async (
  type,
  accountId,
  sessionId,
  pageQuery = 1
) => {
  const favoritesRes = await fetch(
    apiEndpoints.user.getFavorites(type, accountId, sessionId, pageQuery)
  );

  const favoritesList = await favoritesRes.json();
  return favoritesList;
};

export const getWatchlist = async (
  type,
  accountId,
  sessionId,
  pageQuery = 1
) => {
  const watchlistRes = await fetch(
    apiEndpoints.user.getWatchlist(type, accountId, sessionId, pageQuery)
  );

  const watchlist = await watchlistRes.json();
  return watchlist;
};

export const useSetRating = () => {
  const { status, data } = useSession();

  const setRating = useCallback(
    async ({ mediaType, mediaId, rating }) => {
      if (status === 'authenticated' && data?.user?.sessionId) {
        const favorite = await fetch(
          apiEndpoints.user.setRating(mediaType, mediaId, data.user.sessionId),
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
              value: rating
            })
          }
        );

        return await favorite.json();
      }
    },
    [data?.user?.sessionId, status]
  );

  return { setRating };
};

export const getRated = async (type, accountId, sessionId, pageQuery = 1) => {
  const ratedRes = await fetch(
    apiEndpoints.user.getRated(type, accountId, sessionId, pageQuery)
  );

  const rated = await ratedRes.json();
  return rated;
};

export const useDeleteRating = () => {
  const { status, data } = useSession();

  const deleteRating = useCallback(
    async ({ mediaType, mediaId }) => {
      if (status === 'authenticated' && data?.user?.sessionId) {
        const favorite = await fetch(
          apiEndpoints.user.deleteRating(
            mediaType,
            mediaId,
            data.user.sessionId
          ),
          {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json;charset=utf-8'
            }
          }
        );

        return await favorite.json();
      }
    },
    [data?.user?.sessionId, status]
  );

  return { deleteRating };
};

export const revalidationWrapper = (revalidate, delay = 1000) => {
  setTimeout(() => {
    revalidate();
  }, delay);
};

export const getRecommendations = async (type, accountId, pageQuery = 1) => {
  const read_access_token = process.env.NEXT_PUBLIC_READ_ACCESS_TOKEN;

  const res = await fetch(
    apiEndpoints.user.getRecommendations(type, accountId, pageQuery),
    {
      method: 'GET',
      headers: {
        authorization: `Bearer ${read_access_token}`
      }
    }
  ).then((data) => data.json());

  return res;
};
