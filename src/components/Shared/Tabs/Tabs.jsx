import { useEffect, useRef } from "react";

import P from "components/UI/Typography/P";
import { cn, matches } from "utils/helper";

import { ActiveTabIndicator, tabItemStyles, activeHighlighter, tabWrapperStyles, TabContainer } from "./TabsStyles";

export const Tabs = ({ tabItemsCount, activeItemIndex, children, ...props }) => {
  return (
    <div css={tabWrapperStyles} $tabItemsCount={tabItemsCount} {...props}>
      <div css={activeHighlighter} $activeItemIndex={activeItemIndex} $tabItemsCount={tabItemsCount} />

      {/* tab items */}
      {children}
    </div>
  );
};

export const TabItem = ({ children, className, ...props }) => {
  return (
    <div role='button' css={tabItemStyles} className={cn("text-h6", className)} {...props}>
      {children}
    </div>
  );
};

export const LinearTabs = ({ tabList, currentTab, setTab }) => {
  const tabContainerRef = useRef(null);

  useEffect(() => {
    // find active tab node and scroll to it
    const activeTab = tabContainerRef.current.querySelector(".active");
    if (activeTab) {
      tabContainerRef.current.scrollLeft = activeTab.offsetLeft - 150;
    }
  }, [currentTab]);

  return (
    <TabContainer ref={tabContainerRef} className={cn("mx-auto overflow-x-auto", "flex items-center", "border-b border-neutral-500")}>
      {tabList.map(({ key, name }) => (
        <div
          key={key}
          title={name}
          style={{ width: `${100 / tabList.length}%` }}
          className={cn(
            `min-w-max`,
            "px-32 py-16 text-neutral-400 transition-colors can-hover:text-white",
            "grid place-items-center",
            "cursor-pointer whitespace-nowrap",
            {
              "active relative text-white": matches(key, currentTab)
            }
          )}
          onClick={() => setTab(key)}
          role='button'>
          <P weight='semibold' size='large'>
            {name}
          </P>
          {matches(key, currentTab) && <ActiveTabIndicator />}
        </div>
      ))}
    </TabContainer>
  );
};
