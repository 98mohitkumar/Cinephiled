import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import RatingModal, { useModal } from "components/RatingModal/RatingModal";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useContext } from "react";
import { getReleaseYear } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import { NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { CTAButton } from "./ProfilePageStyles";

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { id, name, releaseDate, type } = mediaData;

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible && (
          <RatingModal
            key='rating-modal'
            mediaType={type}
            mediaId={id}
            closeModal={closeModal}
            mediaName={`${name} (${getReleaseYear(releaseDate)})`}
          />
        )}
      </AnimatePresence>

      <CTAButton
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className='text-gray-950'>
        Edit Rating
      </CTAButton>
    </Fragment>
  );
};

const Ratings = () => {
  const { ratedMovies, ratedTvShows } = useContext(MediaContext);

  return (
    <Fragment>
      <ProfileMediaTab>
        {(tabState) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            {tabState === "movies" && (
              <motion.div
                key={`${ratedMovies?.length}-movies`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {ratedMovies.length > 0 ? (
                  <CardsContainerGrid className='xl-row-gap'>
                    {ratedMovies.map((movie) => (
                      <MediaCard
                        key={movie?.id}
                        data={movie}
                        link='movies'
                        rating={movie?.rating ?? false}>
                        <RatingCTA
                          rating={movie?.rating}
                          mediaData={{
                            id: movie?.id,
                            name: movie?.title,
                            releaseDate: movie?.release_date,
                            type: "movie"
                          }}
                        />
                      </MediaCard>
                    ))}
                  </CardsContainerGrid>
                ) : (
                  <NoDataText className='font-bold text-center my-5'>
                    No movies rated yet
                  </NoDataText>
                )}
              </motion.div>
            )}

            {tabState === "tv" && (
              <motion.div
                key={`${ratedTvShows?.length}-tv`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {ratedTvShows.length > 0 ? (
                  <CardsContainerGrid className='xl-row-gap'>
                    {ratedTvShows.map((tv) => (
                      <MediaCard key={tv?.id} data={tv} link='tv' rating={tv?.rating ?? false}>
                        <RatingCTA
                          rating={tv?.rating}
                          mediaData={{
                            id: tv?.id,
                            name: tv?.name,
                            releaseDate: tv?.first_air_date,
                            type: "tv"
                          }}
                        />
                      </MediaCard>
                    ))}
                  </CardsContainerGrid>
                ) : (
                  <NoDataText className='font-bold text-center my-5'>
                    No tv shows rated yet
                  </NoDataText>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </ProfileMediaTab>
    </Fragment>
  );
};

export default Ratings;
