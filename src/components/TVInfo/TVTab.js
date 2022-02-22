import { useState, useEffect } from "react";
import {
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
  TabIcon,
} from "../MovieInfo/MovieTabStyles";
import BackdropsSvg from "../Svg/backdrops";
import CastSvg from "../Svg/cast";
import PostersSvg from "../Svg/posters";
import ReviewsSvg from "../Svg/reviews";
import SeasonsSvg from "../Svg/seasons";
import TVBackdrops from "./TVBackdrops";
import TVCast from "./TVCast";
import TVPosters from "./TVPosters";
import TVRecommendations from "./TVRecommendations";
import TVReviews from "./TVReviews";
import TVSeasons from "./TVSeasons";

const TVTab = (props) => {
  const [tabState, setTabState] = useState("cast");
  const [tvRecommended, setTvRecommended] = useState([]);

  useEffect(() => {
    let tabPosition = localStorage.getItem("TvTabState");
    !tabPosition ? setTabState("cast") : setTabState(tabPosition);
  }, []);

  const castSelectionHandler = () => {
    setTabState("cast");
    localStorage.setItem("TvTabState", "cast");
  };

  const seasonsSelectionHandler = () => {
    setTabState("seasons");
    localStorage.setItem("TvTabState", "seasons");
  };

  const reviewSelectionHandler = () => {
    setTabState("reviews");
    localStorage.setItem("TvTabState", "reviews");
  };

  const backdropSelectionHandler = () => {
    setTabState("backdrops");
    localStorage.setItem("TvTabState", "backdrops");
  };

  const posterSelectionHandler = () => {
    setTabState("posters");
    localStorage.setItem("TvTabState", "posters");
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        { signal: abortCtrl.signal }
      );

      const res = await response.json();

      return res;
    }

    getRecommended()
      .then((data) => setTvRecommended(data.results))
      .catch((err) => console.log(err));

    return () => {
      abortCtrl.abort();
    };
  }, [props.id]);

  return (
    <>
      <TabWrapper className="my-5" tabCheck={tabState} tv={true}>
        <TabSlider tabCheck={tabState} tv={true} />
        <TabSelectionTitle tv={true} onClick={castSelectionHandler}>
          <TabIcon>
            <CastSvg color={tabState === "cast" ? "white" : "black"} />
          </TabIcon>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={seasonsSelectionHandler}>
          <TabIcon>
            <SeasonsSvg color={tabState === "seasons" ? "white" : "black"} />
          </TabIcon>
          Seasons
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={reviewSelectionHandler}>
          <TabIcon>
            <ReviewsSvg color={tabState === "reviews" ? "white" : "black"} />
          </TabIcon>
          Reviews
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={backdropSelectionHandler}>
          <TabIcon>
            <BackdropsSvg
              color={tabState === "backdrops" ? "white" : "black"}
            />
          </TabIcon>
          Backdrops
        </TabSelectionTitle>
        <TabSelectionTitle tv={true} onClick={posterSelectionHandler}>
          <TabIcon>
            <PostersSvg color={tabState === "posters" ? "white" : "black"} />
          </TabIcon>
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
