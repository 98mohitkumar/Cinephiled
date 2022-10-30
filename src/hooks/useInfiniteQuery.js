import { useMemo } from 'react';
import { useEffect, useState } from 'react';

const useInfiniteQuery = (
  initialPage,
  type,
  genreId = null,
  searchQuery = null
) => {
  const api_key = process.env.NEXT_PUBLIC_API_KEY;
  const [pageQuery, setPageQuery] = useState(initialPage);
  const [extendedList, setExtendedList] = useState({
    list: [],
    page: pageQuery
  });

  const endpoint = useMemo(
    () => ({
      movieGenre: `https://api.themoviedb.org/3/discover/movies?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

      tvGenre: `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,

      movieSearch: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=${pageQuery}&include_adult=false`,

      tvSearch: `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&language=en-US&query=${searchQuery}&page=${pageQuery}&include_adult=false`,

      keywordSearch: `https://api.themoviedb.org/3/search/keyword?api_key=${api_key}&query=${searchQuery}&page=${pageQuery}`
    }),
    [api_key, genreId, pageQuery, searchQuery]
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
        return null;
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
