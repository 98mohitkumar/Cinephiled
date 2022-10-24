import { Tab, Slider, Selection } from './IndexTabStyles';

const TabSelector = ({ tabState, tabHandler }) => {
  return (
    <Tab>
      <Slider state={tabState} />
      <Selection
        isActive={tabState === 'movies'}
        onClick={() => tabHandler('movies')}
      >
        Movies
      </Selection>
      <Selection isActive={tabState === 'TV'} onClick={() => tabHandler('TV')}>
        TV Shows
      </Selection>
    </Tab>
  );
};

export default TabSelector;
