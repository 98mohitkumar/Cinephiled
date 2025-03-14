import TrailerModal from "components/Shared/TrailerModal";
import UserActions from "components/Shared/UserActions";
import MediaHeroTemplate from "components/Templates/MediaHeroTemplate";
import FlexBox from "components/UI/FlexBox";

const TVDetails = ({ tvDetails }) => {
  const { id, title, airDate, posterPath, rating, trailer, ...rest } = tvDetails;

  return (
    <MediaHeroTemplate posterPath={posterPath} title={title} mediaType='tv' rating={rating} {...rest}>
      <FlexBox className='mt-16 flex-wrap items-center gap-8 gap-y-16'>
        <TrailerModal trailer={trailer} />
        <UserActions mediaType='tv' mediaId={id} mediaDetails={{ name: title, poster: posterPath, airDate }} rating={rating} />
      </FlexBox>
    </MediaHeroTemplate>
  );
};

export default TVDetails;
