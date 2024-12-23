import Link from "next/link";
import { Fragment } from "react";

import FlexBox from "components/UI/FlexBox";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { getCleanTitle, getReleaseDate, getReleaseYear } from "utils/helper";

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
            size='tiny-to-p'
            className='border-background whitespace-nowrap rounded-md border border-neutral-500 bg-neutral-200 px-8 py-4 text-black/80 drop-shadow-sm'>
            {suggestedItem.type}
          </P>
        </FlexBox>
      </Link>
    </Fragment>
  );
};

export default SearchSuggestion;
