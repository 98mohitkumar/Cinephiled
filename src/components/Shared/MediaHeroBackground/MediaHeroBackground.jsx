/* eslint-disable @next/next/no-img-element */
import DominantColor from "components/Shared/DominantColor/DominantColor";
import { getSrcSet, getTMDBImage } from "utils/imageHelper";

import { heroBackgroundStyles } from "./MediaHeroBackgroundStyles";

const MediaHeroBackground = ({ backdropPath, posterPath, alt }) => {
  return (
    <div css={heroBackgroundStyles}>
      <img
        alt={alt}
        loading='eager'
        className='image'
        sizes='100vw'
        src={getTMDBImage({ path: backdropPath, type: "backdrop", size: "w1280", fallback: "/Images/transparent.png" })}
        srcSet={getSrcSet({
          type: "backdrop",
          path: backdropPath,
          imageSizes: [
            { screenWidth: 1440, imageSize: "original" },
            {
              screenWidth: 1280,
              imageSize: "w1280"
            },
            {
              screenWidth: 786,
              imageSize: "w780"
            }
          ]
        })}
      />

      <DominantColor image={posterPath} className='z-0 mix-blend-overlay' />
    </div>
  );
};

export default MediaHeroBackground;
