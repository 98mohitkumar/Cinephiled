import { useState } from "react";
import MovieBackdrops from "./MovieBackdrops";
import MovieCast from "./MovieCast";
import MoviePosters from "./MoviePosters";
import MovieReviews from "./MovieReviews";
import {
  MovieTabSelectionTitle,
  MovieTabSlider,
  MovieTabWrapper,
} from "./MovieTabStyles";

const MovieTab = (props) => {
  const [tabState, setTabState] = useState("cast");

  const castSelectionHandler = () => {
    setTabState("cast");
  };

  const reviewSelectionHandler = () => {
    setTabState("reviews");
  };

  const backdropSelectionHandler = () => {
    setTabState("backdrops");
  };

  const posterSelectionHandler = () => {
    setTabState("posters");
  };

  return (
    <>
      <MovieTabWrapper className="my-5" tabCheck={tabState}>
        <MovieTabSlider tabCheck={tabState} />
        <MovieTabSelectionTitle onClick={castSelectionHandler}>
          Cast
        </MovieTabSelectionTitle>
        <MovieTabSelectionTitle onClick={reviewSelectionHandler}>
          Reviews
        </MovieTabSelectionTitle>
        <MovieTabSelectionTitle onClick={backdropSelectionHandler}>
          Backdrops
        </MovieTabSelectionTitle>
        <MovieTabSelectionTitle onClick={posterSelectionHandler}>
          Posters
        </MovieTabSelectionTitle>
      </MovieTabWrapper>
      {tabState === "cast" && <MovieCast cast={props.cast} />}
      {tabState === "reviews" && <MovieReviews reviews={props.reviews} />}
      {tabState === "backdrops" && (
        <MovieBackdrops backdrops={props.backdrops} />
      )}
      {tabState === "posters" && <MoviePosters posters={props.posters} />}
    </>
  );
};

export default MovieTab;
