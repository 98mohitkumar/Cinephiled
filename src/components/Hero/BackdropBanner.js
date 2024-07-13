import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Banner } from "./HeroStyles";

const BackdropBanner = ({ posters }) => {
  return (
    <Banner>
      {posters.map(({ src, id }, index) => (
        <div key={`${id}-${index}`} className='relative aspect-[0.666]'>
          <Image
            fill
            style={{ objectFit: "cover" }}
            placeholder='blur'
            loading='eager'
            blurDataURL={blurPlaceholder}
            src={`https://image.tmdb.org/t/p/w185${src}`}
            alt='poster'
          />
        </div>
      ))}
    </Banner>
  );
};

export default BackdropBanner;
