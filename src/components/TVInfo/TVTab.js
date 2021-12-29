import { useState, useEffect } from "react";
import {
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
} from "../MovieInfo/MovieTabStyles";
import TVBackdrops from "./TVBackdrops";
import TVCast from "./TVCast";
import TVPosters from "./TVPosters";
import TVRecommendations from "./TVRecommendations";
import TVReviews from "./TVReviews";
import TVSeasons from "./TVSeasons";

const TVTab = (props) => {
  const [tabState, setTabState] = useState("cast");
  const [tvRecommended, setTvRecommended] = useState([]);

  const castSelectionHandler = () => {
    setTabState("cast");
  };

  const seasonsSelectionHandler = () => {
    setTabState("seasons");
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

  useEffect(() => {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`
      );

      const res = await response.json();

      return res;
    }

    getRecommended().then((data) => setTvRecommended(data.results));
  }, [props.id]);

  return (
    <>
      <TabWrapper className="my-5" tabCheck={tabState} tv={true}>
        <TabSlider tabCheck={tabState} tv={true} />
        <TabSelectionTitle onClick={castSelectionHandler}>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle onClick={seasonsSelectionHandler}>
          Seasons
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
      {tabState === "seasons" && <TVSeasons seasons={props.seasons} />}
      {tabState === "reviews" && <TVReviews reviews={props.reviews} />}
      {tabState === "backdrops" && <TVBackdrops backdrops={props.backdrops} />}
      {tabState === "posters" && <TVPosters posters={props.posters} />}
      <h1 className="display-6 fw-bold text-white text-center">
        Recommendations
      </h1>
      <TVRecommendations Tv={tvRecommended} />
    </>
  );
};

export default TVTab;
