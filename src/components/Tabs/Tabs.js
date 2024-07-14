import { Fragment, useEffect, useRef } from "react";
import {
  ActiveTabIndicator,
  Selection,
  Slider,
  Tab,
  TabContainer,
  TabSelector
} from "./TabsStyles";

const Tabs = ({ tabList, currentTab, setTab, styling, children, ...props }) => {
  return (
    <Tab $count={tabList.length} $styling={styling?.tabStyling} {...props}>
      <Slider
        $state={tabList.findIndex((item) => item.key === currentTab)}
        $count={tabList.length}
      />

      {children ?? (
        <Fragment>
          {tabList.map(({ key, name }) => (
            <Selection
              key={key}
              $active={key === currentTab}
              onClick={() => setTab(key)}
              $styling={styling?.tabTitleStyling}>
              {name}
            </Selection>
          ))}
        </Fragment>
      )}
    </Tab>
  );
};

export default Tabs;

export const LinearTabs = ({ tabList, currentTab, setTab }) => {
  const tabContainerRef = useRef(null);

  useEffect(() => {
    if (currentTab === "recommendations" && tabContainerRef?.current && window.innerWidth < 550) {
      tabContainerRef.current.scrollLeft = 200;
    }
  }, [currentTab]);

  return (
    <TabContainer ref={tabContainerRef}>
      {tabList.map(({ key, name }) => (
        <TabSelector
          key={key}
          $count={tabList.length}
          $active={key === currentTab}
          onClick={() => setTab(key)}
          className={key === currentTab && "relative"}>
          {name}
          {key === currentTab && <ActiveTabIndicator />}
        </TabSelector>
      ))}
    </TabContainer>
  );
};
