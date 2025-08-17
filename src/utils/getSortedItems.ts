type SortByArgs = {
  items: Array<{
    popularity: number;
    release_date: string;
    first_air_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    order: number;
    backdrop_path: string;
  }>;
  sortBy: "popularity" | "release_date" | "title" | "vote_average" | "vote_count" | "known_for";
  order: "asc" | "desc";
};

export const getSortedItems = ({ items, sortBy, order = "asc" }: SortByArgs) => {
  if (!items) return [];

  const itemsToSort = [...items];

  switch (sortBy) {
    case "popularity":
      return itemsToSort.sort((a, b) => (order === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity));

    case "release_date":
      return itemsToSort.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return order === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      });

    case "title":
      return itemsToSort.sort((a, b) => {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

    case "known_for":
      return itemsToSort.sort((a, b) => {
        const aReleaseDate = a.release_date || a.first_air_date;
        const bReleaseDate = b.release_date || b.first_air_date;

        // Check if items meet the criteria (have release date, backdrop, and sufficient vote count)
        const aMeetsCriteria = aReleaseDate && a.backdrop_path && a.vote_count >= 100;
        const bMeetsCriteria = bReleaseDate && b.backdrop_path && b.vote_count >= 100;

        // If one meets criteria and the other doesn't, prioritize the one that meets criteria
        if (aMeetsCriteria !== bMeetsCriteria) {
          return aMeetsCriteria ? -1 : 1; // Items meeting criteria come first
        }

        // If neither meets criteria, keep original order
        if (!aMeetsCriteria && !bMeetsCriteria) {
          return 0;
        }

        // Both meet criteria, so apply the priority and vote_count sorting
        const aPriority = a.order < 2 ? 1 : 0;
        const bPriority = b.order < 2 ? 1 : 0;

        if (aPriority !== bPriority) {
          return bPriority - aPriority; // Items with order < 3 come first
        }

        // If both have same priority, sort by vote_count
        return b.vote_count - a.vote_count;
      });

    case "vote_average":
      return itemsToSort.sort((a, b) => (order === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average));

    default:
      return items;
  }
};
