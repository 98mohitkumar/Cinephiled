import { Gauge } from "@suyalcinkaya/gauge";

import P from "components/UI/Typography/P";
import { getRating } from "utils/helper";

import { ratingTagWrapperStyles } from "./RatingTagStyles";

const primaryColorScale = {
  0: "#666666",
  1: "#dc2626",
  40: "#f59e0b",
  70: "#22c55e"
};

const RatingTag = ({ rating }) => (
  <div css={ratingTagWrapperStyles}>
    <Gauge value={rating ? getRating(rating) * 10 : 0} strokeWidth={5} primary={primaryColorScale} secondary='#424242' className='h-full w-full' />
    <P className='font-montserrat' weight='medium' size='micro-to-tiny'>
      {getRating(rating)}
    </P>
  </div>
);

export default RatingTag;
