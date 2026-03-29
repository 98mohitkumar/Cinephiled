import { Fragment } from "react";

import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import { mediaTypeTabList } from "data/global";
import useTabs from "hooks/useTabs";
import { matches } from "utils/helper";

export const ProfileMediaTab = ({ children, tabCounts = {} }) => {
  const { activeTab, setTab } = useTabs({
    tabLocation: "profileMediaTab"
  });

  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  return (
    <Fragment>
      <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex} className='mb-3248'>
        {mediaTypeTabList.map(({ key, title: label }) => {
          const count = tabCounts?.[key];
          const hasCount = tabCounts !== undefined && typeof count === "number" && !Number.isNaN(count);
          const title = hasCount ? `${label} (${count})` : label;

          return (
            <TabItem key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""} title={title}>
              {title}
            </TabItem>
          );
        })}
      </Tabs>

      {children(activeTab)}
    </Fragment>
  );
};
