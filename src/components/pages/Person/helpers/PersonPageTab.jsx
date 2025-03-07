import { ListFilter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "components/Shared/Drawer";
import PlaceholderText from "components/Shared/PlaceholderText";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { mediaTypeTabList, opacityMotionTransition, sortOptions } from "data/global";
import useSort from "hooks/useSort";
import useTabs from "hooks/useTabs";
import { getSortedItems } from "utils/getSortedItems";
import { matches } from "utils/helper";

import MediaFilters from "./MediaFilters";
import PersonPageTabMediaTemplate from "./PersonPageTabMediaTemplate";

const MobileFilterDrawer = (props) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
      <DrawerTrigger asChild className=''>
        <Button variant='secondary' size='large' className='hidden items-center gap-6 max-lg:flex' onClick={() => setDrawerOpen(true)}>
          <ListFilter size={18} />
          Apply Filters
        </Button>
      </DrawerTrigger>

      <DrawerContent className='min-h-96'>
        <div className='mx-auto w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>

          <P className='mt-16 px-16 text-neutral-400'>
            Sort and filter movie and TV show credits by department or other criteria to quickly find what you&apos;re looking for.
          </P>

          <DrawerFooter>
            <MediaFilters className='w-full' {...props} />

            <Button onClick={() => setDrawerOpen(false)} fullWidth weight='semibold' size='large'>
              Apply Filters
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

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

      <FlexBox className='mt-40 justify-end'>
        <FlexBox className='justify-end gap-16 max-lg:hidden'>
          <MediaFilters
            sortBy={sortBy}
            handleSortSelection={handleSortSelection}
            localOptions={localOptions}
            department={department}
            handleFilterSelection={handleFilterSelection}
            departmentList={departmentList}
          />
        </FlexBox>

        <MobileFilterDrawer
          sortBy={sortBy}
          handleSortSelection={handleSortSelection}
          localOptions={localOptions}
          department={department}
          handleFilterSelection={handleFilterSelection}
          departmentList={departmentList}
        />
      </FlexBox>

      <div className='mt-2032'>
        <AnimatePresence initial={false} mode='wait'>
          {matches(activeTab, "movies") && (
            <motion.div key='movies' {...opacityMotionTransition}>
              {movieCredits?.length > 0 ? (
                <PersonPageTabMediaTemplate media={items} />
              ) : (
                <PlaceholderText height='large'>No Movie credits yet</PlaceholderText>
              )}
            </motion.div>
          )}

          {matches(activeTab, "tv") && (
            <motion.div key='tv' {...opacityMotionTransition}>
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
