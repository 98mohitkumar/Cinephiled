import { useEffect, useState } from "react";
import { fetchSuggestions } from "src/utils/helper";

const useGetSearchSuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
    } else {
      setLoading(true);

      fetchSuggestions(query)
        .then(({ movieRes, tvRes }) => {
          setSuggestions(movieRes.concat(tvRes).sort((a, b) => b.vote_count - a.vote_count));
          setLoading(false);
        })
        .catch(() => {
          setSuggestions([]);
          setLoading(false);
        });
    }

    return () => {
      setSuggestions([]);
    };
  }, [query]);

  return { searchSuggestions: suggestions, loading };
};

export default useGetSearchSuggestions;
