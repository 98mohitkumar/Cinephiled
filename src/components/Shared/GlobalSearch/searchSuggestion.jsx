import Link from "next/link";
import { Fragment } from "react";

import FlexBox from "components/UI/FlexBox";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { cn, getCleanTitle, getReleaseDate, getReleaseYear, matches } from "utils/helper";

import { searchItem } from "./GlobalSearchStyles";

const getSuggestedItem = ({ data, type }) => {
  let dynamicItemData;

  switch (type) {
    case "movie":
      dynamicItemData = {
        title: data.title,
        releaseDate: getReleaseDate(data.release_date),
        type: "Movie"
      };
      break;
    case "tv":
      dynamicItemData = {
        title: data.name,
        releaseDate: getReleaseDate(data.first_air_date),
        type: "TV Show"
      };
      break;
    case "person":
      dynamicItemData = {
        title: data.name,
        releaseDate: null,
        type: "Person"
      };
      break;
    default:
      dynamicItemData = {
        title: null,
        releaseDate: null
      };
  }

  return dynamicItemData;
};

const SearchSuggestion = ({ data, type, className, ...props }) => {
  const suggestedItem = getSuggestedItem({ data, type });

  return (
    <Fragment>
      <Link href={`/${type}/${data.id}-${getCleanTitle(suggestedItem.title)}`} passHref legacyBehavior>
        <FlexBox
          tag='a'
          className={`search-suggestion w-full items-center justify-between gap-24 px-12 py-8 ${className}`}
          css={searchItem}
          {...props}>
          <H6 weight='medium' className='text-black'>
            {suggestedItem.title} {suggestedItem.releaseDate && `(${getReleaseYear(suggestedItem.releaseDate)})`}
          </H6>

          <P
            weight='semibold'
            size='small'
            className={cn(
              "grid w-20 shrink-0 place-items-center whitespace-nowrap rounded-2xl py-2",
              "border border-cyan-800 bg-cyan-100 text-cyan-800",
              {
                "border-green-800 bg-green-100 text-green-800": matches(type, "tv")
              }
            )}>
            {suggestedItem.type}
          </P>
        </FlexBox>
      </Link>
    </Fragment>
  );
};

export default SearchSuggestion;
