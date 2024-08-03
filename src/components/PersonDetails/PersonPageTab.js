import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { sortOptions } from "globals/constants";
import useTabs from "hooks/useTabs";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { getActiveSortKey, getSortedItems } from "src/utils/getSortedItems";
import { framerTabVariants } from "src/utils/helper";
import { ModulesWrapper } from "styles/GlobalComponents";

const groupCredits = (credits) => {
  const groupedCredits = [];
  const clonedCredits = structuredClone(credits);

  clonedCredits.forEach((credit) => {
    const existingCreditIndex = groupedCredits.findIndex(
      (groupedCredit) => groupedCredit.id === credit.id
    );
    if (existingCreditIndex >= 0) {
      groupedCredits[existingCreditIndex].job = [
        groupedCredits[existingCreditIndex].job,
        credit.job
      ].flat();
    } else {
      groupedCredits.push({ ...credit, job: [credit.job] });
    }
  });

  return groupedCredits;
};

const tabList = [
  { key: "movies", name: `Movies` },
  { key: "tv", name: `TV Shows` }
];

const SortSelections = ({
  handleDepartmentSelect,
  handleSortSelect,
  departmentList,
  currentSelectedDepartment,
  sortBy
}) => {
  return (
    <div className='mb-8 flex gap-4 justify-end flex-wrap'>
      <Select
        options={[
          { key: "all", value: "All" },
          ...departmentList.map((item) => ({
            key: item?.toLowerCase(),
            value: item
          }))
        ]}
        activeKey={currentSelectedDepartment || "all"}
        triggerText={currentSelectedDepartment || "All"}
        baseSizeOptions
        label='Department:'
        handleChange={handleDepartmentSelect}
      />

      <Select
        options={sortOptions.localOptions}
        activeKey={sortBy || "default"}
        triggerText={getActiveSortKey({
          options: sortOptions.localOptions,
          sortBy,
          defaultKey: "default"
        })}
        baseSizeOptions
        label='Sort By:'
        handleChange={handleSortSelect}
      />
    </div>
  );
};

const PersonPageTab = ({ movieCredits, tvCredits }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "personPageTab" });
  const router = useRouter();
  const query = router.query;
  const { department: currentSelectedDepartment, sortBy, id } = query;

  const departmentList = Array.from(
    activeTab === "movies"
      ? new Set(movieCredits.map((item) => item.department))
      : new Set(tvCredits.map((item) => item.department))
  );

  const creditsToRender = groupCredits(
    (activeTab === "movies" ? movieCredits : tvCredits).filter((item) =>
      currentSelectedDepartment
        ? item.department.toLowerCase() === currentSelectedDepartment
        : item.department
    )
  );

  const tabStateHandler = (key) => {
    setTab(key);
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  };

  const handleSelect = (key) => {
    const keyToCompare = currentSelectedDepartment || "all";

    if (key === keyToCompare) return;

    let newQuery;

    if (key === "all") {
      newQuery = { id, ...(sortBy ? { sortBy } : {}) };
    } else {
      newQuery = { ...query, department: key };
    }

    setTimeout(() => {
      router.replace({ href: router.asPath.split("?")[0], query: newQuery }, undefined, {
        shallow: true
      });
    }, 100);
  };

  const handleSortSelect = (key) => {
    const keyToCompare = sortBy || "default";

    if (key === keyToCompare) return;

    let newQuery;

    if (key === "default") {
      newQuery = {
        id,
        ...(currentSelectedDepartment ? { department: currentSelectedDepartment } : {})
      };
    } else {
      newQuery = { ...query, sortBy: key };
    }

    setTimeout(() => {
      router.replace({ href: router.asPath.split("?")[0], query: newQuery }, undefined, {
        shallow: true
      });
    }, 100);
  };

  const sortedItems =
    sortBy && creditsToRender.length > 1
      ? getSortedItems({
          items: creditsToRender,
          sortBy: sortBy?.split(".")[0],
          order: sortBy?.split(".")[1]
        })
      : creditsToRender;

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} setTab={tabStateHandler} />

      <ModulesWrapper>
        <AnimatePresence initial={false} mode='wait'>
          {activeTab === "movies" && (
            <motion.div
              key='movies'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.325 }}>
              <SortSelections
                handleDepartmentSelect={handleSelect}
                handleSortSelect={handleSortSelect}
                departmentList={departmentList}
                currentSelectedDepartment={currentSelectedDepartment}
                sortBy={sortBy}
              />

              {sortedItems?.length > 0 ? (
                <MoviesTemplate movies={sortedItems} creditsPage />
              ) : (
                <PlaceholderText>No Movie credits yet</PlaceholderText>
              )}
            </motion.div>
          )}

          {activeTab === "tv" && (
            <motion.div
              key='tv'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.325 }}>
              <SortSelections
                handleDepartmentSelect={handleSelect}
                handleSortSelect={handleSortSelect}
                departmentList={departmentList}
                currentSelectedDepartment={currentSelectedDepartment}
                sortBy={sortBy}
              />

              {sortedItems?.length > 0 ? (
                <TVTemplate TV={sortedItems} creditsPage />
              ) : (
                <PlaceholderText>No TV Show credits yet</PlaceholderText>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ModulesWrapper>
    </Fragment>
  );
};

export default PersonPageTab;
