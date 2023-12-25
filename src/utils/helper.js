const { apiEndpoints } = require("globals/constants");

export const getCountryCode = async () => {
  try {
    const res = await fetch(apiEndpoints.user.getCountryCode);

    if (res.ok && res.status === 200) {
      const data = await res.json();
      return data.country_code;
    } else {
      return "US";
    }
  } catch {
    return "US";
  }
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
