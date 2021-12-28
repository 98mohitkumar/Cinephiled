import { useState, useEffect } from "react";
import MovieBackdrops from "./MovieBackdrops";
import MovieCast from "./MovieCast";
import MoviePosters from "./MoviePosters";
import MovieRecommendations from "./MovieRecommendations";
import MovieReviews from "./MovieReviews";
import { TabSelectionTitle, TabSlider, TabWrapper } from "./MovieTabStyles";

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
    const api_key = process.env.NEXT_PUBLIC_API_KEY;

    async function getRecommended() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}/recommendations?api_key=${api_key}&language=en-US&page=1`
      );

      const res = await response.json();

      return res;
    }

    getRecommended().then((data) => setMoviesRecommended(data.results));
  }, [props.id]);

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
      <h1 className="display-6 fw-bold text-white text-center">
        Recommendations
      </h1>
      <MovieRecommendations movies={moviesRecommended} />
    </>
  );
};

export default MovieTab;
