import Vibrant from "node-vibrant";
import { useEffect, useReducer } from "react";

async function getPalette(src) {
  const palette = await Vibrant.from(src).getPalette();

  return Object.entries(palette).reduce(
    (acc, [key, value]) => ({ ...acc, [key.charAt(0).toLowerCase() + key.slice(1)]: value.hex }),
    {}
  );
}

const initialState = {
  loading: true,
  data: {},
  error: undefined
};

function reducer(state, action) {
  switch (action.type) {
    case "getPalette":
      return initialState;
    case "resolvePalette":
      return { ...state, data: action.payload, loading: false };
    case "rejectPalette":
      return { ...state, error: action.payload, loading: false };
  }
}

export function usePalette(src) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "getPalette" });

    getPalette(src)
      .then((palette) => {
        dispatch({ type: "resolvePalette", payload: palette });
      })
      .catch((ex) => {
        dispatch({ type: "rejectPalette", payload: ex });
      });

    return () => {
      dispatch({ type: "getPalette" });
    };
  }, [src]);

  return state;
}
