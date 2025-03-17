import { memo } from "react";

import BackdropBanner from "components/Shared/BackdropBanner";
import GlobalSearch from "components/Shared/GlobalSearch/GlobalSearch";
import FlexBox from "components/UI/FlexBox";

import { heroSearchWrapper, heroWrapper } from "./HeroStyles";

const Hero = ({ backdrops }) => (
  <div className='relative mb-auto w-full' css={heroWrapper}>
    <div className='absolute inset-0 z-1 w-full overflow-hidden'>
      <BackdropBanner backdrops={backdrops} />
    </div>

    <FlexBox className='relative z-5 flex-col items-center justify-center' css={heroSearchWrapper}>
      <GlobalSearch />
    </FlexBox>
  </div>
);

export default memo(Hero);
