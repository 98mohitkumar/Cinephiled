import { useContext, useEffect, useState } from "react";
import ColorsContext from "../../store/colorContext";
import { MovieTitle } from "./MovieDetailsStyles";

const MovieDetails = ({ movieDetailsData, date }) => {
  const { initialState, clearInit } = useContext(ColorsContext);
  const [isDark, setIsDark] = useState(true);
  const [luma, setLuma] = useState("");

  console.log("fired");

  useEffect(() => {
    setTimeout(() => {
      setLuma(initialState.lumaEval);
      if (luma === "light") {
        setIsDark(false);
      }
    }, 1500);
  });

  setTimeout(() => {
    clearInit();
  }, 3000);

  return (
    <>
      <MovieTitle isDark={isDark}>
        {movieDetailsData.title} ({date})
      </MovieTitle>
    </>
  );
};

export default MovieDetails;
