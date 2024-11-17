import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import Loading from "components/Loader/Loader";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { useModal } from "components/Modal/Modal";
import PlaceholderText from "components/PlaceholderText";
import RatingModal from "components/RatingModal/RatingModal";
import { useMediaContext } from "Store/MediaContext";
import { Button } from "styles/GlobalComponents";
import { framerTabVariants, getReleaseYear } from "utils/helper";

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
                <motion.div
                  key={`${renderKey}-movies`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
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
                <motion.div
                  key={`${renderKey}-tv`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
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
