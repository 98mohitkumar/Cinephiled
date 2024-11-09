import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { BiListPlus, BiListCheck } from "react-icons/bi";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { addToWatchlist } from "apiEndpoints/user";
import Loading from "components/Loading";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import PlaceholderText from "components/PlaceholderText";
import Toast, { useToast } from "components/Toast/Toast";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { Button } from "styles/GlobalComponents";
import { framerTabVariants, removeDuplicates } from "utils/helper";

const MovieRecommendations = () => {
  const { userInfo } = useUserContext();
  const { movieRecommendations, moviesWatchlist, validateMedia } = useMediaContext();
  const { cleanedItems } = removeDuplicates(movieRecommendations);
  const { isToastVisible, showToast, toastMessage } = useToast();

  const isAddedToWatchlist = (mediaId) => {
    return moviesWatchlist.some((movie) => movie.id === mediaId);
  };

  const watchlistHandler = async ({ mediaId, poster, title, releaseDate, rating }) => {
    const isAlreadyInWatchlist = isAddedToWatchlist(mediaId);

    if (userInfo?.accountId) {
      const response = await addToWatchlist({
        mediaType: "movie",
        mediaId,
        watchlistState: !isAlreadyInWatchlist
      });

      if (response?.success) {
        if (isAlreadyInWatchlist) {
          validateMedia({
            state: "removed",
            id: mediaId,
            key: "moviesWatchlist"
          });
        } else {
          const updatedMedia = [...moviesWatchlist];

          updatedMedia.unshift({
            id: mediaId,
            poster_path: poster,
            title,
            release_date: releaseDate,
            vote_average: rating
          });

          validateMedia({
            state: "added",
            id: mediaId,
            key: "moviesWatchlist",
            media: updatedMedia
          });
        }
        showToast({
          message: isAlreadyInWatchlist ? "Removed from watchlist" : "Added to watchlist"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  return (
    <Fragment>
      <motion.div variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
        {cleanedItems.length > 0 ? (
          <CardsContainerGrid>
            {cleanedItems.map((movie) => {
              const isAlreadyInWatchlist = isAddedToWatchlist(movie?.id);

              return (
                <MediaCard key={movie?.id} data={movie} link='movies'>
                  <Button
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      watchlistHandler({
                        mediaId: movie?.id,
                        poster: movie?.poster_path,
                        title: movie?.title,
                        releaseDate: movie?.release_date,
                        rating: movie?.vote_average
                      })
                    }
                    className={`secondary w-full ${isAlreadyInWatchlist ? "danger" : null}`}>
                    <AnimatePresence mode='wait' initial={false}>
                      <motion.div
                        className='text-base flex items-center gap-2 font-semibold'
                        key={`watchlist - ${isAlreadyInWatchlist.toString()}`}
                        variants={framerTabVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        transition={{ duration: 0.325 }}>
                        {isAlreadyInWatchlist ? <BiListCheck size='22px' /> : <BiListPlus size='22px' />}

                        {isAlreadyInWatchlist ? "Remove" : "Add"}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </MediaCard>
              );
            })}
          </CardsContainerGrid>
        ) : (
          <PlaceholderText>No recommendations for now</PlaceholderText>
        )}
      </motion.div>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

const TvRecommendations = () => {
  const { userInfo } = useUserContext();
  const { tvRecommendations, tvShowsWatchlist, validateMedia } = useMediaContext();
  const { cleanedItems } = removeDuplicates(tvRecommendations);
  const { isToastVisible, showToast, toastMessage } = useToast();

  const isAddedToWatchlist = (mediaId) => {
    return tvShowsWatchlist.some((tv) => tv.id === mediaId);
  };

  const watchlistHandler = async ({ mediaId, name, poster, airDate, rating }) => {
    const isAlreadyInWatchlist = isAddedToWatchlist(mediaId);

    if (userInfo?.accountId) {
      const response = await addToWatchlist({
        mediaType: "tv",
        mediaId,
        watchlistState: !isAlreadyInWatchlist
      });

      if (response.success) {
        if (isAlreadyInWatchlist) {
          validateMedia({ state: "removed", id: mediaId, key: "tvShowsWatchlist" });
        } else {
          const updatedMedia = [...tvShowsWatchlist];

          updatedMedia.unshift({
            id: mediaId,
            name,
            poster_path: poster,
            first_air_date: airDate,
            vote_average: rating
          });

          validateMedia({
            state: "added",
            id: mediaId,
            media: updatedMedia,
            key: "tvShowsWatchlist"
          });
        }
        showToast({
          message: isAlreadyInWatchlist ? "Removed from watchlist" : "Added to watchlist"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  return (
    <Fragment>
      <motion.div variants={framerTabVariants} initial='hidden' animate='visible' exit='hidden' transition={{ duration: 0.325 }}>
        {cleanedItems.length > 0 ? (
          <CardsContainerGrid>
            {cleanedItems.map((tv) => {
              const isAlreadyInWatchlist = isAddedToWatchlist(tv?.id);

              return (
                <MediaCard key={tv?.id} data={tv} link='tv'>
                  <Button
                    as={motion.button}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      watchlistHandler({
                        mediaId: tv?.id,
                        name: tv?.name,
                        poster: tv?.poster_path,
                        airDate: tv?.first_air_date,
                        rating: tv?.vote_average
                      })
                    }
                    className={`secondary w-full ${isAlreadyInWatchlist ? "danger" : null}`}>
                    <AnimatePresence mode='wait' initial={false}>
                      <motion.div
                        className='text-base flex items-center gap-2 font-semibold'
                        key={`watchlist - ${isAlreadyInWatchlist.toString()}`}
                        variants={framerTabVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        transition={{ duration: 0.325 }}>
                        {isAlreadyInWatchlist ? <BiListCheck size='22px' /> : <BiListPlus size='22px' />}

                        {isAlreadyInWatchlist ? "Remove" : "Add"}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                </MediaCard>
              );
            })}
          </CardsContainerGrid>
        ) : (
          <PlaceholderText>No recommendations for now</PlaceholderText>
        )}
      </motion.div>

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>
    </Fragment>
  );
};

const ProfileRecommendations = () => {
  const { isLoading } = useMediaContext();
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence mode='wait' initial={false}>
              {tabState === "movies" && <MovieRecommendations key='movies' />}
              {tabState === "tv" && <TvRecommendations key='tv' />}
            </AnimatePresence>
          )}
        </ProfileMediaTab>
      )}
    </Fragment>
  );
};

export default ProfileRecommendations;
