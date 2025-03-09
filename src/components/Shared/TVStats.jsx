import { Star } from "lucide-react";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { getRating, getReleaseDate, getRuntime } from "utils/helper";

const TVStats = ({ releaseDate, totalRuntime, rating, isSmall = false }) => {
  return (
    <FlexBox className='mb-6 items-center gap-10 above-md:mb-10'>
      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        {getReleaseDate(releaseDate)}
      </P>

      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        &bull;
      </P>

      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        {getRuntime(totalRuntime)}
      </P>

      <P size={isSmall ? "default" : "large"} weight='medium' className='text-neutral-300'>
        &bull;
      </P>

      <div className='flex items-center gap-6'>
        <Star size={isSmall ? 16 : 18} fill='gold' stroke='gold' className='mb-2' />
        <P size={isSmall ? "default" : "large"} weight='semibold' className='font-montserrat'>
          {getRating(rating)}
        </P>
      </div>
    </FlexBox>
  );
};

export default TVStats;
