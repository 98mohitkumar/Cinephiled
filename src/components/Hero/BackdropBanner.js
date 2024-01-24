import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Banner } from "./HeroStyles";

const BackdropBanner = ({ posters }) => {
  posters.sort(() => Math.random() - 0.5);

  return (
    <Banner>
      {posters.map(({ src, id }) => (
        <div key={id} className='relative aspect-[0.666]'>
          <Image
            layout='fill'
            objectFit='cover'
            placeholder='blur'
            loading='eager'
            blurDataURL={blurPlaceholder}
            src={`https://image.tmdb.org/t/p/w185${src}`}
            alt={`poster-${id}`}
          />
        </div>
      ))}
    </Banner>
  );
};

export default BackdropBanner;
