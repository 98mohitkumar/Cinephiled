export const getSortedItems = ({ items, sortBy, order = "asc" }) => {
  if (!items) return [];

  const itemsToSort = [...items];

  switch (sortBy) {
    case "popularity":
      return itemsToSort.sort((a, b) =>
        order === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity
      );

    case "releaseDate":
      return itemsToSort.sort((a, b) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      });

    case "title":
      return itemsToSort.sort((a, b) => {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

    default:
      return items;
  }
};
