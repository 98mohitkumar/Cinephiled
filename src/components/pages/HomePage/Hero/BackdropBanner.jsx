import Image from "next/image";

import { blurPlaceholder } from "data/global";

import { heroBanner } from "./HeroStyles";

const BackdropBanner = ({ posters }) => {
  return (
    <div css={heroBanner}>
      {posters.map(({ src, id }, index) => (
        <div key={`${id}-${index}`} className='relative aspect-[0.666]'>
          <Image
            fill
            style={{ objectFit: "cover" }}
            placeholder='blur'
            priority
            blurDataURL={blurPlaceholder}
            src={`https://image.tmdb.org/t/p/w185${src}`}
            alt='poster'
          />
        </div>
      ))}
    </div>
  );
};

export default BackdropBanner;
