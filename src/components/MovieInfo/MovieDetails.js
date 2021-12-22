import { useContext, useEffect, useState } from "react";
import ColorsContext from "../../store/colorContext";
import { MovieTitle } from "./MovieDetailsStyles";

const MovieDetails = ({ movieDetailsData, date }) => {
  let tinycolor = require("tinycolor2");
  const { initialState, clearInit } = useContext(ColorsContext);
  const [isDarkColor, setIsDark] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let color = tinycolor(initialState.colorsArr[0] + "eb").isDark();
      setIsDark(color);
    }, 500);
  }, []);

  setTimeout(() => {
    clearInit();
  }, 3000);

  return (
    <>
      <MovieTitle isDark={isDarkColor}>
        {movieDetailsData.title} ({date})
      </MovieTitle>
    </>
  );
};

export default MovieDetails;
