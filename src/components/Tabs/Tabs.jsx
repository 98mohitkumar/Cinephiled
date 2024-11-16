import { useEffect, useRef } from "react";
import { ActiveTabIndicator, tabItemStyles, activeHighlighter, tabWrapperStyles, TabContainer, TabSelector } from "./TabsStyles";
import { cn } from "utils/helper";

export const Tabs = ({ tabItemsCount, activeItemIndex, children, ...props }) => {
  return (
    <div
      css={tabWrapperStyles}
      $tabItemsCount={tabItemsCount}
      //  $styling={styling?.tabStyling}
      {...props}>
      <div css={activeHighlighter} $activeItemIndex={activeItemIndex} $tabItemsCount={tabItemsCount} />

      {/* tab items */}
      {children}
    </div>
  );
};

export const TabItem = ({ children, className, ...props }) => {
  return (
    <div role='button' css={tabItemStyles} className={cn("p-16 text-h6 max-sm:py-12", className)} {...props}>
      {children}
    </div>
  );
};

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
