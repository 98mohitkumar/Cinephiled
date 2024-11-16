import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { apiEndpoints, read_access_token } from "globals/constants";
import { tailwindFontSizeTokens } from "tokens/typography";

type FetchOptionsArgs = {
  method?: string;
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal | null;
};

type Options = {
  method: string;
  headers: {
    accept: string;
    "content-type": string;
    authorization: string;
  };
  body?: string;
  signal?: AbortSignal;
};

export const fetchOptions = (args?: FetchOptionsArgs): Options => {
  const { method = "GET", body = null, token = null, signal = null } = args ?? {};

  const options: Options = {
    method,
    headers: {
      accept: "application/json",
      "content-type": "application/json;charset=utf-8",
      authorization: `Bearer ${token ?? read_access_token}`
    }
  };

  if (body) options.body = JSON.stringify(body);
  if (signal) options.signal = signal;

  return options;
};

export const mergeEpisodeCount = (cast: Array<{ id: string; episode_count: number }>) => {
  const mergedCast: Array<{ id: string; episode_count: number }> = [];
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

export const getRating = (rating: number | null): string => {
  if (!rating) return "NR";

  const ratingWithOneDecimal = Number(rating.toFixed(1));
  if (ratingWithOneDecimal % 1 === 0) {
    return ratingWithOneDecimal.toFixed(0);
  } else {
    return ratingWithOneDecimal.toFixed(1);
  }
};

export const getReleaseDate = (date: string | null): string => {
  if (!date) return "TBA";

  return new Date(date.toString()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

export const getReleaseYear = (date: string | null): string => {
  if (!date) return "TBA";

  return new Date(date).getFullYear().toString();
};

export const getRuntime = (runtime: number | null): string => {
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

export const getGender = (gender: number) => {
  switch (gender) {
    case 0:
      return "-";
    case 1:
      return "Female";
    case 2:
      return "Male";
    case 3:
      return "NB / Trans / Others";
    default:
      return "-";
  }
};

export const removeDuplicates = (items: Array<{ id: string }>) => {
  const uniqueIds = new Set();

  const cleanedItems = items.map((item) => (uniqueIds.has(item.id) ? null : (uniqueIds.add(item.id), item))).filter(Boolean);

  return { cleanedItems };
};

export const framerTabVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const getCleanTitle = (title: string): string => {
  if (!title) return "";

  const stringWithHyphens = title.replace(/[^\w\d\u0080-\uFFFF]+/g, "-");
  return stringWithHyphens.replace(/[-\s]+$/, "");
};

export const fetchSuggestions = async ({
  query,
  controller,
  includePeople
}: {
  query: string;
  controller: AbortController;
  includePeople: boolean;
}) => {
  let searchQuery = query;
  let year = "";
  const people: Array<{ id: string; type: "person" }> = [];

  if (searchQuery.includes("y:")) {
    year = searchQuery.slice(-4);
    searchQuery = searchQuery.slice(0, searchQuery.length - 7);
  }

  if (includePeople) {
    const peopleResponse = await fetch(
      apiEndpoints.search.personSearch({ query: searchQuery }),
      fetchOptions({
        signal: controller.signal
      })
    );

    const peopleRes = await peopleResponse.json();
    people.push(...peopleRes.results.map((item: { id: string }) => ({ ...item, type: "person" })));
  }

  const fetchSearchResults = async (withYear: boolean) => {
    const searchEndpoints = withYear
      ? [apiEndpoints.search.movieSearchWithYear({ query: searchQuery, year }), apiEndpoints.search.tvSearchWithYear({ query: searchQuery, year })]
      : [apiEndpoints.search.movieSearch({ query: searchQuery }), apiEndpoints.search.tvSearch({ query: searchQuery })];

    const [movieResponse, tvResponse] = await Promise.all(
      searchEndpoints.map((endpoint) =>
        fetch(endpoint, {
          ...fetchOptions({ signal: controller.signal })
        })
      )
    );

    if (!movieResponse.ok || !tvResponse.ok) {
      throw new Error("Error fetching data");
    }

    const [movieRes, tvRes] = await Promise.all([movieResponse.json(), tvResponse.json()]);

    return {
      movieRes: movieRes.results.map((item: { id: string }) => ({ ...item, type: "movie" })) || [],
      tvRes: tvRes.results.map((item: { id: string }) => ({ ...item, type: "tv" })) || [],
      peopleRes: people
    };
  };

  return year.trim().length > 0 ? fetchSearchResults(true) : fetchSearchResults(false);
};

export const copyToClipboard = async ({ text, nodeId }: { text: string; nodeId: string }) => {
  try {
    let textToCopy;

    if (nodeId) {
      textToCopy = (document.getElementById(nodeId) as HTMLInputElement)?.value;
    } else {
      textToCopy = text || window.location.href;
    }

    await navigator.clipboard.writeText(textToCopy);
  } catch {
    throw new Error("error copying to clipboard");
  }
};

export const matches = (item1: unknown, item2: unknown) => item1 === item2;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: Object.keys(tailwindFontSizeTokens) }]
    }
  }
});

export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(...classNames));
};

const defaultImages = {
  poster: "/images/DefaultImage.png",
  profile: "/images/DefaultAvatar.png",
  backdrop: "/images/DefaultBackdrop.png",
  logo: ""
} as const;

// https://developer.themoviedb.org/reference/configuration-details
type BackdropSize = "w300" | "w780" | "w1280" | "original";
type LogoSize = "w45" | "w92" | "w154" | "w185" | "w300" | "w500" | "original";
type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";

type TMDBImageArgs<T extends keyof typeof defaultImages> = {
  path: string;
  type: T;
  size?: T extends "backdrop" ? BackdropSize : T extends "logo" ? LogoSize : T extends "poster" | "profile" ? PosterSize : never;
};

export const getTMDBImage = <T extends keyof typeof defaultImages>({ path, type, size }: TMDBImageArgs<T>) => {
  if (!path) return defaultImages[type];

  return `https://image.tmdb.org/t/p/${size || "w500"}${path}`;
};
