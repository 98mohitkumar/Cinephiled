import Link from "next/link";
import { Fragment } from "react";
import { getCleanTitle, getReleaseYear } from "src/utils/helper";
import { Anchor, SearchSlice } from "./HeroStyles";

const SearchSuggestion = ({ data, type, ...props }) => (
  <Fragment>
    {type === "movie" && (
      <Link href={`/movies/${data.id}-${getCleanTitle(data.title)}`} passHref>
        <Anchor {...props}>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.title}{" "}
              {data.release_date && `(${getReleaseYear(data.release_date.toString())})`}
            </h5>

            <h6 className='tag text-base'>Movie</h6>
          </SearchSlice>
        </Anchor>
      </Link>
    )}

    {type === "tv" && (
      <Link href={`/tv/${data.id}-${getCleanTitle(data.name)}`} passHref>
        <Anchor {...props}>
          <SearchSlice>
            <h5 className='suggestion-title'>
              {data.name}{" "}
              {data.first_air_date && `(${getReleaseYear(data.first_air_date.toString())})`}
            </h5>

            <h6 className='tag text-base'>TV</h6>
          </SearchSlice>
        </Anchor>
      </Link>
    )}
  </Fragment>
);

export default SearchSuggestion;
