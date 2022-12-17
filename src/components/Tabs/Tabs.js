import { Fragment, useCallback } from 'react';
import {
  ActiveTabIndicator,
  Selection,
  Slider,
  Tab,
  TabContainer,
  TabSelector
} from './TabsStyles';

const Tabs = ({ tabList, currentTab, setTab, styling, children, ...props }) => {
  const findIndex = useCallback(
    (item) => item.key === currentTab,
    [currentTab]
  );

  return (
    <Tab count={tabList.length} styling={styling?.tabStyling} {...props}>
      <Slider state={tabList.findIndex(findIndex)} count={tabList.length} />

      {children ?? (
        <Fragment>
          {tabList.map(({ key, name }) => (
            <Selection
              key={key}
              active={key === currentTab}
              onClick={() => setTab(key)}
              styling={styling?.tabTitleStyling}
            >
              {name}
            </Selection>
          ))}
        </Fragment>
      )}
    </Tab>
  );
};

export default Tabs;

export const LinearTabs = ({ tabList, currentTab, setTab, scrollRef }) => {
  const findIndex = useCallback(
    (item) => item.key === currentTab,
    [currentTab]
  );

  return (
    <TabContainer ref={scrollRef}>
      <Fragment>
        {tabList.map(({ key, name }) => (
          <TabSelector
            key={key}
            count={tabList.length}
            active={key === currentTab}
            onClick={() => setTab(key)}
            className={key === currentTab && 'position-relative'}
          >
            {name}
            {key === currentTab && (
              <ActiveTabIndicator
                state={tabList.findIndex(findIndex)}
                count={tabList.length}
              />
            )}
          </TabSelector>
        ))}
      </Fragment>
    </TabContainer>
  );
};
