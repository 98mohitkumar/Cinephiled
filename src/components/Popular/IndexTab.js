import { useEffect, useState } from "react";
import PopularMovies from "./PopularMovies";
import TabSelector from "./Tab";
import PopularTV from "./PopularTV";
import TrendingMovies from "../Trending/TrendingMovies";
import TrendingTv from "../Trending/TrendingTv";
import { AnimatePresence, motion } from "framer-motion";

const IndexTab = ({ moviesData, TVData, trendingMovies, trendingTv }) => {
  const [isMovies, setIsMovies] = useState(true);

  useEffect(() => {
    const tabState = localStorage.getItem("movieTab");
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
      <AnimatePresence exitBeforeEnter initial={false}>
        {isMovies && (
          <motion.div
            key="movies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopularMovies movies={moviesData} />
            <h1 className="display-5 fw-bold text-white text-center my-4">
              Trending Today
            </h1>
            <TrendingMovies movies={trendingMovies} />
          </motion.div>
        )}

        {!isMovies && (
          <motion.div
            key="tv"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PopularTV TV={TVData} />
            <h1 className="display-5 fw-bold text-white text-center my-4">
              Trending Today
            </h1>
            <TrendingTv Tv={trendingTv} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IndexTab;
