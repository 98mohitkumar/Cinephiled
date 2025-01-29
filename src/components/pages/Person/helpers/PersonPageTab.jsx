import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

import PlaceholderText from "components/PlaceholderText";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import FlexBox from "components/UI/FlexBox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import { mediaTypeTabList, sortOptions } from "data/global";
import useSort from "hooks/useSort";
import useTabs from "hooks/useTabs";
import { getSortedItems } from "utils/getSortedItems";
import { framerTabVariants, matches } from "utils/helper";

import PersonPageTabMediaTemplate from "./PersonPageTabMediaTemplate";

const PersonPageTab = ({ movieCredits, tvCredits, movieDepartmentList, tvDepartmentList }) => {
  const router = useRouter();
  const { activeTab, setTab } = useTabs({ tabLocation: "personPageTab" });
  const { localOptions } = sortOptions;
  const defaultSortOption = localOptions.find((option) => option?.isDefault)?.value;
  const { sortBy, handleSortSelection } = useSort({ shallow: true, defaultSortOption });
  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  const { sortBy: department, handleSortSelection: handleFilterSelection } = useSort({
    shallow: true,
    defaultSortOption: "all",
    key: "department"
  });

  const tabStateHandler = (key) => {
    setTab(key);

    // reset query params when tab changes
    if (sortBy || department) {
      router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
    }
  };

  // coditional department list (based on active tab)
  const departmentList = [
    { label: "All Departments", value: "all" },
    ...(matches(activeTab, "movies") ? movieDepartmentList : tvDepartmentList).sort((a, b) => a.label.localeCompare(b.label))
  ];

  // conditional items (based on active tab and filters)
  const items = getSortedItems({
    items: matches(activeTab, "movies") ? movieCredits : tvCredits,
    sortBy: sortBy.split(".")[0],
    order: sortBy.split(".")[1]
  }).filter((item) => (matches(department, "all") ? true : item.department.includes(department)));

  return (
    <Fragment>
      <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex}>
        {mediaTypeTabList.map(({ key, title }) => (
          <TabItem key={key} onClick={() => tabStateHandler(key)} className={matches(activeTab, key) ? "active" : ""} title={title}>
            {title}
          </TabItem>
        ))}
      </Tabs>

      <FlexBox className='mt-32 justify-end gap-16'>
        <Select value={sortBy} onValueChange={handleSortSelection}>
          <SelectTrigger className='w-fit min-w-[250px]'>
            <SelectValue placeholder='Sort By:' />
          </SelectTrigger>
          <SelectContent position='popper' align='end'>
            {localOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={department} onValueChange={handleFilterSelection}>
          <SelectTrigger className='w-fit min-w-[250px]'>
            <SelectValue placeholder='Filter By Department' />
          </SelectTrigger>
          <SelectContent position='popper' align='end'>
            {departmentList.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FlexBox>

      <div className='mt-32'>
        <AnimatePresence initial={false} mode='wait'>
          {matches(activeTab, "movies") && (
            <motion.div key='movies' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {movieCredits?.length > 0 ? (
                <PersonPageTabMediaTemplate media={items} />
              ) : (
                <PlaceholderText height='large'>No Movie credits yet</PlaceholderText>
              )}
            </motion.div>
          )}

          {matches(activeTab, "tv") && (
            <motion.div key='tv' variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
              {tvCredits?.length > 0 ? (
                <PersonPageTabMediaTemplate media={items} />
              ) : (
                <PlaceholderText height='large'>No TV Show credits yet</PlaceholderText>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default PersonPageTab;
