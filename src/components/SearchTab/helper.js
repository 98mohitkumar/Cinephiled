import { useRouter } from "next/router";
import { Fragment } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import { SortPill } from "./SearchTabStyles";

const Pill = ({ children, sortBy, descFirst = false }) => {
  const router = useRouter();
  const {
    query: { sortBy: sort, order }
  } = router;

  return (
    <SortPill
      onClick={() => {
        router.replace(
          {
            query: {
              ...router.query,
              sortBy,
              order:
                sortBy === router.query.sortBy && router.query.order === (descFirst ? "desc" : "asc")
                  ? descFirst
                    ? "asc"
                    : "desc"
                  : descFirst
                    ? "desc"
                    : "asc"
            }
          },
          undefined,
          { shallow: true }
        );
      }}
      className='flex items-center gap-[3.2px]'>
      {children} {sort && sort === sortBy && <Fragment>{order === "asc" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</Fragment>}
    </SortPill>
  );
};

export const SortBy = ({ sortOptions }) => {
  const router = useRouter();

  return (
    <div className='mt-4 flex items-center gap-4 whitespace-nowrap'>
      <span className='text-[clamp(16px,3vw,18px)]'>Sort by:</span>
      <div className='gap-3 flex'>
        <SortPill onClick={() => router.push(window.location.pathname, undefined, { shallow: true })}>Default</SortPill>
        {sortOptions?.map(({ key, name, descFirst }) => (
          <Pill sortBy={key} key={key} descFirst={descFirst}>
            {name}
          </Pill>
        ))}
      </div>
    </div>
  );
};
