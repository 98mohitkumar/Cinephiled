import { useContext, useMemo, useEffect, useState, useRef } from 'react';
import { getRecommendations } from '../apiEndpoints/user';
import { apiEndpoints } from '../constants';
import { UserContext } from '../Store/UserContext';

const useInfiniteQuery = ({
  initialPage,
  type,
  mediaType,
  genreId = null,
  searchQuery = null,
  isProfileRecommendations
}) => {
  const [pageToFetch, setPageToFetch] = useState(initialPage);
  const [extendedList, setExtendedList] = useState({
    list: [],
    currentPage: initialPage - 1
  });
  const [isEmptyPage, setIsEmptyPage] = useState(false);

  const fetchTimeOut = useRef(null);
  const { userInfo } = useContext(UserContext);

  const endpoint = useMemo(
    () => ({
      movieGenre: apiEndpoints.movie.movieGenre(genreId, pageToFetch),
      tvGenre: apiEndpoints.tv.tvGenre(genreId, pageToFetch),
      movieSearch: apiEndpoints.search.movieSearch(searchQuery, pageToFetch),
      tvSearch: apiEndpoints.search.tvSearch(searchQuery, pageToFetch),
      keywordSearch: apiEndpoints.search.keywordSearch(searchQuery, pageToFetch)
    }),
    [genreId, pageToFetch, searchQuery]
  );

  useEffect(() => {
    const abortCtrl = new AbortController();

    const fetchQuery = async () => {
      if (isProfileRecommendations) {
        const response = await getRecommendations(
          mediaType,
          userInfo?.id,
          pageToFetch
        );

        return response;
      } else {
        const res = await fetch(endpoint[type], {
          signal: abortCtrl.signal
        });

        if (res.ok) {
          const data = await res.json();
          return data;
        } else {
          throw Error('cannot fetch data');
        }
      }
    };

    function detectBottom() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !isEmptyPage
      ) {
        clearTimeout(fetchTimeOut.current);

        fetchTimeOut.current = setTimeout(() => {
          fetchQuery()
            .then((data) => {
              if (data?.results?.length > 0) {
                setExtendedList((prev) => ({
                  list: prev.list.concat(data.results),
                  currentPage: data?.page
                }));

                setPageToFetch((prev) => prev + 1);
              } else {
                setIsEmptyPage(true);
              }
            })
            .catch((err) => console.error(err.message));
        }, 100);
      }
    }

    window.addEventListener('scroll', detectBottom);

    return () => {
      abortCtrl.abort();
      window.removeEventListener('scroll', detectBottom);
    };
  }, [
    endpoint,
    isEmptyPage,
    isProfileRecommendations,
    mediaType,
    pageToFetch,
    type,
    userInfo?.id
  ]);

  return extendedList;
};

export default useInfiniteQuery;
