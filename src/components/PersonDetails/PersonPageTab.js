import MoviesTemplate from "components/MediaTemplate/MoviesTemplate";
import TVTemplate from "components/MediaTemplate/TVTemplate";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
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

const Select = ({ departmentList }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { department } = router.query;
  const options = [
    { key: "all", name: "All" },
    ...departmentList.map((item) => ({ key: item?.toLowerCase(), name: item }))
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.closest(".dropdown-toggle") === null) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
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

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} setTab={tabStateHandler} />

      <ModulesWrapper>
        <AnimatePresence initial={false} exitBeforeEnter>
          {activeTab === "movies" && (
            <motion.div
              key='movies'
              variants={framerTabVariants}
              initial='hidden'
              animate='visible'
              exit='hidden'
              transition={{ duration: 0.5 }}>
              <Select departmentList={departmentList} />

              {creditsToRender?.length ? (
                <MoviesTemplate movies={creditsToRender} creditsPage />
              ) : (
                <div className='text-center text-3xl font-semibold min-h-[10vw] grid place-items-center'>
                  No Movie credits yet
                </div>
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
              transition={{ duration: 0.5 }}>
              <Select departmentList={departmentList} />

              {creditsToRender?.length ? (
                <TVTemplate TV={creditsToRender} creditsPage />
              ) : (
                <div className='text-center text-3xl font-semibold min-h-[10vw] grid place-items-center'>
                  No TV show credits yet
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ModulesWrapper>
    </Fragment>
  );
};

export default PersonPageTab;
