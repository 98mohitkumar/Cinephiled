import { Tab, Slider, MovieSelection, TVSelection } from './PopularStyles';

const TabSelector = ({ isMovies, ClickMovies, ClickTV }) => {
  return (
    <Tab>
      <Slider isMovies={isMovies} />
      <MovieSelection isMovies={isMovies} onClick={ClickMovies}>
        Movies
      </MovieSelection>
      <TVSelection isMovies={isMovies} onClick={ClickTV}>
        TV Shows
      </TVSelection>
    </Tab>
  );
};

export default TabSelector;
