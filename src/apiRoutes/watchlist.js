import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { mediaAccountStatesQueryKey, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS } from "apiRoutes/user";
import { apiEndpoints } from "data/apiEndpoints";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, matches } from "utils/helper";

/** TMDB account watchlist lists — matches `useInfiniteQuery` / profile UI. */
export const profileWatchlistInfiniteQueryKey = (accountId, listMediaType) => ["profile-watchlist", accountId, listMediaType];

/** Page-1 totals for tab labels (`total_results`). */
export const profileWatchlistCountQueryKey = (accountId, listMediaType) => ["profile-watchlist-count", accountId, listMediaType];

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
    return watchlistRes.json();
  }

  throw Error("cannot fetch data");
};

/**
 * Drops one id from the profile watchlist infinite-query cache without refetching, so scroll and loaded pages stay intact.
 */
export const removeWatchlistFromProfileInfiniteCache = (queryClient, accountId, mediaType, mediaId) => {
  const key = profileWatchlistInfiniteQueryKey(accountId, matches(mediaType, "movie") ? "movies" : "tv");
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

export const invalidateProfileWatchlistCountQueries = (queryClient, accountId) => {
  if (!accountId) {
    return;
  }
  queryClient.invalidateQueries({ queryKey: ["profile-watchlist-count", accountId] });
};

const watchlistCountQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false
};

export const useProfileWatchlistMoviesCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileWatchlistCountQueryKey(accountId, "movies"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getWatchlist({
        mediaType: "movies",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...watchlistCountQueryOptions
  });
};

export const useProfileWatchlistTvCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileWatchlistCountQueryKey(accountId, "tv"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getWatchlist({
        mediaType: "tv",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...watchlistCountQueryOptions
  });
};

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useUserContext();

  const mutation = useMutation({
    mutationFn: async ({ mediaType, mediaId, watchlistState }) => {
      const res = await fetch(
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

      if (res.ok) {
        return res.json();
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

      if (variables.watchlistState === false) {
        removeWatchlistFromProfileInfiniteCache(queryClient, userInfo.accountId, variables.mediaType, variables.mediaId);
      } else {
        queryClient.invalidateQueries({
          queryKey: profileWatchlistInfiniteQueryKey(userInfo.accountId, matches(variables.mediaType, "movie") ? "movies" : "tv")
        });
      }

      globalThis.setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: mediaAccountStatesQueryKey(variables.mediaType, variables.mediaId, userInfo.accountId)
        });
      }, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS);

      invalidateProfileWatchlistCountQueries(queryClient, userInfo.accountId);
    }
  });

  return {
    addToWatchlist: mutation.mutateAsync,
    isPending: mutation.isPending
  };
};
