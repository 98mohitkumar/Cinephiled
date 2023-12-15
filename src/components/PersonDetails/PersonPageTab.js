import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ModulesWrapper } from "styles/GlobalComponents";

const groupCredits = (credits) => {
  const groupedCredits = [];

  credits.forEach((credit) => {
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

const Select = ({ departmentList }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { department } = router.query;
  const options = [
    { key: "all", name: "All" },
    ...departmentList.map((item) => ({ key: item?.toLowerCase(), name: item }))
  ];

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown-toggle") === null) {
        setShowDropdown(false);
      }
    });
  }, []);

  const handleSelect = (key) => {
    setShowDropdown(false);
    const keyToCompare = department || "all";

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
    <div className='mb-6'>
      <div className='relative block w-fit ml-auto dropdown-toggle min-w-[160px]'>
        <div
          className='px-4 py-2 bg-neutral-600 rounded-lg text-lg inline-flex items-center justify-between gap-2 
          cursor-pointer hover:bg-neutral-700 transition-colors min-w-full w-max'
          onClick={() => setShowDropdown((prev) => !prev)}>
          <div className='capitalize'>{department || "All"}</div>
          <div className='mt-[2px] -mr-1 pointer-events-none'>
            {showDropdown ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
          </div>
        </div>

        {showDropdown && (
          <div
            className='absolute top-full right-0 min-w-full w-max
          shadow-lg z-10 mt-2 pb-4'>
            <div className='overflow-hidden rounded-lg min-w-full w-max'>
              {options.map(({ key, name }) => (
                <div
                  key={key}
                  className={`px-4 py-[6px] text-lg bg-neutral-600 hover:bg-neutral-700 transition-colors cursor-pointer [&:not(:last-child)]:border-b  border-neutral-500 ${
                    department === key && "bg-neutral-700"
                  }`}
                  onClick={() => handleSelect(key)}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PersonPageTab = ({ movieCredits, tvCredits }) => {
  const [tabState, setTabState] = useState("movies");
  const router = useRouter();
  const { department: currentSelectedDepartment } = router.query;

  const tabList = [
    { key: "movies", name: `Movies` },
    { key: "tv", name: `TV Shows` }
  ];

  const departmentList = Array.from(
    tabState === "movies"
      ? new Set(movieCredits.map((item) => item.department))
      : new Set(tvCredits.map((item) => item.department))
  );

  const creditsToRender = groupCredits(
    (tabState === "movies" ? movieCredits : tvCredits).filter((item) =>
      currentSelectedDepartment
        ? item.department.toLowerCase() === currentSelectedDepartment
        : item.department
    )
  );

  const tabStateHandler = () => {
    setTabState((prev) => (prev === "movies" ? "tv" : "movies"));
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  };

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={tabState} setTab={tabStateHandler} />

      <ModulesWrapper>
        <AnimatePresence initial={false} exitBeforeEnter>
          {tabState === "movies" && (
            <motion.div
              key='movies'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <Select departmentList={departmentList} />

              <MoviesTemplate movies={creditsToRender} creditsPage />
            </motion.div>
          )}

          {tabState === "tv" && (
            <motion.div
              key='tv'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <Select departmentList={departmentList} />

              <TVTemplate TV={creditsToRender} creditsPage />
            </motion.div>
          )}
        </AnimatePresence>
      </ModulesWrapper>
    </Fragment>
  );
};

export default PersonPageTab;
