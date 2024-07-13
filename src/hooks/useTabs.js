import { useLayoutEffect, useState } from "react";

const useTabs = ({ tabLocation, defaultState = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultState);

  useLayoutEffect(() => {
    const tabStates = JSON.parse(localStorage.getItem("tabStates")) || {};

    if (tabStates[tabLocation]) {
      setActiveTab(tabStates[tabLocation]);
    } else {
      setActiveTab(defaultState);
    }
  }, [tabLocation, defaultState]);

  const setTab = (key) => {
    if (key === activeTab) return;

    localStorage.setItem(
      "tabStates",
      JSON.stringify({ ...JSON.parse(localStorage.getItem("tabStates")), [tabLocation]: key })
    );

    setActiveTab(key);
  };

  return { activeTab, setTab };
};

export default useTabs;
