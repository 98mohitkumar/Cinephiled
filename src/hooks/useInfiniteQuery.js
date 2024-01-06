import { apiEndpoints } from "globals/constants";
import { useMemo, useEffect, useState, useRef } from "react";
import { fetchOptions } from "src/utils/helper";
import { useUserContext } from "Store/UserContext";

const useInfiniteQuery = ({
  initialPage,
  type,
  listId = null,
  genreId = null,
  searchQuery = null,
  networkId = null,
  providerId = null,
  region = null,
  listOrder = null,
  useUserToken = false
}) => {
  const [pageToFetch, setPageToFetch] = useState(initialPage);
  const [extendedList, setExtendedList] = useState([]);
  const [isEmptyPage, setIsEmptyPage] = useState(false);
  const {
    userInfo: { accountId, accessToken }
  } = useUserContext();

  const fetchTimeOut = useRef(null);

  const endpoint = useMemo(
    () => ({
      movieGenre: apiEndpoints.movie.movieGenre({
        genreId,
        pageQuery: pageToFetch
      }),
      tvGenre: apiEndpoints.tv.tvGenre({ genreId, pageQuery: pageToFetch }),
      movieSearch: apiEndpoints.search.movieSearch({
        query: searchQuery,
        pageQuery: pageToFetch
      }),
      tvSearch: apiEndpoints.search.tvSearch({
        query: searchQuery,
        pageQuery: pageToFetch
      }),
      keywordSearch: apiEndpoints.search.keywordSearch({
        query: searchQuery,
        pageQuery: pageToFetch
      }),
      networkMedia: apiEndpoints.network.networkMedia({ id: networkId, pageQuery: pageToFetch }),
      providerMovies: apiEndpoints.watchProviders.watchProviderMovies({
        providerId,
        region,
        pageQuery: pageToFetch
      }),
      providerTv: apiEndpoints.watchProviders.watchProviderTv({
        providerId,
        region,
        pageQuery: pageToFetch
      }),
      lists: apiEndpoints.lists.getLists({ accountId, pageQuery: pageToFetch }),
      list: listOrder
        ? `${apiEndpoints.lists.getListDetails({
            id: listId,
            pageQuery: pageToFetch
          })}&sort_by=original_order.desc`
        : apiEndpoints.lists.getListDetails({ id: listId, pageQuery: pageToFetch })
    }),
    [accountId, genreId, listId, listOrder, networkId, pageToFetch, providerId, region, searchQuery]
  );

  useEffect(() => {
    const abortCtrl = new AbortController();

    const fetchQuery = async () => {
      const res = await fetch(endpoint[type], {
        ...fetchOptions(useUserToken ? { token: accessToken } : {}),
        signal: abortCtrl.signal
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw Error("cannot fetch data");
      }
    };

    function detectBottom() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isEmptyPage) {
        clearTimeout(fetchTimeOut.current);

        fetchTimeOut.current = setTimeout(() => {
          fetchQuery()
            .then((data) => {
              if (data?.results?.length > 0) {
                setExtendedList((prev) => prev.concat(data.results));

                setPageToFetch((prev) => prev + 1);
              } else {
                setIsEmptyPage(true);
              }
            })
            .catch((err) => console.error(err.message));
        }, 100);
      }
    }

    window.addEventListener("scroll", detectBottom);

    return () => {
      abortCtrl.abort();
      window.removeEventListener("scroll", detectBottom);
    };
  }, [accessToken, endpoint, isEmptyPage, type, useUserToken]);

  return { list: extendedList };
};

export default useInfiniteQuery;
