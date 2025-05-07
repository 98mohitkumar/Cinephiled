import Link from "next/link";
import { Fragment } from "react";

import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { ROUTES } from "data/global";
import { cn, getNiceName, getReleaseYear, matches } from "utils/helper";

import { searchItem } from "./GlobalSearchStyles";

const getSuggestedItem = ({ data, type }) => {
  let dynamicItemData;

  switch (type) {
    case "movie":
      dynamicItemData = {
        title: data.title,
        releaseYear: getReleaseYear(data.release_date),
        type: "Movie"
      };
      break;
    case "tv":
      dynamicItemData = {
        title: data.name,
        releaseYear: getReleaseYear(data.first_air_date),
        type: "TV Show"
      };
      break;
    case "person":
      dynamicItemData = {
        title: data.name,
        releaseYear: null,
        type: "Person"
      };
      break;
    default:
      dynamicItemData = {
        title: null,
        releaseYear: null
      };
  }

  return dynamicItemData;
};

const SearchSuggestion = ({ data, type, className, ...props }) => {
  const suggestedItem = getSuggestedItem({ data, type });

  const getMediaRoute = (type) => {
    switch (type) {
      case "movie":
        return ROUTES.movies;
      case "tv":
        return ROUTES.tv;
      case "person":
        return ROUTES.person;
      default:
        return ROUTES.movies;
    }
  };

  return (
    <Fragment>
      <Link
        href={`/${getMediaRoute(type)}/${getNiceName({ id: data.id, name: suggestedItem.title })}`}
        className={cn(`search-suggestion flex w-full items-center justify-between gap-24 px-12 py-8`, className)}
        css={searchItem}
        {...props}>
        <H6 weight='medium' className='text-black'>
          {suggestedItem.title} {suggestedItem.releaseYear ? `(${suggestedItem.releaseYear})` : null}
        </H6>

        <P
          weight='semibold'
          size='small'
          className={cn(
            "grid w-20 shrink-0 place-items-center whitespace-nowrap rounded-2xl py-2",
            "border border-cyan-800 bg-cyan-100 text-cyan-800",
            {
              "border-green-800 bg-green-100 text-green-800": matches(type, "tv"),
              "border-amber-800 bg-amber-100 text-amber-800": matches(type, "person")
            }
          )}>
          {suggestedItem.type}
        </P>
      </Link>
    </Fragment>
  );
};

export default SearchSuggestion;
