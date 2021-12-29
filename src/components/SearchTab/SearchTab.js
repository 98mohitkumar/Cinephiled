import {
  SearchTabSelectionTitle,
  SearchTabSlider,
  SearchTabWrapper,
} from "./SearchTabStyles";

import { useState } from "react";
import MoviesSearch from "./MoviesSearch";
import TVSearch from "./TVSearch";
import { Span } from "../MovieInfo/MovieDetailsStyles";

const SearchTab = ({
  movies,
  tv,
  movieReleaseDates,
  tvReleaseDates,
  search,
}) => {
  const [tabState, setTabState] = useState("movies");

  const moviesTabHandler = () => {
    setTabState("movies");
  };

  const tvTabHandler = () => {
    setTabState("tv");
  };

  const keywordTabHandler = () => {
    setTabState("keyword");
  };

  return (
    <>
      <SearchTabWrapper tabState={tabState}>
        <SearchTabSlider tabState={tabState} />
        <SearchTabSelectionTitle onClick={moviesTabHandler}>
          Movies ({movies.length})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle onClick={tvTabHandler}>
          TV ({tv.length})
        </SearchTabSelectionTitle>
        <SearchTabSelectionTitle onClick={keywordTabHandler}>
          keyword
        </SearchTabSelectionTitle>
      </SearchTabWrapper>

      {tabState === "movies" && (
        <>
          {movies.length !== 0 && (
            <Span className="mt-5 d-block display-6 text-center">
              Movies matching : {search}
            </Span>
          )}
          <p className="text-center mt-2">
            <b>Tip</b>: You can use the 'y:' filter to narrow your results by
            year. Example: <b>'Avatar y:2009'</b>.
          </p>
          <MoviesSearch
            movieRes={movies}
            movieReleaseDates={movieReleaseDates}
          />
        </>
      )}
      {tabState === "tv" && (
        <>
          {tv.length !== 0 && (
            <Span className="mt-5 d-block display-6 text-center">
              TV shows matching : {search}
            </Span>
          )}
          <p className="text-center mt-2">
            <b>Tip</b>: You can use the 'y:' filter to narrow your results by
            year. Example: <b>'Sherlock y:2010'</b>.
          </p>
          <TVSearch tvRes={tv} tvReleaseDates={tvReleaseDates} />
        </>
      )}
    </>
  );
};

export default SearchTab;
