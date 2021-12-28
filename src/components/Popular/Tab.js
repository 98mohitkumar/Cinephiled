import { Tab, Slider, MovieSelection, TVSelection } from "./PopularStyles";

const TabSelector = (props) => {
  return (
    <Tab>
      <Slider isMovies={props.isMovies} />
      <MovieSelection isMovies={props.isMovies} onClick={props.ClickMovies}>
        Movies
      </MovieSelection>
      <TVSelection isMovies={props.isMovies} onClick={props.ClickTV}>
        TV Shows
      </TVSelection>
    </Tab>
  );
};

export default TabSelector;
