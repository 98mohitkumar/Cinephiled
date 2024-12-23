import { motion } from "motion/react";
import { Fragment } from "react";

import { usePalette } from "hooks/usePalette";
import { cn } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

import { colorOverlayStyles } from "./DominantColorStyles";

const DominantColor = ({ image, tint = false, flip = false, isUsingBackdrop = false, className = "" }) => {
  const imageType = {
    type: isUsingBackdrop ? "backdrop" : "poster",
    size: isUsingBackdrop ? "w533_and_h300_bestv2" : "w300_and_h450_bestv2"
  };

  const { palette, done } = usePalette(image ? getTMDBImage({ path: image, type: imageType.type, size: imageType.size }) : "");

  return (
    <Fragment>
      {done ? (
        <motion.div
          css={colorOverlayStyles}
          initial={{ opacity: 0 }}
          animate={{
            opacity: tint ? 0.4 : 1,
            transition: { duration: 2.5, ease: [0.77, 0, 0.175, 1] }
          }}
          className={cn("absolute", { tint: tint }, className)}
          $flip={+flip}
          $palette={palette}
        />
      ) : null}
    </Fragment>
  );
};

export default DominantColor;
