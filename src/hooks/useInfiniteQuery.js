import { useEffect, useState, useRef, useCallback } from "react";

import { useUserContext } from "Store/UserContext";
import { fetchOptions } from "utils/helper";

const useInfiniteQuery = ({ initialPage, useUserToken = false, getEndpoint, scrollAfterLoad = true }) => {
  const [pageToFetch, setPageToFetch] = useState(initialPage);
  const [extendedList, setExtendedList] = useState([]);
  const [isEmptyPage, setIsEmptyPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    userInfo: { accessToken }
  } = useUserContext();

  const fetchTimeOut = useRef(null);

  const resetQueryState = () => {
    setPageToFetch(initialPage);
    setExtendedList([]);
    setIsEmptyPage(false);
  };

  const fetchQuery = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const res = await fetch(getEndpoint({ page }), fetchOptions({ token: useUserToken ? accessToken : null }));

        if (!res.ok) {
          throw new Error("Cannot fetch data");
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error.message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, getEndpoint, useUserToken]
  );

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 700 && !isLoading && !isEmptyPage) {
      clearTimeout(fetchTimeOut.current);

      fetchTimeOut.current = setTimeout(() => {
        fetchQuery(pageToFetch).then((data) => {
          if (data && data.results && data.results.length > 0) {
            setExtendedList((prev) => [...prev, ...data.results]);
            setPageToFetch((prev) => prev + 1);

            if (scrollAfterLoad) {
              requestAnimationFrame(() => {
                window.scrollTo({ top: window.scrollY + 200, behavior: "smooth" });
              });
            }
          } else {
            setIsEmptyPage(true);
          }
        });
      }, 100);
    }
  }, [fetchQuery, isLoading, isEmptyPage, pageToFetch, scrollAfterLoad]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fetchTimeOut.current);
    };
  }, [handleScroll]);

  return { list: extendedList, resetQueryState };
};

export default useInfiniteQuery;
