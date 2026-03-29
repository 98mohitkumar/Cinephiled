import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { mediaAccountStatesQueryKey, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS } from "apiRoutes/user";
import { apiEndpoints } from "data/apiEndpoints";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, matches } from "utils/helper";

/** TMDB account favorite lists — matches `useInfiniteQuery` / profile UI. */
export const profileFavoritesInfiniteQueryKey = (accountId, listMediaType) => ["profile-favorites", accountId, listMediaType];

/** Page-1 totals for tab labels (`total_results`). */
export const profileFavoritesCountQueryKey = (accountId, listMediaType) => ["profile-favorites-count", accountId, listMediaType];

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
    return favoritesRes.json();
  }

  throw Error("cannot fetch data");
};

/**
 * Drops one id from the profile favorites infinite-query cache without refetching, so scroll and loaded pages stay intact.
 */
export const removeFavoriteFromProfileInfiniteCache = (queryClient, accountId, mediaType, mediaId) => {
  const key = profileFavoritesInfiniteQueryKey(accountId, matches(mediaType, "movie") ? "movies" : "tv");
  const idStr = String(mediaId);

  queryClient.setQueryData(key, (old) => {
    if (!old?.pages?.length) {
      return old;
    }

    let removedAny = false;
    const pages = old.pages.map((page) => {
      const results = page?.results ?? [];
      const nextResults = results.filter((item) => String(item.id) !== idStr);
      if (nextResults.length < results.length) {
        removedAny = true;
      }
      return { ...page, results: nextResults };
    });

    if (!removedAny) {
      return old;
    }

    return {
      ...old,
      pages: pages.map((page) => ({
        ...page,
        total_results: typeof page.total_results === "number" ? Math.max(0, page.total_results - 1) : page.total_results
      }))
    };
  });
};

export const invalidateProfileFavoritesCountQueries = (queryClient, accountId) => {
  if (!accountId) {
    return;
  }
  queryClient.invalidateQueries({ queryKey: ["profile-favorites-count", accountId] });
};

const favoritesCountQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false
};

export const useProfileFavoriteMoviesCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileFavoritesCountQueryKey(accountId, "movies"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getFavorites({
        mediaType: "movies",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...favoritesCountQueryOptions
  });
};

export const useProfileFavoriteTvCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileFavoritesCountQueryKey(accountId, "tv"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getFavorites({
        mediaType: "tv",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...favoritesCountQueryOptions
  });
};

export const useSetFavorite = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useUserContext();

  const mutation = useMutation({
    mutationFn: async ({ mediaType, mediaId, favoriteState }) => {
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
        return favorite.json();
      }

      return { success: false };
    },
    onSuccess: (data, variables) => {
      if (data?.success === false) {
        return;
      }
      if (!userInfo?.accountId) {
        return;
      }

      if (variables.favoriteState === false) {
        removeFavoriteFromProfileInfiniteCache(queryClient, userInfo.accountId, variables.mediaType, variables.mediaId);
      } else {
        queryClient.invalidateQueries({
          queryKey: profileFavoritesInfiniteQueryKey(userInfo.accountId, matches(variables.mediaType, "movie") ? "movies" : "tv")
        });
      }

      globalThis.setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: mediaAccountStatesQueryKey(variables.mediaType, variables.mediaId, userInfo.accountId)
        });
      }, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS);

      invalidateProfileFavoritesCountQueries(queryClient, userInfo.accountId);
    }
  });

  return {
    setFavorite: mutation.mutateAsync,
    isPending: mutation.isPending
  };
};
