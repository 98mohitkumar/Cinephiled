import { Dot, Star } from "lucide-react";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { getRating, getReleaseDate, getRuntime } from "utils/helper";

const TVStats = ({ releaseDate, totalRuntime, rating, isSmall = false }) => {
  return (
    <FlexBox className='mb-12 items-center gap-12'>
      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        {getReleaseDate(releaseDate)}
      </P>

      <Dot size={isSmall ? 16 : 20} className='text-neutral-300' />

      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        {getRuntime(totalRuntime)}
      </P>

      <Dot size={isSmall ? 16 : 20} className='text-neutral-300' />

      <div className='flex items-center gap-6'>
        <Star size={isSmall ? 16 : 18} fill='yellow' stroke='yellow' />
        <P size={isSmall ? "default" : "large"} weight='semibold' className='font-montserrat'>
          {getRating(rating)}
        </P>
      </div>
    </FlexBox>
  );
};

export default TVStats;
