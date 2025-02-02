import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import Loading from "components/Loader/Loader";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { useModal } from "components/Modal/Modal";
import PlaceholderText from "components/PlaceholderText";
import RatingModal from "components/RatingModal/RatingModal";
import { opacityMotionTransition } from "data/global";
import { useMediaContext } from "Store/MediaContext";
import { Button } from "styles/GlobalComponents";
import { getReleaseYear } from "utils/helper";

import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { id, name, releaseDate, type, posterPath } = mediaData;

  return (
    <Fragment>
      <RatingModal
        mediaType={type}
        mediaId={id}
        isOpen={isModalVisible}
        posterPath={posterPath}
        releaseDate={releaseDate}
        title={name}
        closeModal={closeModal}
        mediaName={`${name} (${getReleaseYear(releaseDate)})`}
      />

      <Button as={motion.button} whileTap={{ scale: 0.95 }} onClick={openModal} className='w-full !font-semibold'>
        Edit Rating
      </Button>
    </Fragment>
  );
};

const Ratings = () => {
  const { ratedMovies, ratedTvShows, isLoading, renderKey } = useMediaContext();
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence mode='wait' initial={false}>
              {tabState === "movies" && (
                <motion.div key={`${renderKey}-movies`} {...opacityMotionTransition}>
                  {ratedMovies.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {ratedMovies.map((movie) => (
                        <MediaCard key={movie?.id} data={movie} link='movies' rating={movie?.rating ?? false}>
                          <RatingCTA
                            mediaData={{
                              id: movie?.id,
                              name: movie?.title,
                              posterPath: movie?.poster_path,
                              releaseDate: movie?.release_date,
                              type: "movie"
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
                  ) : (
                    <PlaceholderText>No movies rated yet</PlaceholderText>
                  )}
                </motion.div>
              )}

              {tabState === "tv" && (
                <motion.div key={`${renderKey}-tv`} {...opacityMotionTransition}>
                  {ratedTvShows.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {ratedTvShows.map((tv) => (
                        <MediaCard key={tv?.id} data={tv} link='tv' rating={tv?.rating ?? false}>
                          <RatingCTA
                            mediaData={{
                              id: tv?.id,
                              name: tv?.name,
                              releaseDate: tv?.first_air_date,
                              type: "tv",
                              posterPath: tv?.poster_path
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
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
