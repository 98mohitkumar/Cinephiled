import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { setFavorite } from "apiEndpoints/user";
import Loading from "components/Loading";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import Modal, { useModal } from "components/Modal/Modal";
import PlaceholderText from "components/PlaceholderText";
import { useMediaContext } from "Store/MediaContext";
import { Button } from "styles/GlobalComponents";
import { framerTabVariants, getReleaseYear } from "utils/helper";

export const FavoritesCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { name, releaseDate } = mediaData;

  return (
    <Fragment>
      <Modal isOpen={isModalVisible} closeModal={closeModal} align='items-center' width='max-w-lg'>
        <div>
          <h5 className='m-0'>
            Are you sure you want to remove <span className='inline font-bold'>{`${name} (${getReleaseYear(releaseDate)})`}</span> from favorites
          </h5>

          <div className='flex items-center justify-between gap-4 pt-4'>
            <Button className='secondary w-full' onClick={closeModal} as={motion.button} whileTap={{ scale: 0.95 }}>
              Keep it
            </Button>
            <Button
              onClick={() => {
                closeModal();
                clickHandler();
              }}
              as={motion.button}
              whileTap={{ scale: 0.95 }}
              className='danger w-full'>
              Remove it
            </Button>
          </div>
        </div>
      </Modal>

      <Button as={motion.button} whileTap={{ scale: 0.95 }} onClick={openModal} className='danger w-full'>
        Remove
      </Button>
    </Fragment>
  );
};

const Favorites = () => {
  const { favoriteMovies, favoriteTvShows, isLoading, renderKey, validateMedia } = useMediaContext();

  const filterMedia = async ({ id, type }) => {
    const response = await setFavorite({
      mediaType: type,
      mediaId: id,
      favoriteState: false
    });

    if (response?.success) {
      validateMedia({
        state: "removed",
        id,
        key: type === "movie" ? "favoriteMovies" : "favoriteTvShows"
      });
    }
  };

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
                    <PlaceholderText>No Movies marked as favorite yet</PlaceholderText>
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
                    <PlaceholderText>No TV Shows marked as favorite yet</PlaceholderText>
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
