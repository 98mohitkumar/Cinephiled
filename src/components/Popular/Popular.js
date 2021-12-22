import { useState } from "react";
import PopularMovies from "./PopularMovies";
import TabSelector from "./Tab";
import PopularTV from "./PopularTV";

const Popular = ({ moviesData, TVData }) => {
  const [isMovies, setIsMovies] = useState(true);
  const tabSelectionHandlerMovies = () => {
    setIsMovies(true);
  };

  const tabSelectionHandlerTV = () => {
    setIsMovies(false);
  };

  moviesData.splice(15);
  TVData.splice(15);

  return (
    <>
      <h1 className="display-3 fw-bold mx-5 text-white text-center my-5">
        What&#39;s Popular
      </h1>
      <TabSelector
        isMovies={isMovies}
        ClickMovies={tabSelectionHandlerMovies}
        ClickTV={tabSelectionHandlerTV}
      />
      {isMovies && <PopularMovies movies={moviesData} />}
      {!isMovies && <PopularTV TV={TVData} />}
    </>
  );
};

export default Popular;
