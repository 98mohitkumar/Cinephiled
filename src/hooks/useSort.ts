import { ParsedUrlQuery } from "querystring";

import { useRouter } from "next/router";

type UseSortProps = {
  shallow?: boolean;
  defaultSortOption: string;
  key?: string;
};

const useSort = ({ shallow = false, defaultSortOption, key = "sortBy" }: UseSortProps) => {
  const router = useRouter();
  const { [key]: sortBy } = router.query;

  const handleSortSelection = (value: string) => {
    const keyToCompare = sortBy || defaultSortOption;

    if (value === keyToCompare) return;

    let newQuery: ParsedUrlQuery;

    if (value === defaultSortOption) {
      newQuery = {
        ...router.query
      };

      delete newQuery[key];
    } else {
      newQuery = {
        ...router.query,
        [key]: value
      };
    }

    setTimeout(() => {
      router.replace({ href: router.asPath.split("?")[0], query: newQuery }, undefined, {
        shallow
      });
    }, 100);
  };

  return { handleSortSelection, sortBy: sortBy || defaultSortOption };
};

export default useSort;
