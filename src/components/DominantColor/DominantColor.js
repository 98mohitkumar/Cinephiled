import { motion } from "framer-motion";
import { usePalette } from "hooks/usePalette";
import { Fragment, memo } from "react";
import { Colorful } from "./DominantColorStyles";

const DominantColor = ({ image, tint = false, flip = false, isUsingBackdrop = false }) => {
  const prefix = isUsingBackdrop ? "w533_and_h300_bestv2" : "w300_and_h450_bestv2";
  const { palette, done } = usePalette(image ? `https://image.tmdb.org/t/p/${prefix}${image}` : "");

  return (
    <Fragment>
      {done ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2.5, ease: [0.77, 0, 0.175, 1] } }}>
          <Colorful className={`absolute ${tint ? "tint" : ""}`} flip={flip} palette={palette} />
        </motion.div>
      ) : null}
    </Fragment>
  );
};

export default memo(DominantColor);
