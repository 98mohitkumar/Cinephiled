import { apiEndpoints } from "globals/constants";
import { useMemo, useEffect, useState, useRef } from "react";

const useInfiniteQuery = ({
  initialPage,
  type,
  genreId = null,
  searchQuery = null,
  networkId = null,
  providerId = null,
  region = null
}) => {
  const [pageToFetch, setPageToFetch] = useState(initialPage);
  const [extendedList, setExtendedList] = useState([]);
  const [isEmptyPage, setIsEmptyPage] = useState(false);

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
      })
    }),
    [genreId, networkId, pageToFetch, providerId, region, searchQuery]
  );

  useEffect(() => {
    const abortCtrl = new AbortController();

    const fetchQuery = async () => {
      const res = await fetch(endpoint[type], {
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
  }, [endpoint, isEmptyPage, type]);

  return { list: extendedList };
};

export default useInfiniteQuery;
