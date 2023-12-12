import { motion } from "framer-motion";
import { Fragment, memo } from "react";
import useImageColor from "use-image-color";
import { Colorful } from "./DominantColorStyles";

const DominantColor = ({ image, backdrop = false, flip = false }) => {
  const pallete = useImageColor(
    image ? `https://image.tmdb.org/t/p/w500${image}` : "/Images/Hex.webp",
    {
      cors: true,
      colors: 2
    }
  );

  return (
    <Fragment>
      {pallete?.colors?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2.5, ease: [0.77, 0, 0.175, 1] } }}>
          <Colorful
            className={`absolute ${backdrop ? "backdrop" : ""}`}
            flip={flip}
            color={pallete.colors}
          />
        </motion.div>
      ) : null}
    </Fragment>
  );
};

export default memo(DominantColor);
