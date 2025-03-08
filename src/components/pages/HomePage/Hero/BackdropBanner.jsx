import Image from "next/image";

import { Grid } from "components/UI/Grid";
import { blurPlaceholder } from "data/global";
import { getTMDBImage } from "utils/imageHelper";

import { heroBanner } from "./HeroStyles";

const BackdropBanner = ({ posters }) => {
  return (
    <Grid css={heroBanner} className='gap-8' colConfig={{ xxs: 3, xs: 4, md: 6, xl: 8, "2xl": 10, "3xl": 12, "4xl": 14, "5xl": 16 }}>
      {posters.map(({ src, id }, index) => (
        <div key={`${id}-${index}`} className='poster-wrapper relative aspect-poster'>
          <Image
            fill
            placeholder='blur'
            priority
            blurDataURL={blurPlaceholder}
            src={getTMDBImage({ path: src, type: "poster", size: "w342" })}
            alt='poster'
            className='rounded-md object-cover'
          />
        </div>
      ))}
    </Grid>
  );
};

export default BackdropBanner;
