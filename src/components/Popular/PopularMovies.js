import Link from "next/link";
import {
  PopularMoviesSection,
  Cards,
  PopularImg,
  Rating,
  PopularMovieInfo,
  PopularMovieInfoTitle,
  ReleaseDate,
} from "./PopularStyles";

const PopularMovies = (props) => {
  let arr = [];

  function releaseDates() {
    props.movies.forEach((item) =>
      arr.push(new Date(item.release_date.toString()).toDateString().slice(4))
    );
  }
  releaseDates();
  return (
    <PopularMoviesSection className="p-5">
      {props.movies.length > 0 &&
        props.movies.map((movies, i) => (
          <Cards key={movies.id}>
            <Link href={"/movies/" + movies.id} passHref>
              <PopularImg
                data={movies.poster_path}
                className="d-flex justify-content-end"
              >
                <Rating className="d-flex justify-content-center align-items-center me-3">
                  {movies.vote_average}
                </Rating>
              </PopularImg>
            </Link>
            <PopularMovieInfo>
              <PopularMovieInfoTitle>{movies.title}</PopularMovieInfoTitle>
              <ReleaseDate>{arr[i]}</ReleaseDate>
            </PopularMovieInfo>
          </Cards>
        ))}
    </PopularMoviesSection>
  );
};

export default PopularMovies;
