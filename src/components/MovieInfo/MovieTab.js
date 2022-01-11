import { useState, useEffect } from "react";
import BackdropsSvg from "../Svg/backdrops";
import CastSvg from "../Svg/cast";
import PostersSvg from "../Svg/posters";
import ReviewsSvg from "../Svg/reviews";
import MovieBackdrops from "./MovieBackdrops";
import MovieCast from "./MovieCast";
import MoviePosters from "./MoviePosters";
import MovieRecommendations from "./MovieRecommendations";
import MovieReviews from "./MovieReviews";
import {
  TabIcon,
  TabSelectionTitle,
  TabSlider,
  TabWrapper,
} from "./MovieTabStyles";

const MovieTab = (props) => {
  const [tabState, setTabState] = useState("cast");
  const [moviesRecommended, setMoviesRecommended] = useState([]);

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

  useEffect(() => {
    const abortCtrl = new AbortController();

    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        { signal: abortCtrl.signal }
      );

      const res = await response.json();

      return res;
    }

    getRecommended()
      .then((data) => setMoviesRecommended(data.results))
      .catch((err) => console.log(err));

    return () => {
      abortCtrl.abort();
    };
  }, [props.id]);

  return (
    <>
      <TabWrapper className="my-5" tabCheck={tabState}>
        <TabSlider tabCheck={tabState} />
        <TabSelectionTitle onClick={castSelectionHandler}>
          <TabIcon>
            <CastSvg color={tabState === "cast" ? "white" : "black"} />
          </TabIcon>
          Cast
        </TabSelectionTitle>
        <TabSelectionTitle onClick={reviewSelectionHandler}>
          <TabIcon>
            <ReviewsSvg color={tabState === "reviews" ? "white" : "black"} />
          </TabIcon>
          Reviews
        </TabSelectionTitle>
        <TabSelectionTitle onClick={backdropSelectionHandler}>
          <TabIcon>
            <BackdropsSvg
              color={tabState === "backdrops" ? "white" : "black"}
            />
          </TabIcon>
          Backdrops
        </TabSelectionTitle>
        <TabSelectionTitle onClick={posterSelectionHandler}>
          <TabIcon>
            <PostersSvg color={tabState === "posters" ? "white" : "black"} />
          </TabIcon>
          Posters
        </TabSelectionTitle>
      </TabWrapper>
      {tabState === "cast" && <MovieCast cast={props.cast} />}
      {tabState === "reviews" && <MovieReviews reviews={props.reviews} />}
      {tabState === "backdrops" && (
        <MovieBackdrops backdrops={props.backdrops} />
      )}
      {tabState === "posters" && <MoviePosters posters={props.posters} />}
      <h1 className="display-6 fw-bold text-white text-center">
        Recommendations
      </h1>
      <MovieRecommendations movies={moviesRecommended} />
    </>
  );
};

export default MovieTab;
