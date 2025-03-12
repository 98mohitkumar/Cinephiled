import { memo } from "react";

import GlobalSearch from "components/Shared/GlobalSearch/GlobalSearch";
import FlexBox from "components/UI/FlexBox";

import BackdropBanner from "./BackdropBanner";
import { hero } from "./HeroStyles";

const Hero = ({ backdrops = [] }) => (
  <div className='relative mb-auto h-[400px] w-full sm:h-[500px]'>
    <div className='absolute inset-0 -z-1 overflow-hidden'>
      <BackdropBanner backdrops={backdrops} />
    </div>

    <FlexBox className='flex-col items-center justify-center' css={hero}>
      <GlobalSearch />
    </FlexBox>
  </div>
);

export default memo(Hero);
