import { memo } from "react";
import BackdropBanner from "./BackdropBanner";
import { hero } from "./HeroStyles";
import GlobalSearch from "components/GlobalSearch/GlobalSearch";
import { FlexBox } from "components/Layout/helpers";

const Hero = ({ posters = [] }) => (
  <div className='relative mb-auto h-[400px] w-full sm:h-[500px]'>
    <div className='absolute inset-0 z-[-1] overflow-hidden'>
      <BackdropBanner posters={posters} />
    </div>

    <FlexBox className='flex-col items-center justify-center' css={hero}>
      <GlobalSearch />
    </FlexBox>
  </div>
);

export default memo(Hero);
