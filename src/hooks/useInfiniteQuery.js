import { getRecommendations } from "api/user";
import { apiEndpoints } from "globals/constants";
import { useContext, useMemo, useEffect, useState, useRef } from "react";
import { UserContext } from "Store/UserContext";

const useInfiniteQuery = ({
  initialPage,
  type,
  mediaType,
  genreId = null,
  searchQuery = null,
  isProfileRecommendations = false
}) => {
  const [pageToFetch, setPageToFetch] = useState(initialPage);
  const [extendedList, setExtendedList] = useState([]);
  const [isEmptyPage, setIsEmptyPage] = useState(false);

  const fetchTimeOut = useRef(null);
  const { userInfo } = useContext(UserContext);

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
      })
    }),
    [genreId, pageToFetch, searchQuery]
  );

  useEffect(() => {
    const abortCtrl = new AbortController();

    const fetchQuery = async () => {
      if (isProfileRecommendations) {
        const response = await getRecommendations({
          mediaType,
          accountId: userInfo?.accountId,
          pageQuery: pageToFetch
        });

        return response;
      } else {
        const res = await fetch(endpoint[type], {
          signal: abortCtrl.signal
        });

        if (res.ok) {
          const data = await res.json();
          return data;
        } else {
          throw Error("cannot fetch data");
        }
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
  }, [
    endpoint,
    isEmptyPage,
    isProfileRecommendations,
    mediaType,
    pageToFetch,
    type,
    userInfo?.accountId,
    userInfo.id
  ]);

  return { list: extendedList };
};

export default useInfiniteQuery;
