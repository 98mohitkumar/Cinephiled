import Image from "next/image";

import FlexBox from "components/UI/FlexBox";
import { blurPlaceholder } from "data/global";
import { getTMDBImage } from "utils/imageHelper";

import { heroBanner } from "./GlobalComponents";

const BackdropBanner = ({ backdrops }) => {
  const backdropsArray = Array.from({ length: Math.ceil(backdrops.length / 7) }, (_, i) => backdrops.slice(i * 7, (i + 1) * 7));

  return (
    <FlexBox className='flex-col items-center gap-10' css={heroBanner}>
      {backdropsArray.map((backdrops, index) => (
        <FlexBox key={index} className='backdrops-row w-full items-center justify-center gap-10'>
          {backdrops.map(({ src, id }, index) => (
            <div key={`${id}-${index}`} className='backdrop-wrapper relative aspect-backdrop w-full'>
              <Image
                fill
                placeholder='blur'
                priority
                blurDataURL={blurPlaceholder}
                src={getTMDBImage({ path: src, type: "backdrop", size: "w300" })}
                alt='backdrop'
                className='rounded-sm object-cover'
              />
            </div>
          ))}
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export default BackdropBanner;
