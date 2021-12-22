import React from "react";
import lightOrDark from "../functions/luma";

let initialState = {
  colorsArr: [],
  lumaEval: "",
};

const ColorsContext = React.createContext(initialState);

export const ColorsContextProvider = (props) => {
  function updateCtx(colors) {
    initialState.colorsArr.push(colors);
    initialState.lumaEval = lightOrDark(initialState.colorsArr[0] + "eb");
  }

  function clearInit() {
    initialState.lumaEval = "";
    initialState.colorsArr = [];
  }

  return (
    <ColorsContext.Provider value={{ initialState, updateCtx, clearInit }}>
      {props.children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
