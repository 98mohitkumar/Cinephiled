import { useInfiniteQuery as useTanStackInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useUserContext } from "Store/UserContext";
import { fetchOptions } from "utils/helper";

/**
 * Same outward API as useInfiniteQuery, backed by TanStack useInfiniteQuery.
 * - Fetches the first client page (initialPageParam, e.g. page 2) on mount; further pages via scroll + fetchNextPage.
 * - Cached per queryKey so revisiting a route can reuse data (staleTime / gcTime).
 *
 * Optional `queryKey` — pass a stable, memoized key when the feed identity is not fully captured
 * by router.asPath (e.g. client-only search state). Defaults to ['infinite-scroll', router.asPath].
 */
export const useInfiniteQuery = ({
  initialPage,
  useUserToken = false,
  getEndpoint,
  queryKey: queryKeyProp,
  staleTime = 1000 * 60 * 5,
  gcTime = 1000 * 60 * 15,
  enabled = true,
  maxPages = 9999
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    userInfo: { accessToken }
  } = useUserContext();

  const queryKey = useMemo(() => queryKeyProp || ["infinite-scroll", router.asPath], [queryKeyProp, router.asPath]);

  const infiniteQuery = useTanStackInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam, signal }) => {
      const res = await fetch(getEndpoint({ page: pageParam }), fetchOptions({ token: useUserToken ? accessToken : null, signal }));

      if (!res.ok) {
        throw new Error("Cannot fetch data");
      }

      return res.json();
    },
    initialPageParam: initialPage,
    /**
     * TMDB: stop when a page has no results or we're on the last page.
     * Do not treat missing lastPage here — TanStack only calls this after a successful page fetch.
     */
    getNextPageParam: (lastPage) => {
      if (!lastPage?.results?.length) {
        return undefined;
      }
      if (lastPage.page >= lastPage.total_pages || lastPage.page >= maxPages) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    staleTime,
    gcTime,
    refetchOnWindowFocus: false,
    enabled
  });

  const { fetchNextPage, hasNextPage, isFetching, data } = infiniteQuery;

  const list = useMemo(() => data?.pages?.flatMap((p) => p.results || []) || [], [data?.pages]);

  const fetchTimeOut = useRef(null);

  const resetQueryState = useCallback(() => {
    queryClient.removeQueries({ queryKey });
  }, [queryClient, queryKey]);

  const handleScroll = useCallback(() => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 700;
    if (!nearBottom || isFetching) {
      return;
    }
    if (hasNextPage === false) {
      return;
    }

    clearTimeout(fetchTimeOut.current);

    fetchTimeOut.current = setTimeout(() => {
      fetchNextPage().catch((err) => {
        console.error(err?.message || err);
      });
    }, 100);
  }, [fetchNextPage, hasNextPage, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fetchTimeOut.current);
    };
  }, [handleScroll]);

  return { list, resetQueryState, isLoading: isFetching };
};

export default useInfiniteQuery;
