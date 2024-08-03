import { useRouter } from "next/router";

const useSort = ({ shallow = false }) => {
  const router = useRouter();
  const { sortBy } = router.query;

  const handleSortSelection = (key) => {
    const keyToCompare = sortBy || "default";

    if (key === keyToCompare) return;

    let newQuery;

    if (key === "default") {
      newQuery = {
        ...router.query
      };

      delete newQuery.sortBy;
    } else {
      newQuery = {
        ...router.query,
        sortBy: key
      };
    }

    setTimeout(() => {
      router.replace({ href: router.asPath.split("?")[0], query: newQuery }, undefined, {
        shallow
      });
    }, 100);
  };

  return { handleSortSelection, sortBy };
};

export default useSort;
