import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { useRouter } from "next/router";
import { Fragment } from "react";
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

const PersonPageTab = ({ movieCredits, tvCredits }) => {
  const { activeTab, setTab } = useTabs({ tabLocation: "personPageTab", defaultState: "movies" });
  const router = useRouter();
  const { department: currentSelectedDepartment } = router.query;

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

    setTimeout(() => {
      if (key === "all") {
        router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
      } else {
        router.replace(router.asPath.split("?")[0] + `?department=${key}`, undefined, {
          shallow: true
        });
      }
    }, 100);
  };

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
              <div className='max-w-[160px] mb-6 ml-auto'>
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
                  handleChange={handleSelect}
                />
              </div>

              {creditsToRender?.length > 0 ? (
                <MoviesTemplate movies={creditsToRender} creditsPage />
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
              <div className='max-w-[160px] mb-6 ml-auto'>
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
                  handleChange={handleSelect}
                />
              </div>

              {creditsToRender?.length > 0 ? (
                <TVTemplate TV={creditsToRender} creditsPage />
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
