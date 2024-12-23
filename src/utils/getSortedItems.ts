type SortByArgs = {
  items: Array<{
    popularity: number;
    release_date: string;
    first_air_date: string;
    title: string;
    vote_average: number;
  }>;
  sortBy: "popularity" | "release_date" | "title" | "rating";
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

    case "rating":
      return itemsToSort.sort((a, b) => (order === "asc" ? a.vote_average - b.vote_average : b.vote_average - a.vote_average));

    default:
      return items;
  }
};

// redundant function (check if it's being used)
// export const getActiveSortKey = ({ options, sortBy, defaultKey = "default" }) => {
//   const sortKey = options?.find((item) => item.key === sortBy);
//   return sortKey?.value || defaultKey;
// };
