import { useState } from "react";
import MovieBackdrops from "./MovieBackdrops";
import MovieCast from "./MovieCast";
import MoviePosters from "./MoviePosters";
import MovieReviews from "./MovieReviews";
import { TabSelectionTitle, TabSlider, TabWrapper } from "./MovieTabStyles";

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
      <TabWrapper className="my-5" tabCheck={tabState}>
        <TabSlider tabCheck={tabState} />
        <TabSelectionTitle onClick={castSelectionHandler}>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle onClick={reviewSelectionHandler}>
          Reviews
        </TabSelectionTitle>
        <TabSelectionTitle onClick={backdropSelectionHandler}>
          Backdrops
        </TabSelectionTitle>
        <TabSelectionTitle onClick={posterSelectionHandler}>
          Posters
        </TabSelectionTitle>
      </TabWrapper>
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
