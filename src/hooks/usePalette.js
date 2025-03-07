import { extractColorsFromSrc } from "extract-colors";
import { useEffect, useState } from "react";

import { CORS_PROXY } from "data/apiEndpoints";

export function usePalette(src) {
  const [palette, setPalette] = useState({ palette: [], done: false });

  useEffect(() => {
    if (!src) {
      setPalette({ palette: [], done: true });
      return;
    }

    extractColorsFromSrc(`${CORS_PROXY}?q=${src}`, {
      crossOrigin: "anonymous"
    })
      .then((colors) => {
        setPalette({
          palette: colors.sort((a, b) => b.intensity - a.intensity).map(({ hex }) => hex),
          done: true
        });
      })
      .catch(() => {
        setPalette({ palette: [], done: true });
      });

    return () => {
      setPalette({ palette: [], done: true });
    };
  }, [src]);

  return palette;
}
