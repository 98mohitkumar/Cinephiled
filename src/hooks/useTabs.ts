import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const tabsAtom = atomWithStorage("tabComponentStates", {
  indexTab: "movies",
  movieTab: "overview",
  tvTab: "overview",
  profileTab: "watchlist",
  profileMediaTab: "movies",
  searchTab: "movies",
  watchProvidersTab: "movies",
  personPageTab: "movies"
});

const useTabs = ({ tabLocation }: { tabLocation: keyof typeof tabsAtom }) => {
  const [activeTabs, setActiveTabs] = useAtom(tabsAtom);

  const setTab = (key: string) => {
    if (key !== activeTabs[tabLocation as keyof typeof activeTabs]) {
      setActiveTabs({ ...activeTabs, [tabLocation]: key });
    }
  };

  return {
    activeTab: activeTabs[tabLocation as keyof typeof activeTabs],
    setTab
  };
};

export default useTabs;
