import { addToWatchlist, setFavorite } from "api/user";
import AddToListModal from "components/List/AddToListModal";
import { useModal } from "components/Modal/Modal";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { RatingOverlay } from "components/ProfilePage/ProfilePageStyles";
import RatingModal from "components/RatingModal/RatingModal";
import Toast, { useToast } from "components/Toast/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiListPlus, BiListCheck } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { framerTabVariants, matcher } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { Button } from "styles/GlobalComponents";

const UserActionButtons = ({
  watchlistHandler,
  favoriteHandler,
  ratingModalHandler,
  isAddedToWatchlist,
  isAddedToFavorites,
  savedRating,
  isToastVisible
}) => {
  return (
    <div className='flex justify-start gap-3'>
      <Button
        className='w-full mediaCTA'
        loading={+isToastVisible}
        aria-label='watchlist button'
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={watchlistHandler}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={`watchlist - ${isAddedToWatchlist.toString()}`}
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            {isAddedToWatchlist ? <BiListCheck size='22px' /> : <BiListPlus size='22px' />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <Button
        className='w-full mediaCTA'
        aria-label='favorite button'
        onClick={favoriteHandler}
        as={motion.button}
        loading={+isToastVisible}
        whileTap={{ scale: 0.95 }}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={`favorite - ${isAddedToFavorites.toString()}`}
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            {isAddedToFavorites ? <FaHeart size='20px' /> : <FaRegHeart size='20px' />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <Button
        className='w-full mediaCTA'
        aria-label='rating button'
        as={motion.button}
        loading={+isToastVisible}
        whileTap={{ scale: 0.95 }}
        onClick={ratingModalHandler}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={`rating - ${savedRating.toString()}`}
            variants={framerTabVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            transition={{ duration: 0.325 }}>
            {savedRating ? (
              <RatingOverlay className='media-page'>
                <AiFillStar size='16px' />
                <p className='m-0 leading-tight font-semibold'>{savedRating}</p>
              </RatingOverlay>
            ) : (
              <BsStarHalf size='20px' />
            )}
          </motion.div>
        </AnimatePresence>
      </Button>
    </div>
  );
};

const UserMovieActions = ({ mediaId, mediaType, mediaDetails }) => {
  const { userInfo } = useUserContext();
  const { favoriteMovies, moviesWatchlist, ratedMovies, validateMedia } = useMediaContext();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToWatchlist = moviesWatchlist?.map((item) => item.id)?.includes(mediaId);
  const isAddedToFavorites = favoriteMovies?.map((item) => item.id)?.includes(mediaId);
  const savedRating = ratedMovies?.find((item) => item?.id === mediaId)?.rating || false;

  const title = mediaDetails?.title;
  const poster = mediaDetails?.poster;
  const releaseYear = mediaDetails?.releaseYear;
  const releaseDate = mediaDetails?.releaseDate;

  const favoriteHandler = async () => {
    if (userInfo?.accountId) {
      const response = await setFavorite({
        mediaType: "movie",
        mediaId,
        favoriteState: !isAddedToFavorites
      });

      if (response?.success) {
        if (isAddedToFavorites) {
          validateMedia({
            state: "removed",
            id: mediaId,
            key: "favoriteMovies"
          });
        } else {
          const updatedMedia = [...favoriteMovies];

          updatedMedia.unshift({
            id: mediaId,
            poster_path: poster,
            title,
            release_date: releaseDate
          });

          validateMedia({
            state: "added",
            id: mediaId,
            key: "favoriteMovies",
            media: updatedMedia
          });
        }

        showToast({
          message: isAddedToFavorites ? "Removed from favorites" : "Added to favorites"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  const watchlistHandler = async () => {
    if (userInfo?.accountId) {
      const response = await addToWatchlist({
        mediaType: "movie",
        mediaId,
        watchlistState: !isAddedToWatchlist
      });

      if (response?.success) {
        if (isAddedToWatchlist) {
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
            release_date: releaseDate
          });

          validateMedia({
            state: "added",
            id: mediaId,
            key: "moviesWatchlist",
            media: updatedMedia
          });
        }
        showToast({
          message: isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  const ratingModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  return (
    <Fragment>
      <UserActionButtons
        favoriteHandler={favoriteHandler}
        watchlistHandler={watchlistHandler}
        ratingModalHandler={ratingModalHandler}
        isAddedToWatchlist={isAddedToWatchlist}
        isAddedToFavorites={isAddedToFavorites}
        savedRating={savedRating}
        isToastVisible={isToastVisible}
      />

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>

      <RatingModal
        mediaType={mediaType}
        mediaId={mediaId}
        posterPath={poster}
        releaseDate={releaseDate}
        title={title}
        isOpen={isModalVisible}
        closeModal={closeModal}
        mediaName={`${title} (${releaseYear})`}
      />
    </Fragment>
  );
};

const UserTVActions = ({ mediaId, mediaType, mediaDetails }) => {
  const { userInfo } = useUserContext();
  const { favoriteTvShows, tvShowsWatchlist, ratedTvShows, validateMedia } = useMediaContext();
  const { isToastVisible, showToast, toastMessage } = useToast();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToFavorites = favoriteTvShows?.map((item) => item.id)?.includes(mediaId);
  const isAddedToWatchlist = tvShowsWatchlist?.map((item) => item.id)?.includes(mediaId);
  const savedRating = ratedTvShows?.find((item) => item?.id === mediaId)?.rating ?? false;

  const name = mediaDetails?.name;
  const poster = mediaDetails?.poster;
  const releaseYear = mediaDetails?.releaseYear;
  const airDate = mediaDetails?.airDate;

  const favoriteHandler = async () => {
    if (userInfo?.accountId) {
      const response = await setFavorite({
        mediaType: "tv",
        mediaId,
        favoriteState: !isAddedToFavorites
      });

      if (response.success) {
        if (isAddedToFavorites) {
          validateMedia({ state: "removed", id: mediaId, key: "favoriteTvShows" });
        } else {
          const updatedMedia = [...favoriteTvShows];

          updatedMedia.unshift({
            id: mediaId,
            name,
            poster_path: poster,
            first_air_date: airDate
          });

          validateMedia({
            state: "added",
            id: mediaId,
            media: updatedMedia,
            key: "favoriteTvShows"
          });
        }
        showToast({
          message: isAddedToFavorites ? "Removed from favorites" : "Added to favorites"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  const watchlistHandler = async () => {
    if (userInfo?.accountId) {
      const response = await addToWatchlist({
        mediaType: "tv",
        mediaId,
        watchlistState: !isAddedToWatchlist
      });

      if (response.success) {
        if (isAddedToWatchlist) {
          validateMedia({ state: "removed", id: mediaId, key: "tvShowsWatchlist" });
        } else {
          const updatedMedia = [...tvShowsWatchlist];

          updatedMedia.unshift({
            id: mediaId,
            name,
            poster_path: poster,
            first_air_date: airDate
          });

          validateMedia({
            state: "added",
            id: mediaId,
            media: updatedMedia,
            key: "tvShowsWatchlist"
          });
        }
        showToast({
          message: isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist"
        });
      } else {
        showToast({ message: "Something went wrong, try again later" });
      }
    } else if (!isToastVisible) {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  const ratingModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      showToast({ message: "Please login first to use this feature" });
    }
  };

  return (
    <Fragment>
      <UserActionButtons
        favoriteHandler={favoriteHandler}
        watchlistHandler={watchlistHandler}
        ratingModalHandler={ratingModalHandler}
        isAddedToWatchlist={isAddedToWatchlist}
        isAddedToFavorites={isAddedToFavorites}
        savedRating={savedRating}
        isToastVisible={isToastVisible}
      />

      <Toast isToastVisible={isToastVisible}>
        <Span className='toast-message'>{toastMessage}</Span>
      </Toast>

      <RatingModal
        mediaType={mediaType}
        mediaId={mediaId}
        mediaName={`${name} (${releaseYear})`}
        closeModal={closeModal}
        posterPath={poster}
        releaseDate={airDate}
        isOpen={isModalVisible}
        title={name}
      />
    </Fragment>
  );
};

const UserActions = ({ mediaId, mediaType, mediaDetails }) => {
  return (
    <Fragment>
      <div className='mb-3'>
        <AddToListModal mediaType={mediaType} mediaId={mediaId} />
      </div>

      {matcher(mediaType, "movie") ? (
        <UserMovieActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} />
      ) : (
        <UserTVActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} />
      )}
    </Fragment>
  );
};

export default UserActions;
