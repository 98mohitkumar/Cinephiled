import { useState } from "react";
import {
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
} from "../MovieInfo/MovieTabStyles";
import TVBackdrops from "./TVBackdrops";
import TVCast from "./TVCast";
import TVPosters from "./TVPosters";
import TVReviews from "./TVReviews";

const TVTab = (props) => {
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
      {tabState === "cast" && <TVCast cast={props.cast} />}
      {tabState === "reviews" && <TVReviews reviews={props.reviews} />}
      {tabState === "backdrops" && <TVBackdrops backdrops={props.backdrops} />}
      {tabState === "posters" && <TVPosters posters={props.posters} />}
    </>
  );
};

export default TVTab;
