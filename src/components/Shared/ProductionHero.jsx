import { Link2, MapPin } from "lucide-react";
import Image from "next/image";

import BackdropBanner from "components/Shared/BackdropBanner";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { getTMDBImage } from "utils/imageHelper";

import { productionHeroWrapper } from "./GlobalComponents";

const ProductionHero = ({ details, backdrops, logo }) => {
  return (
    <div css={productionHeroWrapper}>
      <div className='absolute inset-0 z-1 overflow-hidden'>
        <BackdropBanner backdrops={backdrops} />
      </div>

      <div className='relative z-10 p-32 text-center'>
        <div className='logo-wrapper m-auto' style={{ "--aspectRatio": logo?.aspect_ratio }}>
          <Image
            src={`${getTMDBImage({ path: logo?.file_path, type: "logo", size: "w300_filter(negate,555,000)" })}`}
            alt={`${details?.name}-poster`}
            fill
            priority
            className='object-contain'
          />
        </div>

        <FlexBox className='mt-2440 flex-wrap items-center justify-center gap-x-1632 gap-y-8 max-sm:flex-col'>
          <P weight='semibold' size='large'>
            {details.name}
          </P>

          {details?.headquarters || details?.origin_country ? (
            <FlexBox className='items-center gap-6'>
              <MapPin size={20} />
              <P weight='semibold' size='large'>
                {details.headquarters || details.origin_country}
              </P>
            </FlexBox>
          ) : null}

          {details.homepage ? (
            <FlexBox className='items-center gap-6'>
              <Link2 size={20} />
              <P
                tag='a'
                href={details?.homepage}
                target='_blank'
                rel='noopener noreferrer'
                className='underline decoration-dotted underline-offset-4 transition-colors can-hover:text-cyan-300'
                weight='semibold'
                size='large'>
                Homepage
              </P>
            </FlexBox>
          ) : null}
        </FlexBox>
      </div>
    </div>
  );
};

export default ProductionHero;
