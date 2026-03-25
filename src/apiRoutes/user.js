import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

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

export const fetchListItemStatus = async ({ token, listId, mediaId, mediaType, signal }) => {
  const res = await fetch(
    apiEndpoints.lists.listItemStatus({ listId, mediaType, mediaId }),
    fetchOptions({
      token,
      method: "GET",
      signal
    })
  );

  if (res.ok) {
    return await res.json();
  }

  return { success: false };
};

export const listItemStatusQueryKey = (listId, mediaId, mediaType) => ["listItemStatus", String(listId), String(mediaId), mediaType];

export const useListItemStatusQuery = ({ listId, mediaId, mediaType }) => {
  const { userInfo } = useUserContext();

  return useQuery({
    queryKey: listItemStatusQueryKey(listId, mediaId, mediaType),
    queryFn: ({ signal }) =>
      fetchListItemStatus({
        token: userInfo.accessToken,
        listId,
        mediaId,
        mediaType,
        signal
      }),
    enabled: Boolean(listId != null && mediaId != null && mediaType && userInfo?.accessToken),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });
};

export const getCountryCode = async (ip) => {
  try {
    if (isProduction) {
      const res = await fetch(apiEndpoints.user.getCountryCode(ip));

      if (res.ok && res.status === 200) {
        const { data } = await res.json();
        return data?.countryCode;
      }
    }
  } catch (error) {
    console.error("Error fetching country code:", error);
    return "US";
  }

  return "US";
};

/**
 * TMDB paginated reviews: { id, page, results, total_pages, total_results }
 * @param {"movie" | "tv"} mediaType
 */
export const fetchMediaReviews = async ({ mediaType, mediaId, pageQuery, signal }) => {
  const id = String(mediaId);
  const endpoint = mediaType === "movie" ? apiEndpoints.movie.movieReviews({ id, pageQuery }) : apiEndpoints.tv.tvReviews({ id, pageQuery });

  const response = await fetch(endpoint, fetchOptions({ signal }));

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

/**
 * Paginated media reviews (TMDB). Uses SSR `initialReviews` for page 1 to avoid duplicate fetch on mount.
 * @param {{ mediaType: "movie" | "tv"; mediaId: string | number; page: number; initialReviews?: object | null }} params
 */
export const useMediaReviewsQuery = ({ mediaType, mediaId, page, initialReviews }) => {
  return useQuery({
    queryKey: ["mediaReviews", mediaType, String(mediaId), page],
    queryFn: ({ signal }) => fetchMediaReviews({ mediaType, mediaId, pageQuery: page, signal }),
    initialData: page === 1 && initialReviews ? initialReviews : undefined,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(mediaId) && (mediaType === "movie" || mediaType === "tv")
  });
};

/** Query key for TMDB v4 account lists (see `useAccountListsInfiniteQuery` and list mutations’ `onSettled`). */
export const accountListsQueryKey = (accountId) => ["accountLists", String(accountId || "")];

export const fetchAccountLists = async ({ accountId, pageQuery, token, signal }) => {
  const res = await fetch(apiEndpoints.lists.getLists({ accountId, pageQuery }), fetchOptions({ token, signal }));

  if (!res.ok) {
    throw new Error("Cannot fetch lists");
  }

  return res.json();
};

/**
 * Paginated TMDB v4 account lists. Enable only when needed (e.g. add-to-list modal open) to avoid loading on app init.
 */
export const useAccountListsInfiniteQuery = ({ enabled = true } = {}) => {
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  return useInfiniteQuery({
    queryKey: accountListsQueryKey(accountId),
    queryFn: ({ pageParam, signal }) => fetchAccountLists({ accountId, pageQuery: pageParam, token: accessToken, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.results?.length) {
        return undefined;
      }
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    enabled: Boolean(enabled && accountId && accessToken),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false
  });
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ listData }) => {
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
    },
    onSuccess: (data) => {
      if (data?.success && userInfo?.accountId) {
        queryClient.invalidateQueries({ queryKey: accountListsQueryKey(userInfo.accountId) });
      }
    }
  });

  return {
    createList: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset
  };
};

/** TanStack infinite-query key for list detail pages (`useInfiniteQuery` + paginated list items). */
export const listDetailsItemsInfiniteQueryKey = (listId) => ["listDetailsItems", String(listId || "")];

export const useUpdateListItems = () => {
  const { userInfo } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, itemsData, method }) => {
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
    },
    onSuccess: (data, variables) => {
      if (data.success && variables?.id != null) {
        queryClient.invalidateQueries({ queryKey: listDetailsItemsInfiniteQueryKey(variables.id) });
      }
    }
  });

  return {
    updateListItems: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset
  };
};

// PUT requests

export const useUpdateList = () => {
  const { userInfo } = useUserContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, listData }) => {
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
    },
    onSuccess: (data) => {
      if (data?.success && userInfo?.accountId) {
        queryClient.invalidateQueries({ queryKey: accountListsQueryKey(userInfo.accountId) });
      }
    }
  });

  return {
    updateList: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id }) => {
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
    },
    onSuccess: (data, variables) => {
      if (!data?.success) {
        return;
      }
      if (userInfo?.accountId) {
        queryClient.invalidateQueries({ queryKey: accountListsQueryKey(userInfo.accountId) });
      }
      if (variables?.id != null) {
        queryClient.invalidateQueries({ queryKey: listDetailsItemsInfiniteQueryKey(variables.id) });
      }
    }
  });

  return {
    deleteList: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset
  };
};
