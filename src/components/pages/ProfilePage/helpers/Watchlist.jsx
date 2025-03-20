import { motion, AnimatePresence } from "motion/react";
import { Fragment } from "react";
import { toast } from "sonner";

import { useAddToWatchlist } from "apiRoutes/user";
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

export const WatchlistCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { name, releaseDate } = mediaData;

  return (
    <Fragment>
      <Modal isOpen={isModalVisible} closeModal={closeModal} className='max-w-lg'>
        <P size='large'>
          Are you sure you want to remove <strong>{`${name} (${getReleaseYear(releaseDate)})`}</strong> from your watchlist?
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

      <Button variant='danger' onClick={openModal} fullWidth className='mt-2432' title='Remove from watchlist'>
        Remove
      </Button>
    </Fragment>
  );
};

const Watchlist = () => {
  const { addToWatchlist } = useAddToWatchlist();
  const { moviesWatchlist, tvShowsWatchlist, isLoading, renderKey, validateMedia } = useMediaContext();

  const filterMedia = async ({ id, type }) => {
    const response = await addToWatchlist({ mediaType: type, mediaId: id, watchlistState: false });

    if (response?.success) {
      validateMedia({ state: "removed", id, key: type === "movie" ? "moviesWatchlist" : "tvShowsWatchlist" });

      toast.success("Item has been removed from watchlist");
    } else {
      toast.error("An error occurred", { description: "An error occurred while removing the item from watchlist, please try again later." });
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
                  {moviesWatchlist.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={moviesWatchlist} mediaType='movie' gridType='poster'>
                      {(movie) => (
                        <WatchlistCTA
                          clickHandler={() => filterMedia({ id: movie?.id, type: "movie" })}
                          mediaData={{ name: movie?.title, releaseDate: movie?.release_date }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No Movies added to watchlist yet</PlaceholderText>
                  )}
                </motion.div>
              )}

              {matches(tabState, "tv") && (
                <motion.div key={`${renderKey}-tv`} {...opacityMotionTransition}>
                  {tvShowsWatchlist.length > 0 ? (
                    <MediaTemplateGrid className='gap-y-3248' media={tvShowsWatchlist} mediaType='tv' gridType='poster'>
                      {(tv) => (
                        <WatchlistCTA
                          clickHandler={() => filterMedia({ id: tv?.id, type: "tv" })}
                          mediaData={{ name: tv?.name, releaseDate: tv?.first_air_date }}
                        />
                      )}
                    </MediaTemplateGrid>
                  ) : (
                    <PlaceholderText>No TV Shows added to watchlist yet</PlaceholderText>
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

export default Watchlist;
