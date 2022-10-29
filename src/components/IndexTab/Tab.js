import { Tab, Slider, Selection } from './IndexTabStyles';

const TabSelector = ({ tabState, tabHandler, tabRef, ...props }) => {
  return (
    <Tab ref={tabRef} {...props}>
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
