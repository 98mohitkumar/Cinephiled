import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { cn } from "utils/helper";

const PersonBiography = ({ biography }) => {
  const biographyParagraphs = biography.split("\n\n");
  const [isBioCollapsed, setIsBioCollapsed] = useState(true);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const bioRef = useRef(null);

  useEffect(() => {
    if (bioRef.current) {
      // Check if the content overflows
      setShouldShowReadMore(bioRef.current.scrollHeight > bioRef.current.clientHeight);
    }
  }, []);

  return (
    <>
      <div ref={bioRef} className={cn("mt-10 space-y-4 break-words", isBioCollapsed ? "line-clamp-5" : "")}>
        {biographyParagraphs.map((paragraph, index) => (
          <P key={index} size='large'>
            {paragraph}
          </P>
        ))}
      </div>

      {shouldShowReadMore && isBioCollapsed && (
        <FlexBox className='mt-6 items-center justify-end'>
          <P
            tag='a'
            className='flex items-center gap-6 text-cyan-400 transition-colors can-hover:text-cyan-300 can-hover:underline'
            weight='medium'
            href='#'
            onClick={(e) => {
              e.preventDefault();
              setIsBioCollapsed(false);
            }}>
            Read More
            <ChevronDown size={24} />
          </P>
        </FlexBox>
      )}
    </>
  );
};

export default PersonBiography;
