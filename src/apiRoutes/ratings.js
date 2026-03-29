import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { mediaAccountStatesQueryKey, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS } from "apiRoutes/user";
import { apiEndpoints } from "data/apiEndpoints";
import { useUserContext } from "Store/UserContext";
import { fetchOptions, matches } from "utils/helper";

/** TMDB account rated lists — matches `useInfiniteQuery` / profile UI. */
export const profileRatedInfiniteQueryKey = (accountId, listMediaType) => ["profile-rated", accountId, listMediaType];

/** Page-1 totals for tab labels (`total_results`). */
export const profileRatedCountQueryKey = (accountId, listMediaType) => ["profile-rated-count", accountId, listMediaType];

export const getRated = async ({ mediaType, pageQuery, accountId, token, signal }) => {
  const ratedRes = await fetch(
    apiEndpoints.user.getRated({ mediaType, accountId, pageQuery }),
    fetchOptions({
      token,
      signal
    })
  );

  if (ratedRes?.ok) {
    return ratedRes.json();
  }

  throw Error("cannot fetch data");
};

/**
 * Drops one id from the profile rated infinite-query cache without refetching, so scroll and loaded pages stay intact.
 */
export const removeRatedFromProfileInfiniteCache = (queryClient, accountId, mediaType, mediaId) => {
  const key = profileRatedInfiniteQueryKey(accountId, matches(mediaType, "movie") ? "movies" : "tv");
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

export const invalidateProfileRatedCountQueries = (queryClient, accountId) => {
  if (!accountId) {
    return;
  }
  queryClient.invalidateQueries({ queryKey: ["profile-rated-count", accountId] });
};

const ratedCountQueryOptions = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
  refetchOnWindowFocus: false
};

export const useProfileRatedMoviesCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileRatedCountQueryKey(accountId, "movies"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getRated({
        mediaType: "movies",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...ratedCountQueryOptions
  });
};

export const useProfileRatedTvCount = () => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => profileRatedCountQueryKey(accountId, "tv"), [accountId]);

  return useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      const data = await getRated({
        mediaType: "tv",
        pageQuery: 1,
        accountId,
        token: accessToken,
        signal
      });
      return typeof data?.total_results === "number" ? data.total_results : 0;
    },
    enabled: Boolean(accountId && accessToken),
    ...ratedCountQueryOptions
  });
};

export const useSetRating = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useUserContext();

  const mutation = useMutation({
    mutationFn: async ({ mediaType, mediaId, rating }) => {
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
        return rated.json();
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

      queryClient.invalidateQueries({
        queryKey: profileRatedInfiniteQueryKey(userInfo.accountId, matches(variables.mediaType, "movie") ? "movies" : "tv")
      });

      globalThis.setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: mediaAccountStatesQueryKey(variables.mediaType, variables.mediaId, userInfo.accountId)
        });
      }, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS);

      invalidateProfileRatedCountQueries(queryClient, userInfo.accountId);
    }
  });

  return {
    setRating: mutation.mutateAsync,
    isPending: mutation.isPending
  };
};

export const useDeleteRating = () => {
  const queryClient = useQueryClient();
  const { userInfo } = useUserContext();

  const mutation = useMutation({
    mutationFn: async ({ mediaType, mediaId }) => {
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
        return deleted.json();
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

      removeRatedFromProfileInfiniteCache(queryClient, userInfo.accountId, variables.mediaType, variables.mediaId);

      globalThis.setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: mediaAccountStatesQueryKey(variables.mediaType, variables.mediaId, userInfo.accountId)
        });
      }, MEDIA_ACCOUNT_STATES_INVALIDATE_DELAY_MS);

      invalidateProfileRatedCountQueries(queryClient, userInfo.accountId);
    }
  });

  return {
    deleteRating: mutation.mutateAsync,
    isPending: mutation.isPending
  };
};
