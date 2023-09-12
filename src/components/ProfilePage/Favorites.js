import { revalidationWrapper, useSetFavorite } from "api/user";
import { CardsContainerGrid } from "components/Popular/PopularStyles";
import { useModal } from "components/RatingModal/RatingModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useState,
  useMemo,
  Fragment,
  useContext,
  useCallback
} from "react";
import { MediaContext } from "Store/MediaContext";
import { NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { ConfirmationModal, CTAButton, ModalCard } from "./ProfilePageStyles";

export const FavoritesCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const { name, releaseDate } = mediaData;

  const year = useMemo(
    () => (releaseDate ? new Date(releaseDate).getFullYear() : "TBA"),
    [releaseDate]
  );

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
                <span className='d-inline fw-bold'>{`${name} (${year})`}</span>{" "}
                from favorites
              </h5>

              <div
                className='d-flex justify-between align-items-center pt-4'
                style={{ gap: "1rem" }}>
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
                  whileTap={{ scale: 0.95 }}>
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
        className='secondary text-danger'>
        Remove
      </CTAButton>
    </Fragment>
  );
};

const Favorites = () => {
  const [tabState, setTabState] = useState("");
  const { favoriteMovies, favoriteTvShows, revalidateFavorites } =
    useContext(MediaContext);

  const [favoriteMoviesFromApi, setFavoriteMoviesFromApi] =
    useState(favoriteMovies);

  const [favoriteTvShowsFromApi, setFavoriteTvShowsFromApi] =
    useState(favoriteTvShows);

  const { setFavorite } = useSetFavorite();

  useEffect(() => {
    if (favoriteMovies?.length > 0) {
      setFavoriteMoviesFromApi(favoriteMovies);
    }
  }, [favoriteMovies]);

  useEffect(() => {
    if (favoriteTvShows?.length > 0) {
      setFavoriteTvShowsFromApi(favoriteTvShows);
    }
  }, [favoriteTvShows]);

  const filterMedia = useCallback(
    async ({ id, type }) => {
      const response = await setFavorite({
        mediaType: type,
        mediaId: id,
        favoriteState: false
      });

      if (response?.success) {
        if (type === "movie") {
          setFavoriteMoviesFromApi((prev) =>
            prev?.filter((item) => item?.id !== id)
          );
          revalidationWrapper(() => revalidateFavorites("favoriteMovies"));
        } else {
          setFavoriteTvShowsFromApi((prev) =>
            prev?.filter((item) => item?.id !== id)
          );

          revalidationWrapper(() => revalidateFavorites("favoriteTvShows"));
        }
      }
    },
    [revalidateFavorites, setFavorite]
  );

  return (
    <Fragment>
      <ProfileMediaTab tabState={tabState} setTabState={setTabState} />

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === "movies" && (
          <motion.div
            key={`${favoriteMoviesFromApi?.length}-movies`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {favoriteMoviesFromApi.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {favoriteMoviesFromApi.map((movie) => (
                  <MediaCard key={movie?.id} data={movie} link='movies'>
                    <FavoritesCTA
                      clickHandler={() =>
                        filterMedia({ id: movie?.id, type: "movie" })
                      }
                      mediaData={{
                        name: movie?.title,
                        releaseDate: movie?.release_date
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No movies marked as favorite yet
              </NoDataText>
            )}
          </motion.div>
        )}

        {tabState === "tv" && (
          <motion.div
            key={`${favoriteTvShowsFromApi?.length}-tv`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {favoriteTvShowsFromApi.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {favoriteTvShowsFromApi.map((tv) => (
                  <MediaCard key={tv?.id} data={tv} link='tv'>
                    <FavoritesCTA
                      clickHandler={() =>
                        filterMedia({ id: tv?.id, type: "tv" })
                      }
                      mediaData={{
                        name: tv?.name,
                        releaseDate: tv?.first_air_date
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No tv shows marked as favorite yet
              </NoDataText>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Favorites;
