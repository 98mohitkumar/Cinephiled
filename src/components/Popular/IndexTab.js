import { useEffect, useState } from "react";
import PopularMovies from "./PopularMovies";
import TabSelector from "./Tab";
import PopularTV from "./PopularTV";
import TrendingMovies from "../Trending/TrendingMovies";
import TrendingTv from "../Trending/TrendingTv";

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [isMovies, setIsMovies] = useState(true);

  let tabState = null;

  useEffect(() => {
    tabState = localStorage.getItem("movieTab");
    tabState === "false" && setIsMovies(false);
  }, []);

  const tabSelectionHandlerMovies = () => {
    localStorage.setItem("movieTab", true);
    setIsMovies(true);
  };

  const tabSelectionHandlerTV = () => {
    localStorage.setItem("movieTab", false);
    setIsMovies(false);
  };

  moviesData.splice(15);
  TVData.splice(15);

  return (
    <>
      <TabSelector
        isMovies={isMovies}
        ClickMovies={tabSelectionHandlerMovies}
        ClickTV={tabSelectionHandlerTV}
      />
      <h1 className="display-5 fw-bold text-white text-center my-4">
        What&#39;s Popular
      </h1>
      {isMovies && (
        <>
          <PopularMovies movies={moviesData} />
          <h1 className="display-5 fw-bold text-white text-center my-4">
            Trending Today
          </h1>
          <TrendingMovies movies={trendingMovies} />
        </>
      )}
      {!isMovies && (
        <>
          <PopularTV TV={TVData} />
          <h1 className="display-5 fw-bold text-white text-center my-4">
            Trending Today
          </h1>
          <TrendingTv Tv={trendingTv} />
        </>
      )}
    </>
  );
};

export default IndexTab;
