import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { getReleaseDate } from "utils/helper";

const PersonPageTabMediaTemplate = ({ media }) => {
  return (
    <MediaTemplateGrid media={media} gridType='poster'>
      {(media) => (
        <div className='mt-2024'>
          <H6 weight='medium' className='line-clamp-2 text-pretty'>
            {media?.title || media?.name}
          </H6>
          <P className='text-neutral-400' weight='medium' size='small-to-p'>
            {getReleaseDate(media?.release_date || media?.first_air_date)}
          </P>

          <P className='text-neutral-400' weight='medium' size='small-to-p'>
            {media?.job?.join(", ")}
          </P>
        </div>
      )}
    </MediaTemplateGrid>
  );
};

export default PersonPageTabMediaTemplate;
