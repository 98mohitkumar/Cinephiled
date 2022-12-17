import { useMemo, useEffect, useState } from 'react';
import { apiEndpoints } from '../constants';

const useInfiniteQuery = (
  initialPage,
  type,
  genreId = null,
  searchQuery = null
) => {
  const [pageQuery, setPageQuery] = useState(initialPage);
  const [extendedList, setExtendedList] = useState({
    list: [],
    page: pageQuery
  });

  const endpoint = useMemo(
    () => ({
      movieGenre: apiEndpoints.movie.movieGenre(genreId, pageQuery),
      tvGenre: apiEndpoints.tv.tvGenre(genreId, pageQuery),
      movieSearch: apiEndpoints.search.movieSearch(searchQuery, pageQuery),
      tvSearch: apiEndpoints.search.tvSearch(searchQuery, pageQuery),
      keywordSearch: apiEndpoints.search.keywordSearch(searchQuery, pageQuery)
    }),
    [genreId, pageQuery, searchQuery]
  );

  useEffect(() => {
    function detectBottom() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPageQuery((prev) => (prev === extendedList.page ? prev + 1 : prev));
      }
    }

    window.addEventListener('scroll', detectBottom);
    return () => {
      window.removeEventListener('scroll', detectBottom);
    };
  }, [extendedList.page]);

  useEffect(() => {
    const abortCtrl = new AbortController();

    const fetchGenreList = async () => {
      const res = await fetch(endpoint[type], { signal: abortCtrl.signal });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw Error('cannot fetch data');
      }
    };

    fetchGenreList()
      .then((data) =>
        setExtendedList((prev) => ({
          list: prev.list.concat(data.results),
          page: pageQuery
        }))
      )
      .catch((err) => console.error(err.message));

    return () => {
      abortCtrl.abort();
    };
  }, [pageQuery, type, genreId, endpoint]);

  return extendedList;
};

export default useInfiniteQuery;
