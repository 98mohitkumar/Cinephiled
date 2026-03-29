import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useMemo } from "react";
import { toast } from "sonner";

import {
  profileRatedInfiniteQueryKey,
  useDeleteRating,
  useProfileRatedMoviesCount,
  useProfileRatedTvCount,
  useSetRating
} from "apiRoutes/ratings";
import { LoadingSpinner } from "components/Loader/Loader";
import { useModal } from "components/Modal/Modal";
import RatingModal from "components/RatingModal/RatingModal";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { opacityMotionTransition } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { useUserContext } from "Store/UserContext";
import { matches } from "utils/helper";

import { ProfileMediaTab } from "./ProfileMediaTab";

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { setRating } = useSetRating();
  const { deleteRating } = useDeleteRating();

  const onSubmitRating = async ({ rating }) => {
    const res = await setRating({
      mediaType: mediaData.mediaType,
      mediaId: mediaData.mediaId,
      rating
    });

    if (res?.success) {
      toast.success("Rating saved successfully");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  const onDeleteRating = async () => {
    const res = await deleteRating({
      mediaType: mediaData.mediaType,
      mediaId: mediaData.mediaId
    });

    if (res?.success) {
      toast.success("Rating deleted successfully");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <Fragment>
      <RatingModal
        {...mediaData}
        isOpen={isModalVisible}
        closeModal={closeModal}
        onSubmitRating={onSubmitRating}
        onDeleteRating={onDeleteRating}
      />

      <Button className='mt-2024 flex justify-between' onClick={openModal} fullWidth weight='medium' title='Edit rating'>
        Edit Rating
        {mediaData?.rating ? (
          <P
            className='flex-center -me-16 gap-4 self-stretch border-l border-neutral-500 px-10 font-montserrat leading-3'
            weight='medium'
            size='small'>
            <Star size={12} fill='currentColor' />
            {mediaData?.rating}
          </P>
        ) : null}
      </Button>
    </Fragment>
  );
};

const RatedMovies = () => {
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => profileRatedInfiniteQueryKey(accountId, "movies"), [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getRated({
        mediaType: "movies",
        accountId,
        pageQuery: page
      })
  });

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && list.length === 0 ? (
        <LoadingSpinner />
      ) : list.length > 0 ? (
        <MediaTemplateGrid
          className='gap-y-3248'
          media={list}
          mediaType='movie'
          gridType='poster'
          showRating={false}
          isLoadingNewItems={isLoading}>
          {(movie) => (
            <RatingCTA
              mediaData={{
                mediaId: movie?.id,
                title: movie?.title,
                rating: movie?.rating,
                posterPath: movie?.poster_path,
                releaseDate: movie?.release_date,
                mediaType: "movie"
              }}
            />
          )}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No Movies rated yet</PlaceholderText>
      )}
    </motion.div>
  );
};

const RatedTvShows = () => {
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => profileRatedInfiniteQueryKey(accountId, "tv"), [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getRated({
        mediaType: "tv",
        accountId,
        pageQuery: page
      })
  });

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && list.length === 0 ? (
        <LoadingSpinner />
      ) : list.length > 0 ? (
        <MediaTemplateGrid
          className='gap-y-3248'
          media={list}
          mediaType='tv'
          gridType='poster'
          showRating={false}
          isLoadingNewItems={isLoading}>
          {(tv) => (
            <RatingCTA
              mediaData={{
                mediaId: tv?.id,
                title: tv?.name,
                rating: tv?.rating,
                releaseDate: tv?.first_air_date,
                posterPath: tv?.poster_path,
                mediaType: "tv"
              }}
            />
          )}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No TV Shows rated yet</PlaceholderText>
      )}
    </motion.div>
  );
};

const Ratings = () => {
  const { data: moviesCount = 0, isPending: moviesCountPending } = useProfileRatedMoviesCount();
  const { data: tvCount = 0, isPending: tvCountPending } = useProfileRatedTvCount();
  const countsLoading = moviesCountPending || tvCountPending;

  if (countsLoading) {
    return (
      <P size='large' className='text-center'>
        Loading your ratings...
      </P>
    );
  }

  return (
    <Fragment>
      <ProfileMediaTab tabCounts={{ movies: moviesCount, tv: tvCount }}>
        {(tabState) => (
          <AnimatePresence mode='wait' initial={false}>
            {matches(tabState, "movies") && <RatedMovies key='movies' />}
            {matches(tabState, "tv") && <RatedTvShows key='tv' />}
          </AnimatePresence>
        )}
      </ProfileMediaTab>
    </Fragment>
  );
};

export default Ratings;
