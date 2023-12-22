import { revalidationWrapper, useAddToWatchlist } from "api/user";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { useModal } from "components/RatingModal/RatingModal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, Fragment, useContext } from "react";
import { getReleaseYear } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import { NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { ConfirmationModal, CTAButton, ModalCard } from "./ProfilePageStyles";

export const WatchlistCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { name, releaseDate } = mediaData;

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible && (
          <ConfirmationModal
            as={motion.div}
            key='rating-modal'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: "tween",
                duration: 0.6,
                ease: [0.77, 0, 0.175, 1]
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                type: "tween",
                duration: 0.6,
                ease: [0.77, 0, 0.175, 1]
              }
            }}>
            <ModalCard>
              <h5 className='m-0'>
                Are you sure you want to remove{" "}
                <span className='inline font-bold'>{`${name} (${getReleaseYear(
                  releaseDate
                )})`}</span>{" "}
                from your watchlist
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
        )}
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

const Watchlist = () => {
  const { moviesWatchlist, tvShowsWatchlist, revalidateWatchlist } = useContext(MediaContext);
  const [moviesWatchlistFromApi, setMoviesWatchlistFromApi] = useState(moviesWatchlist);
  const [tvShowsWatchlistFromApi, setTvShowsWatchlistFromApi] = useState(tvShowsWatchlist);

  const { addToWatchlist } = useAddToWatchlist();

  useEffect(() => {
    if (moviesWatchlist?.length > 0) {
      setMoviesWatchlistFromApi(moviesWatchlist);
    }
  }, [moviesWatchlist]);

  useEffect(() => {
    if (tvShowsWatchlist?.length > 0) {
      setTvShowsWatchlistFromApi(tvShowsWatchlist);
    }
  }, [tvShowsWatchlist]);

  const filterMedia = async ({ id, type }) => {
    const response = await addToWatchlist({
      mediaType: type,
      mediaId: id,
      watchlistState: false
    });

    if (response?.success) {
      if (type === "movie") {
        setMoviesWatchlistFromApi((prev) => prev?.filter((item) => item?.id !== id));
        revalidationWrapper(() => revalidateWatchlist("moviesWatchlist"));
      } else {
        setTvShowsWatchlistFromApi((prev) => prev?.filter((item) => item?.id !== id));
        revalidationWrapper(() => revalidateWatchlist("tvShowsWatchlist"));
      }
    }
  };

  return (
    <Fragment>
      <ProfileMediaTab>
        {(tabState) => (
          <AnimatePresence exitBeforeEnter initial={false}>
            {tabState === "movies" && (
              <motion.div
                key={`${moviesWatchlistFromApi?.length}-movies`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {moviesWatchlistFromApi.length > 0 ? (
                  <CardsContainerGrid className='xl-row-gap'>
                    {moviesWatchlistFromApi.map((movie) => (
                      <MediaCard key={movie?.id} data={movie} link='movies'>
                        <WatchlistCTA
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
                  <NoDataText className='font-bold text-center my-6'>
                    No movies in watchlist yet
                  </NoDataText>
                )}
              </motion.div>
            )}

            {tabState === "tv" && (
              <motion.div
                key={`${tvShowsWatchlistFromApi?.length}-tv`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {tvShowsWatchlistFromApi.length > 0 ? (
                  <CardsContainerGrid className='xl-row-gap'>
                    {tvShowsWatchlistFromApi.map((tv) => (
                      <MediaCard key={tv?.id} data={tv} link='tv'>
                        <WatchlistCTA
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
                  <NoDataText className='font-bold text-center my-6'>
                    No tv shows in watchlist yet
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

export default Watchlist;
