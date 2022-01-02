import Link from "next/link";
import {
  MoviesSection,
  Cards,
  CardImg,
  Rating,
  MoviesInfo,
  MoviesInfoTitle,
  ReleaseDate,
} from "./PopularStyles";
import { motion } from "framer-motion";

const PopularMovies = (props) => {
  let arr = [];

  function releaseDates() {
    props.movies.forEach((item) =>
      arr.push(
        new Date(item.release_date.toString()).toDateString().slice(4, -5) +
          ", " +
          new Date(item.release_date.toString()).getFullYear()
      )
    );
  }
  releaseDates();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 0.992, opacity: 1 }}
    >
      <MoviesSection className="p-5">
        {props.movies.length > 0 &&
          props.movies.map((movies, i) => (
            <Cards key={movies.id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={"/movies/" + movies.id} passHref>
                  <CardImg
                    data={movies.poster_path}
                    className="d-flex justify-content-end"
                  >
                    <Rating className="d-flex justify-content-center align-items-center me-3">
                      {movies.vote_average}
                    </Rating>
                  </CardImg>
                </Link>
              </motion.div>
              <MoviesInfo>
                <MoviesInfoTitle>{movies.title}</MoviesInfoTitle>
                <ReleaseDate>{arr[i]}</ReleaseDate>
              </MoviesInfo>
            </Cards>
          ))}
      </MoviesSection>
    </motion.div>
  );
};

export default PopularMovies;
