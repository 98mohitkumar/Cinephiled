/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "motion/react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import { opacityMotionTransition } from "data/global";
import { cn } from "utils/helper";
import { getSrcSet, getTMDBImage } from "utils/imageHelper";

import { heroBackgroundStyles } from "./MediaHeroBackgroundStyles";

const MediaHeroBackground = ({ backdropPath, posterPath, alt }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div css={heroBackgroundStyles} className={cn({ "no-backdrop": !backdropPath })} key={backdropPath} {...opacityMotionTransition}>
        <img
          alt={alt}
          fetchPriority='high'
          loading='eager'
          className='image'
          sizes='100vw'
          src={getTMDBImage({ path: backdropPath, type: "backdrop", size: "w1280", fallback: "/images/transparent.png" })}
          srcSet={getSrcSet({
            type: "backdrop",
            path: backdropPath,
            imageSizes: [
              { screenWidth: 1280, imageSize: "w1280" },
              { screenWidth: 786, imageSize: "w780" }
            ]
          })}
        />
        <DominantColor image={posterPath} className='z-0 mix-blend-overlay' key={posterPath} />
      </motion.div>
    </AnimatePresence>
  );
};

export default MediaHeroBackground;
