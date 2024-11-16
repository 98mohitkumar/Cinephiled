import { Gauge } from "@suyalcinkaya/gauge";
import { ratingTagWrapperStyles } from "./RatingTagStyles";
import P from "components/UI/Typography/P";
import { getRating } from "utils/helper";

const RatingTag = ({ rating }) => {
  const primaryColorScale = {
    0: "#666666",
    1: "#dc2626",
    40: "#f59e0b",
    70: "#22c55e"
  };

  return (
    <div css={ratingTagWrapperStyles}>
      <Gauge value={rating ? getRating(rating) * 10 : 0} strokeWidth={5} primary={primaryColorScale} secondary='#424242' className='h-9 w-9' />
      <P className='font-montserrat' weight='medium' size='tiny'>
        {getRating(rating)}
      </P>
    </div>
  );
};

export default RatingTag;
