import { ChevronDown } from "lucide-react";
import { useState } from "react";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { cn, matches } from "utils/helper";

const PersonBiography = ({ biography }) => {
  const biographyParagraphs = biography.split("\n\n");
  const [isBioCollapsed, setIsBioCollapsed] = useState(true);

  if (matches(biographyParagraphs?.length, 1)) {
    return (
      <P size='large' className='mt-16 flex max-w-screen-xl'>
        {biography}
      </P>
    );
  }

  return (
    <div className='max-w-screen-xl'>
      <FlexBox className='mt-16 flex-col gap-16'>
        {biographyParagraphs.map((paragraph, index) => (
          <P key={index} size='large' className={cn(matches(index, 0) ? "line-clamp-5" : "hidden", isBioCollapsed ? "" : "line-clamp-none block")}>
            {paragraph}
          </P>
        ))}
      </FlexBox>

      <FlexBox className={cn("mt-6 items-center justify-end", isBioCollapsed ? "" : "hidden")}>
        <P
          tag='a'
          className='flex items-center gap-6 text-cyan-400 transition-colors can-hover:text-cyan-300 can-hover:underline'
          weight='medium'
          href='#'
          onClick={(e) => (e.preventDefault(), setIsBioCollapsed(false))}>
          Read More
          <ChevronDown size={24} />
        </P>
      </FlexBox>
    </div>
  );
};

export default PersonBiography;
