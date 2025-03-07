import TrailerModal from "components/Shared/TrailerModal";
import UserActions from "components/Shared/UserActions";
import MediaHeroTemplate from "components/Templates/MediaHeroTemplate";
import FlexBox from "components/UI/FlexBox";

import EasterEgg from "./EasterEgg";

const MovieDetails = ({ movieDetails }) => {
  const { id, title, posterPath, rating, trailer, releaseDate, isEasterMovie, ...rest } = movieDetails;

  return (
    <MediaHeroTemplate
      posterPath={posterPath}
      title={title}
      mediaType='movie'
      rating={rating}
      easterEgg={isEasterMovie ? <EasterEgg /> : null}
      {...rest}>
      <FlexBox className='mt-16 flex-wrap items-center gap-8 gap-y-16'>
        <TrailerModal trailer={trailer} />
        <UserActions mediaType='movie' mediaId={id} mediaDetails={{ title, poster: posterPath, releaseDate }} rating={rating} />
      </FlexBox>
    </MediaHeroTemplate>
  );
};

export default MovieDetails;
