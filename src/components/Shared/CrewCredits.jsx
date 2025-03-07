import Link from "next/link";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { ROUTES } from "data/global";
import { cn, getNiceName } from "utils/helper";

const CrewCredits = ({ crewData, className }) => {
  return (
    <FlexBox className={cn("mt-2032 flex-wrap items-center gap-x-4864 gap-y-24", className)}>
      {crewData.map((item) => (
        <div key={item.id}>
          <P weight='bold'>{item.job || "Creator"}</P>

          <Link href={`/${ROUTES.person}/${getNiceName({ id: item.id, name: item.name })}`}>
            <P weight='medium' className='text-neutral-300 underline transition-colors can-hover:text-neutral-100 can-hover:no-underline'>
              {item.name}
            </P>
          </Link>
        </div>
      ))}
    </FlexBox>
  );
};

export default CrewCredits;
