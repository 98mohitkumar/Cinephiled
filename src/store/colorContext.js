import React from "react";

let initialState = {
  colorsArr: [],
};

const ColorsContext = React.createContext(initialState);

export const ColorsContextProvider = (props) => {
  function updateCtx(colors) {
    initialState.colorsArr.push(colors);
  }

  function clearInit() {
    initialState.colorsArr = [];
  }

  return (
    <ColorsContext.Provider value={{ initialState, updateCtx, clearInit }}>
      {props.children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
