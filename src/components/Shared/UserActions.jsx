import { Heart, ListCheck, ListPlus, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

import { useSetFavorite } from "apiRoutes/favorites";
import { useDeleteRating, useSetRating } from "apiRoutes/ratings";
import { useMediaAccountStates } from "apiRoutes/user";
import { useAddToWatchlist } from "apiRoutes/watchlist";
import { useModal } from "components/Modal/Modal";
import AddToListModal from "components/pages/Lists/AddToListModal";
import RatingModal from "components/RatingModal/RatingModal";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import { opacityMotionTransition, ROUTES } from "data/global";
import { useUserContext } from "Store/UserContext";
import { matches } from "utils/helper";

export const suggestLogin = () => {
  toast.info("Login Required", {
    description: "Please login first to use this feature",
    cancel: {
      label: (
        <Link href={`/${ROUTES.login}`} className='font-medium'>
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

const UserMovieActions = ({ mediaId, mediaType, mediaDetails }) => {
  const { userInfo } = useUserContext();

  const { setFavorite } = useSetFavorite();
  const { data: accountStates } = useMediaAccountStates({ mediaType: "movie", mediaId });

  const { addToWatchlist } = useAddToWatchlist();
  const { setRating } = useSetRating();
  const { deleteRating } = useDeleteRating();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToWatchlist = Boolean(accountStates?.watchlist);
  const isAddedToFavorites = Boolean(accountStates?.favorite);
  const savedRating = accountStates?.rated?.value || false;

  const title = mediaDetails?.title;
  const releaseDate = mediaDetails?.releaseDate;

  const favoriteHandler = async () => {
    if (userInfo?.accountId) {
      const response = await setFavorite({
        mediaType: "movie",
        mediaId,
        favoriteState: !isAddedToFavorites
      });

      if (response?.success) {
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

  const handleSubmitRating = async ({ rating }) => {
    const res = await setRating({ mediaType: "movie", mediaId, rating });

    if (res?.success) {
      toast.success("Rating saved successfully");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleDeleteRating = async () => {
    const res = await deleteRating({ mediaType: "movie", mediaId });

    if (res?.success) {
      toast.success("Rating deleted successfully");
    } else {
      toast.error("Something went wrong, please try again later");
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
        title={title}
        rating={savedRating}
        releaseDate={releaseDate}
        mediaType={mediaType}
        onSubmitRating={handleSubmitRating}
        onDeleteRating={handleDeleteRating}
      />
    </Fragment>
  );
};

const UserTVActions = ({ mediaId, mediaType, mediaDetails }) => {
  const { userInfo } = useUserContext();
  const { setFavorite } = useSetFavorite();
  const { addToWatchlist } = useAddToWatchlist();
  const { data: accountStates } = useMediaAccountStates({ mediaType: "tv", mediaId });
  const { setRating } = useSetRating();
  const { deleteRating } = useDeleteRating();
  const { isModalVisible, openModal, closeModal } = useModal();

  const isAddedToFavorites = Boolean(accountStates?.favorite);
  const isAddedToWatchlist = Boolean(accountStates?.watchlist);
  const savedRating = accountStates?.rated?.value || false;

  const name = mediaDetails?.name;
  const airDate = mediaDetails?.airDate;

  const favoriteHandler = async () => {
    if (userInfo?.accountId) {
      const response = await setFavorite({
        mediaType: "tv",
        mediaId,
        favoriteState: !isAddedToFavorites
      });

      if (response?.success) {
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

      if (response?.success) {
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

  const handleSubmitRating = async ({ rating }) => {
    const res = await setRating({ mediaType: "tv", mediaId, rating });

    if (res?.success) {
      toast.success("Rating saved successfully");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleDeleteRating = async () => {
    const res = await deleteRating({ mediaType: "tv", mediaId });

    if (res?.success) {
      toast.success("Rating deleted successfully");
    } else {
      toast.error("Something went wrong, please try again later");
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
        title={name}
        rating={savedRating}
        releaseDate={airDate}
        mediaType={mediaType}
        onSubmitRating={handleSubmitRating}
        onDeleteRating={handleDeleteRating}
      />
    </Fragment>
  );
};

const UserActions = ({ mediaId, mediaType, mediaDetails }) => {
  return (
    <Fragment>
      <AddToListModal mediaType={mediaType} mediaId={mediaId} />

      {matches(mediaType, "movie") ? (
        <UserMovieActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} />
      ) : (
        <UserTVActions mediaId={mediaId} mediaType={mediaType} mediaDetails={mediaDetails} />
      )}
    </Fragment>
  );
};

export default UserActions;
