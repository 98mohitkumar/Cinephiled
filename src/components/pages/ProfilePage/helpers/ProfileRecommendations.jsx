import { ListPlus, ListX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Fragment } from "react";
import { toast } from "sonner";

import { useAddToWatchlist } from "apiRoutes/user";
import { LoadingSpinner } from "components/Loader/Loader";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import { opacityMotionTransition } from "data/global";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { matches, removeDuplicates } from "utils/helper";

import { ProfileMediaTab } from "./ProfileMediaTab";

const MovieRecommendations = () => {
  const { userInfo } = useUserContext();
  const { addToWatchlist } = useAddToWatchlist();
  const { movieRecommendations, moviesWatchlist, validateMedia } = useMediaContext();
  const { cleanedItems } = removeDuplicates(movieRecommendations);

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
        toast.success(isAlreadyInWatchlist ? "Removed from watchlist" : "Added to watchlist");
      } else {
        toast.error("Something went wrong, try again later");
      }
    }
  };

  return (
    <motion.div {...opacityMotionTransition}>
      {cleanedItems.length > 0 ? (
        <MediaTemplateGrid className='gap-y-3248' media={cleanedItems} mediaType='movie' gridType='poster'>
          {(movie) => {
            const isAlreadyInWatchlist = isAddedToWatchlist(movie?.id);
            return (
              <Button
                key={movie?.id}
                title={isAlreadyInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                fullWidth
                variant={isAlreadyInWatchlist ? "danger" : "outline"}
                className='mt-32'
                onClick={() =>
                  watchlistHandler({
                    mediaId: movie?.id,
                    poster: movie?.poster_path,
                    title: movie?.title,
                    releaseDate: movie?.release_date,
                    rating: movie?.vote_average
                  })
                }>
                <AnimatePresence mode='wait' initial={false}>
                  <motion.div
                    key={`watchlist - ${isAlreadyInWatchlist.toString()}`}
                    className='flex items-center justify-center gap-4'
                    {...opacityMotionTransition}>
                    {isAlreadyInWatchlist ? <ListX size={22} /> : <ListPlus size={22} />}
                    {isAlreadyInWatchlist ? "Remove" : "Add"}
                  </motion.div>
                </AnimatePresence>
              </Button>
            );
          }}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No Movie recommendations available</PlaceholderText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const { userInfo } = useUserContext();
  const { addToWatchlist } = useAddToWatchlist();
  const { tvRecommendations, tvShowsWatchlist, validateMedia } = useMediaContext();
  const { cleanedItems } = removeDuplicates(tvRecommendations);

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
        toast.success(isAlreadyInWatchlist ? "Removed from watchlist" : "Added to watchlist");
      } else {
        toast.error("Something went wrong, try again later");
      }
    }
  };

  return (
    <motion.div {...opacityMotionTransition}>
      {cleanedItems.length > 0 ? (
        <MediaTemplateGrid className='gap-y-3248' media={cleanedItems} mediaType='tv' gridType='poster'>
          {(tv) => {
            const isAlreadyInWatchlist = isAddedToWatchlist(tv?.id);
            return (
              <Button
                fullWidth
                variant={isAlreadyInWatchlist ? "danger" : "outline"}
                className='mt-32'
                onClick={() =>
                  watchlistHandler({
                    mediaId: tv?.id,
                    name: tv?.name,
                    poster: tv?.poster_path,
                    airDate: tv?.first_air_date,
                    rating: tv?.vote_average
                  })
                }>
                <AnimatePresence mode='wait' initial={false}>
                  <motion.div
                    className='flex items-center justify-center gap-4'
                    key={`watchlist - ${isAlreadyInWatchlist.toString()}`}
                    {...opacityMotionTransition}>
                    {isAlreadyInWatchlist ? <ListX size={22} /> : <ListPlus size={22} />}
                    {isAlreadyInWatchlist ? "Remove" : "Add"}
                  </motion.div>
                </AnimatePresence>
              </Button>
            );
          }}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No TV Show recommendations available</PlaceholderText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  const { isLoading } = useMediaContext();

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence mode='wait' initial={false}>
              {matches(tabState, "movies") && <MovieRecommendations key='movies' />}
              {matches(tabState, "tv") && <TvRecommendations key='tv' />}
            </AnimatePresence>
          )}
        </ProfileMediaTab>
      )}
    </Fragment>
  );
};

export default ProfileRecommendations;
