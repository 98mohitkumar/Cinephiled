import { useEffect, useState } from 'react';

const useInfiniteQuery = (initialPage, type, genreId) => {
  const [pageQuery, setPageQuery] = useState(initialPage);
  const [extendedList, setExtendedList] = useState({
    list: [],
    page: pageQuery
  });

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
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const abortCtrl = new AbortController();

    const fetchGenreList = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${api_key}&language=en-US&include_adult=false&page=${pageQuery}&with_genres=${genreId}`,
        { signal: abortCtrl.signal }
      );

      if (res.ok) {
        const moviesList = await res.json();
        return moviesList;
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
  }, [pageQuery, type, genreId]);

  return extendedList;
};

export default useInfiniteQuery;
