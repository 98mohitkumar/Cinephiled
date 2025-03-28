import { motion } from "motion/react";
import { Fragment } from "react";

import { usePalette } from "hooks/usePalette";
import { cn } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

import { colorOverlayStyles, tintedColorOverlayStyles } from "./DominantColorStyles";

const DominantColor = ({ image, tint = false, isUsingBackdrop = false, angle, className = "" }) => {
  const imageType = {
    type: isUsingBackdrop ? "backdrop" : "poster",
    size: isUsingBackdrop ? "w780" : "w500"
  };

  const { palette, done } = usePalette(image ? getTMDBImage({ path: image, type: imageType.type, size: imageType.size }) : "");

  return (
    <Fragment>
      {done ? (
        <motion.div
          css={tint ? tintedColorOverlayStyles : colorOverlayStyles}
          initial={{ opacity: 0 }}
          animate={{
            opacity: tint ? 0.4 : 1,
            transition: { duration: 2.5, ease: [0.77, 0, 0.175, 1] }
          }}
          className={cn("absolute inset-0", className)}
          $angle={angle}
          $palette={palette}
        />
      ) : null}
    </Fragment>
  );
};

export default DominantColor;
