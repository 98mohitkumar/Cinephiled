import P from "components/UI/Typography/P";

import { linkStyles } from "./GlobalComponents";

const ImdbLinks = ({ imdbId }) => {
  return (
    <>
      <div>
        <P weight='bold'>Technical Details</P>
        <P tag='a' weight='medium' className={linkStyles} href={`https://www.imdb.com/title/${imdbId}/technical`} target='_blank'>
          View Details
        </P>
      </div>

      <div>
        <P weight='bold'>Parental Guide</P>
        <P tag='a' weight='medium' className={linkStyles} href={`https://www.imdb.com/title/${imdbId}/parentalguide`} target='_blank'>
          View Details
        </P>
      </div>
    </>
  );
};

export default ImdbLinks;
