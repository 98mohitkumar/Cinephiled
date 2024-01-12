import { apiEndpoints, read_access_token } from "globals/constants";

export const fetchOptions = (
  { method, body, token } = {
    method: "GET",
    body: null,
    token: null
  }
) => {
  const options = {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json;charset=utf-8",
      authorization: `Bearer ${read_access_token}`
    }
  };

  if (method) options.method = method;
  if (token) {
    options.headers.authorization = `Bearer ${token}`;
  }

  if (body) options.body = JSON.stringify(body);

  return options;
};

export const mergeEpisodeCount = (cast) => {
  const mergedCast = [];
  const casting = structuredClone(cast);

  casting.forEach((item) => {
    const existing = mergedCast.findIndex((castItem) => castItem.id === item.id);
    if (existing > -1) {
      const existingEpisodeCount = mergedCast[existing].episode_count ?? 0;
      const currentEpisodeCount = item.episode_count ?? 0;
      mergedCast[existing].episode_count = existingEpisodeCount + currentEpisodeCount;
    } else {
      mergedCast.push(item);
    }
  });

  return mergedCast;
};

export const getRating = (rating) => {
  if (!rating) return "NR";

  if (rating.toFixed(1) % 1 === 0) {
    return rating.toFixed(0);
  } else {
    return rating.toFixed(1);
  }
};

export const getReleaseDate = (date) => {
  if (!date) return "TBA";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const getReleaseYear = (date) => {
  if (!date) return "TBA";

  return new Date(date).getFullYear();
};

export const getRuntime = (runtime) => {
  if (!runtime) return "TBA";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};

export const getGender = (g) => {
  switch (g) {
    case 0:
      return "-";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "NB / Trans / Others";
  }
};

export const removeDuplicates = (items) => {
  const uniqueIds = new Set();

  const cleanedItems = items
    .map((item) => (uniqueIds.has(item.id) ? null : (uniqueIds.add(item.id), item)))
    .filter(Boolean);

  return { cleanedItems };
};

export const framerTabVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const getCleanTitle = (title) => {
  if (!title) return "";

  const stringWithHyphens = title.replace(/[^\w\d]+/g, "-");
  return stringWithHyphens.replace(/[-\s]+$/, "");
};

export const fetchSuggestions = async (userInput, controller) => {
  let searchQuery = userInput;
  let year = "";

  if (searchQuery.includes("y:")) {
    year = searchQuery.slice(-4);
    searchQuery = searchQuery.slice(0, searchQuery.length - 7);
  }

  if (year.trim().length > 0) {
    const searchQueryWithYear = await Promise.all([
      fetch(apiEndpoints.search.movieSearchWithYear({ query: searchQuery, year }), {
        ...fetchOptions(),
        signal: controller.signal
      }),
      fetch(apiEndpoints.search.tvSearchWithYear({ query: searchQuery, year }), {
        ...fetchOptions(),
        signal: controller.signal
      })
    ]);

    const error = searchQueryWithYear.some((res) => !res.ok);
    if (error) throw new Error("error fetching data");

    const [movieResponse, tvResponse] = searchQueryWithYear;
    const [movieRes, tvRes] = await Promise.all([movieResponse.json(), tvResponse.json()]);

    return {
      movieRes: movieRes.results || [],
      tvRes: tvRes.results.map((item) => ({ ...item, type: "tv" })) || []
    };
  } else {
    const searchQueryWithoutYear = await Promise.all([
      fetch(apiEndpoints.search.movieSearch({ query: searchQuery }), {
        ...fetchOptions(),
        signal: controller.signal
      }),
      fetch(apiEndpoints.search.tvSearch({ query: searchQuery }), {
        ...fetchOptions(),
        signal: controller.signal
      })
    ]);

    const error = searchQueryWithoutYear.some((res) => !res.ok);
    if (error) throw new Error("error fetching data");

    const [movieResponse, tvResponse] = searchQueryWithoutYear;
    const [movieRes, tvRes] = await Promise.all([movieResponse.json(), tvResponse.json()]);

    return {
      movieRes: movieRes.results || [],
      tvRes: tvRes.results.map((item) => ({ ...item, type: "tv" })) || []
    };
  }
};

export const copyToClipboard = async ({ text, nodeId }) => {
  try {
    let textToCopy;

    if (nodeId) {
      textToCopy = document.getElementById(nodeId).value;
    } else {
      textToCopy = text || window.location.href;
    }

    await navigator.clipboard.writeText(textToCopy);
  } catch {
    throw new Error("error copying to clipboard");
  }
};
