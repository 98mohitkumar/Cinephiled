import { useRouter } from "next/router";
import { Fragment } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { SortPill } from "./SearchTabStyles";

const Pill = ({ children, sortBy }) => {
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
              order: sortBy === router.query.sortBy && router.query.order === "asc" ? "desc" : "asc"
            }
          },
          undefined,
          { shallow: true }
        );
      }}
      className='flex items-center gap-[3.2px]'>
      {children}{" "}
      {sort && sort === sortBy && (
        <Fragment>{order === "asc" ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</Fragment>
      )}
    </SortPill>
  );
};

export const SortBy = () => {
  const router = useRouter();

  return (
    <div className='flex items-center mt-4 gap-4 whitespace-nowrap'>
      <span className='text-[clamp(16px,3vw,18px)]'>Sort by:</span>
      <div className='flex gap-3'>
        <SortPill
          onClick={() => router.push(window.location.pathname, undefined, { shallow: true })}>
          Default
        </SortPill>
        <Pill sortBy={"name"}>Name</Pill>
        <Pill sortBy={"releaseDate"}>Release date</Pill>
      </div>
    </div>
  );
};
