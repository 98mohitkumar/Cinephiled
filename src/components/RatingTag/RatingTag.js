import { Gauge } from "@suyalcinkaya/gauge";
import { getRating } from "src/utils/helper";
import { RatingTagWrapper } from "./RatingTagStyles";

const RatingTag = ({ rating }) => {
  const primaryColorScale = {
    0: "#666666",
    1: "#dc2626",
    40: "#f59e0b",
    70: "#22c55e"
  };

  return (
    <RatingTagWrapper>
      <Gauge
        value={rating ? getRating(rating) * 10 : 0}
        strokeWidth={5}
        primary={primaryColorScale}
        secondary='#424242'
        className='h-9 w-9 sm:h-10 sm:w-10'
      />
      <p className='label'>{getRating(rating)}</p>
    </RatingTagWrapper>
  );
};

export default RatingTag;
