import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";

type UseSortProps = {
  shallow?: boolean;
  defaultSortOption: string;
};

const useSort = ({ shallow = false, defaultSortOption }: UseSortProps) => {
  const router = useRouter();
  const { sortBy } = router.query;

  const handleSortSelection = (key: string) => {
    const keyToCompare = sortBy || defaultSortOption;

    if (key === keyToCompare) return;

    let newQuery: ParsedUrlQuery;

    if (key === defaultSortOption) {
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
