import { extractColorsFromSrc } from "extract-colors";
import { useEffect, useState } from "react";

export function usePalette(src) {
  const [palette, setPalette] = useState({ palette: [], done: false });

  useEffect(() => {
    if (!src) {
      setPalette({ palette: [], done: true });
      return;
    }

    extractColorsFromSrc(src, {
      crossOrigin: "anonymous"
    })
      .then((colors) => {
        setPalette({
          palette: colors.sort((a, b) => (b.hue - a.hue ? 1 : -1)).map(({ hex }) => hex),
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
