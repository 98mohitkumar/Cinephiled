import { memo } from "react";

import BackdropBanner from "components/Shared/BackdropBanner";
import GlobalSearch from "components/Shared/GlobalSearch/GlobalSearch";
import FlexBox from "components/UI/FlexBox";

import { hero } from "./HeroStyles";

const Hero = ({ backdrops = [] }) => (
  <div className='relative mb-auto h-[400px] w-full sm:h-[500px]'>
    <div className='absolute inset-0 -z-1 h-full overflow-hidden'>
      <BackdropBanner backdrops={backdrops} />
    </div>

    <FlexBox className='flex-col items-center justify-center' css={hero}>
      <GlobalSearch />
    </FlexBox>
  </div>
);

export default memo(Hero);
