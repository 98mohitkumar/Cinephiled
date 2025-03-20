import { motion, AnimatePresence } from "motion/react";
import { Fragment } from "react";
import { toast } from "sonner";

import { useSetFavorite } from "apiRoutes/user";
import { LoadingSpinner } from "components/Loader/Loader";
import Modal, { useModal } from "components/Modal/Modal";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { opacityMotionTransition } from "data/global";
import { useMediaContext } from "Store/MediaContext";
import { getReleaseYear, matches } from "utils/helper";

import { ProfileMediaTab } from "./ProfileMediaTab";

export const FavoritesCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { name, releaseDate } = mediaData;

  return (
    <Fragment>
      <Modal isOpen={isModalVisible} closeModal={closeModal} className='max-w-lg'>
        <P size='large'>
          Are you sure you want to remove <strong>{`${name} (${getReleaseYear(releaseDate)})`}</strong> from favorites?
        </P>

        <FlexBox className='mt-24 items-center justify-between gap-16'>
          <Button className='w-1/2' onClick={closeModal} variant='outline'>
            Keep it
          </Button>

          <Button
            onClick={() => {
              closeModal();
              clickHandler();
            }}
            variant='danger'
            className='w-1/2'>
            Remove it
          </Button>
        </FlexBox>
      </Modal>

      <Button variant='danger' onClick={openModal} fullWidth className='mt-2432' title='Remove from favorites'>
        Remove
      </Button>
    </Fragment>
  );
};

const Favorites = () => {
  const { setFavorite } = useSetFavorite();
  const { favoriteMovies, favoriteTvShows, isLoading, renderKey, validateMedia } = useMediaContext();

  const filterMedia = async ({ id, type }) => {
    const response = await setFavorite({ mediaType: type, mediaId: id, favoriteState: false });

    if (response?.success) {
      validateMedia({ state: "removed", id, key: matches(type, "movie") ? "favoriteMovies" : "favoriteTvShows" });

      toast.success("Item has been removed from favorites");
    } else {
      toast.error("An error occurred", { description: "An error occurred while removing the item from favorites, please try again later." });
    }
  };

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
                  {favoriteMovies.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={favoriteMovies} mediaType='movie' gridType='poster'>
                      {(movie) => (
                        <FavoritesCTA
                          clickHandler={() => filterMedia({ id: movie?.id, type: "movie" })}
                          mediaData={{ name: movie?.title, releaseDate: movie?.release_date }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No Movies are marked as favorite yet</PlaceholderText>
                  )}
                </motion.div>
              )}

              {matches(tabState, "tv") && (
                <motion.div key={`${renderKey}-tv`} {...opacityMotionTransition}>
                  {favoriteTvShows.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={favoriteTvShows} mediaType='tv' gridType='poster'>
                      {(tv) => (
                        <FavoritesCTA
                          clickHandler={() => filterMedia({ id: tv?.id, type: "tv" })}
                          mediaData={{ name: tv?.name, releaseDate: tv?.first_air_date }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No TV Shows are marked as favorite yet</PlaceholderText>
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
