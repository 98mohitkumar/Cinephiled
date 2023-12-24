import { useSetFavorite } from "api/user";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { useModal } from "components/RatingModal/RatingModal";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useContext } from "react";
import { framerTabVariants, getReleaseYear } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import { Loader, NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { ConfirmationModal, CTAButton, ModalCard } from "./ProfilePageStyles";

export const FavoritesCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { name, releaseDate } = mediaData;

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible ? (
          <ConfirmationModal
            as={motion.div}
            key='rating-modal'
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.5 }}>
            <ModalCard>
              <h5 className='m-0'>
                Are you sure you want to remove{" "}
                <span className='inline font-bold'>{`${name} (${getReleaseYear(
                  releaseDate
                )})`}</span>{" "}
                from favorites
              </h5>

              <div className='flex justify-between items-center pt-4 gap-4'>
                <CTAButton
                  className='secondary'
                  onClick={closeModal}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}>
                  Keep it
                </CTAButton>
                <CTAButton
                  onClick={() => {
                    closeModal();
                    clickHandler();
                  }}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                  className='text-gray-950'>
                  Remove it
                </CTAButton>
              </div>
            </ModalCard>
          </ConfirmationModal>
        ) : null}
      </AnimatePresence>

      <CTAButton
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className='secondary text-red-500'>
        Remove
      </CTAButton>
    </Fragment>
  );
};

const Favorites = () => {
  const {
    favoriteMovies,
    favoriteTvShows,
    favoriteMoviesLoading,
    favoriteTvShowsLoading,
    validateFavoriteMovies,
    validateFavoriteTvShows
  } = useContext(MediaContext);
  const { setFavorite } = useSetFavorite();

  const filterMedia = async ({ id, type }) => {
    const response = await setFavorite({
      mediaType: type,
      mediaId: id,
      favoriteState: false
    });

    if (response?.success) {
      if (type === "movie") {
        validateFavoriteMovies({
          state: "removed",
          id
        });
      } else {
        validateFavoriteTvShows({
          state: "removed",
          id
        });
      }
    }
  };

  return (
    <Fragment>
      {favoriteMoviesLoading || favoriteTvShowsLoading ? (
        <div className='min-h-[45vh] grid place-items-center'>
          <Loader className='profile-page' />
        </div>
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              {tabState === "movies" && (
                <motion.div
                  key={`${favoriteMovies?.length}-movies`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
                  {favoriteMovies.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {favoriteMovies.map((movie) => (
                        <MediaCard key={movie?.id} data={movie} link='movies'>
                          <FavoritesCTA
                            clickHandler={() => filterMedia({ id: movie?.id, type: "movie" })}
                            mediaData={{
                              name: movie?.title,
                              releaseDate: movie?.release_date
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
                  ) : (
                    <NoDataText className='font-bold text-center my-5'>
                      No Movies marked as favorite yet
                    </NoDataText>
                  )}
                </motion.div>
              )}

              {tabState === "tv" && (
                <motion.div
                  key={`${favoriteTvShows?.length}-tv`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
                  {favoriteTvShows.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {favoriteTvShows.map((tv) => (
                        <MediaCard key={tv?.id} data={tv} link='tv'>
                          <FavoritesCTA
                            clickHandler={() => filterMedia({ id: tv?.id, type: "tv" })}
                            mediaData={{
                              name: tv?.name,
                              releaseDate: tv?.first_air_date
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
                  ) : (
                    <NoDataText className='font-bold text-center my-5'>
                      No TV shows marked as favorite yet
                    </NoDataText>
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

export default Favorites;
