import { Heart, ListCheck, ListPlus, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

import { useAddToWatchlist, useSetFavorite } from "apiRoutes/user";
import { useModal } from "components/Modal/Modal";
import AddToListModal from "components/pages/Lists/AddToListModal";
import RatingModal from "components/RatingModal/RatingModal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import { opacityMotionTransition, ROUTES } from "data/global";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { matches } from "utils/helper";

export const suggestLogin = () => {
  toast.info("Login Required", {
    description: "Please login first to use this feature",
    cancel: {
      label: (
        <Link href={ROUTES.login} className='font-medium'>
          Login
        </Link>
      )
    }
  });
};

const UserActionButtons = ({ watchlistHandler, favoriteHandler, ratingModalHandler, isAddedToWatchlist, isAddedToFavorites, savedRating }) => {
  return (
    <FlexBox className='items-center gap-8'>
      <Button onClick={favoriteHandler} shape='circle' size='small' title={isAddedToFavorites ? "Remove from favorites" : "Add to favorites"}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div key={`favorite - ${isAddedToFavorites.toString()}`} {...opacityMotionTransition}>
            {isAddedToFavorites ? <Heart size={16} fill='currentColor' /> : <Heart size={16} />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <Button onClick={ratingModalHandler} shape='circle' size='small' title={savedRating ? "Update your rating" : "Rate this media"}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div key={`rating - ${savedRating.toString()}`} {...opacityMotionTransition}>
            {savedRating ? <Star size={16} fill='currentColor' /> : <Star size={16} />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <Button onClick={watchlistHandler} shape='circle' size='small' title={isAddedToWatchlist ? "Remove from watchlist" : "Add to watchlist"}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div key={`watchlist - ${isAddedToWatchlist.toString()}`} {...opacityMotionTransition}>
            {isAddedToWatchlist ? <ListCheck size={16} /> : <ListPlus size={16} />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </FlexBox>
  );
};

const UserMovieActions = ({ mediaId, mediaType, mediaDetails, rating }) => {
  const { userInfo } = useUserContext();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const { favoriteMovies, moviesWatchlist, ratedMovies, validateMedia } = useMediaContext();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToWatchlist = moviesWatchlist?.some((item) => item.id === mediaId);
  const isAddedToFavorites = favoriteMovies?.some((item) => item.id === mediaId);
  const savedRating = ratedMovies?.find((item) => item?.id === mediaId)?.rating || false;

  const title = mediaDetails?.title;
  const poster = mediaDetails?.poster;
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
            release_date: releaseDate,
            vote_average: rating
          });

          validateMedia({
            state: "added",
            id: mediaId,
            key: "favoriteMovies",
            media: updatedMedia
          });
        }

        toast.success(isAddedToFavorites ? "Removed from favorites" : "Added to favorites");
      } else {
        toast.error("Something went wrong, try again later");
      }
    } else {
      suggestLogin();
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
        toast.success(isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist");
      } else {
        toast.error("Something went wrong, try again later");
      }
    } else {
      suggestLogin();
    }
  };

  const ratingModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      suggestLogin();
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
      />

      <RatingModal
        isOpen={isModalVisible}
        closeModal={closeModal}
        mediaId={mediaId}
        title={title}
        rating={savedRating}
        posterPath={poster}
        releaseDate={releaseDate}
        mediaType={mediaType}
      />
    </Fragment>
  );
};

const UserTVActions = ({ mediaId, mediaType, mediaDetails, rating }) => {
  const { userInfo } = useUserContext();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const { favoriteTvShows, tvShowsWatchlist, ratedTvShows, validateMedia } = useMediaContext();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToFavorites = favoriteTvShows?.some((item) => item.id === mediaId);
  const isAddedToWatchlist = tvShowsWatchlist?.some((item) => item.id === mediaId);
  const savedRating = ratedTvShows?.find((item) => item?.id === mediaId)?.rating || false;

  const name = mediaDetails?.name;
  const poster = mediaDetails?.poster;
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
            first_air_date: airDate,
            vote_average: rating
          });

          validateMedia({
            state: "added",
            id: mediaId,
            media: updatedMedia,
            key: "favoriteTvShows"
          });
        }

        toast.success(isAddedToFavorites ? "Removed from favorites" : "Added to favorites");
      } else {
        toast.error("Something went wrong, try again later");
      }
    } else {
      suggestLogin();
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

        toast.success(isAddedToWatchlist ? "Removed from watchlist" : "Added to watchlist");
      } else {
        toast.error("Something went wrong, try again later");
      }
    } else {
      suggestLogin();
    }
  };

  const ratingModalHandler = () => {
    if (userInfo?.accountId) {
      openModal();
    } else {
      suggestLogin();
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
        savedRating={savedRating} // for rating button conditional rendering
      />

      <RatingModal
        isOpen={isModalVisible}
        closeModal={closeModal}
        mediaId={mediaId}
        title={name}
        rating={savedRating}
        releaseDate={airDate}
        posterPath={poster}
        mediaType={mediaType}
      />
    </Fragment>
  );
};

const UserActions = ({ mediaId, mediaType, mediaDetails, rating }) => {
  return (
    <Fragment>
      <AddToListModal mediaType={mediaType} mediaId={mediaId} />

      {matches(mediaType, "movie") ? (
        <UserMovieActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} rating={rating} />
      ) : (
        <UserTVActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} rating={rating} />
      )}
    </Fragment>
  );
};

export default UserActions;
