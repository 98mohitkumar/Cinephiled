import { useEffect, useState } from "react";

import { fetchOptions } from "utils/helper";

const defaultValue = {
  items: []
};

const useGetTechncialDetails = (imdbId) => {
  const [technicalDetails, setTechnicalDetails] = useState(defaultValue);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTechnicalDetails = async () => {
      const response = await fetch(
        "/api/getTechnicalDetails",
        fetchOptions({
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: { id: imdbId },
          signal: abortController.signal
        })
      );

      if (!response.ok) {
        throw new Error("error fetching technical details");
      }

      const data = await response.json();
      return data;
    };

    if (imdbId) {
      fetchTechnicalDetails()
        .then((data) => setTechnicalDetails(data))
        .catch(() => {
          setTechnicalDetails(defaultValue);
        });
    }

    return () => {
      abortController.abort("unmounted");
    };
  }, [imdbId]);

  return { technicalDetails };
};

export default useGetTechncialDetails;
