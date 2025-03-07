import { useEffect, useState } from "react";

import { fetchSuggestions } from "utils/helper";

const useGetSearchSuggestions = ({ query, includePeople = false }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    if (query.trim().length === 0) {
      setSuggestions([]);
      setLoading(false);
    } else {
      setLoading(true);

      fetchSuggestions({ query, controller: abortController, includePeople })
        .then(({ movieRes, tvRes, peopleRes }) => {
          setSuggestions([...movieRes, ...tvRes, ...peopleRes].sort((a, b) => b.popularity - a.popularity));
        })
        .catch(() => {
          setSuggestions([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      setLoading(false);
      abortController.abort("unmounted");
    };
  }, [includePeople, query]);

  return { searchSuggestions: suggestions, loading };
};

export default useGetSearchSuggestions;
