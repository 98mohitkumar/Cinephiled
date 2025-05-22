import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initialValues = {
  indexTab: "movies",
  movieTab: "overview",
  tvTab: "overview",
  profileTab: "watchlist",
  profileMediaTab: "movies",
  searchTab: "movies",
  watchProvidersTab: "movies",
  personPageTab: "movies",
  keywordTab: "movies",
  companyTab: "movies"
};

const tabsAtom = atomWithStorage("tabComponentStates", initialValues);

const useTabs = ({ tabLocation }: { tabLocation: keyof typeof initialValues }) => {
  const [activeTabs, setActiveTabs] = useAtom(tabsAtom);

  const setTab = (key: string) => {
    if (key !== activeTabs[tabLocation as keyof typeof activeTabs]) {
      setActiveTabs({ ...activeTabs, [tabLocation]: key });
    }
  };

  return {
    activeTab: activeTabs[tabLocation as keyof typeof activeTabs] || initialValues[tabLocation as keyof typeof initialValues],
    setTab
  };
};

export default useTabs;
