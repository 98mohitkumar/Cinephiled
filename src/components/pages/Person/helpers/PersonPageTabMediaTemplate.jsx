import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { getReleaseDate } from "utils/helper";

const extraInfoCallback = (media) => {
  return (
    <div className='mt-24 pe-10'>
      <H6 weight='medium' className='text-balance'>
        {media?.title || media?.name}
      </H6>
      <P className='text-neutral-400' weight='medium' size='small-to-p'>
        {getReleaseDate(media?.release_date || media?.first_air_date)}
      </P>

      <P className='text-neutral-400' weight='medium' size='small-to-p'>
        {media?.job?.join(", ")}
      </P>
    </div>
  );
};

const PersonPageTabMediaTemplate = ({ media }) => {
  return <MediaTemplateGrid media={media} extraInfoCallback={extraInfoCallback} gridType='poster' />;
};

export default PersonPageTabMediaTemplate;
