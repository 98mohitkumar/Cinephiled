import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tabsAtom = atomWithStorage("tabStates", {
  indexTab: "movies",
  movieTab: "cast",
  tvTab: "cast",
  profileTab: "watchlist",
  profileMediaTab: "movies",
  searchTab: "movies",
  watchProvidersTab: "movies",
  personPageTab: "movies"
});

const useTabs = ({ tabLocation }) => {
  const [activeTabs, setActiveTabs] = useAtom(tabsAtom);

  const setTab = (key) => {
    if (key === activeTabs[tabLocation]) return;
    setActiveTabs({ ...activeTabs, [tabLocation]: key });
  };

  return {
    activeTab: activeTabs[tabLocation],
    setTab
  };
};

export default useTabs;
