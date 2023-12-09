import { useRouter } from "next/router";
import { Fragment } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { SortPill } from "./SearchTabStyles";

export const getReleaseDate = (item) => {
  if (item?.first_air_date || item?.release_date || item?.air_date) {
    return (
      new Date(
        item?.first_air_date?.toString() ||
          item?.release_date?.toString() ||
          item?.air_date.toString()
      )
        .toDateString()
        .slice(4, -5) +
      ", " +
      new Date(
        item?.first_air_date?.toString() ||
          item?.release_date?.toString() ||
          item?.air_date.toString()
      ).getFullYear()
    );
  } else {
    return "TBA";
  }
};

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
      className='flex items-center'
      style={{ gap: "0.2rem" }}>
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
    <div className='flex items-center mt-4' style={{ gap: "1rem", whiteSpace: "nowrap" }}>
      <span style={{ fontSize: "clamp(16px, 3vw, 18px)" }}>Sort by:</span>
      <div className='flex' style={{ gap: "0.8rem" }}>
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
