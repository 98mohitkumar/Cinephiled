import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import { LoadingSpinner } from "components/Loader/Loader";
import { useModal } from "components/Modal/Modal";
import RatingModal from "components/RatingModal/RatingModal";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import P from "components/UI/Typography/P";
import { opacityMotionTransition } from "data/global";
import { useMediaContext } from "Store/MediaContext";
import { matches } from "utils/helper";

import { ProfileMediaTab } from "./ProfileMediaTab";

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  return (
    <Fragment>
      <RatingModal {...mediaData} isOpen={isModalVisible} closeModal={closeModal} />

      <Button className='mt-2024 flex justify-between' onClick={openModal} fullWidth weight='medium' title='Edit rating'>
        Edit Rating
        {mediaData?.rating ? (
          <P
            className='flex-center -me-16 gap-4 self-stretch border-l border-neutral-500 px-10 font-montserrat leading-3'
            weight='medium'
            size='small'>
            <Star size={12} fill='currentColor' />
            {mediaData?.rating}
          </P>
        ) : null}
      </Button>
    </Fragment>
  );
};

const Ratings = () => {
  const { ratedMovies, ratedTvShows, isLoading, renderKey } = useMediaContext();

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence mode='wait' initial={false}>
              {matches(tabState, "movies") && (
                <motion.div key={`${renderKey}-movies`} {...opacityMotionTransition}>
                  {ratedMovies.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={ratedMovies} mediaType='movie' gridType='poster' showRating={false}>
                      {(movie) => (
                        <RatingCTA
                          mediaData={{
                            mediaId: movie?.id,
                            title: movie?.title,
                            rating: movie?.rating,
                            posterPath: movie?.poster_path,
                            releaseDate: movie?.release_date,
                            mediaType: "movie"
                          }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No Movies rated yet</PlaceholderText>
                  )}
                </motion.div>
              )}

              {matches(tabState, "tv") && (
                <motion.div key={`${renderKey}-tv`} {...opacityMotionTransition}>
                  {ratedTvShows.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={ratedTvShows} mediaType='tv' gridType='poster' showRating={false}>
                      {(tv) => (
                        <RatingCTA
                          mediaData={{
                            mediaId: tv?.id,
                            title: tv?.name,
                            rating: tv?.rating,
                            releaseDate: tv?.first_air_date,
                            posterPath: tv?.poster_path,
                            mediaType: "tv"
                          }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No TV Shows rated yet</PlaceholderText>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </ProfileMediaTab>
      )}
    </Fragment>
  );
};

export default Ratings;
