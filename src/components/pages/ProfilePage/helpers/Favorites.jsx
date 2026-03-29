import { motion, AnimatePresence } from "motion/react";
import { Fragment, useMemo } from "react";
import { toast } from "sonner";

import { profileFavoritesInfiniteQueryKey, useProfileFavoriteMoviesCount, useProfileFavoriteTvCount, useSetFavorite } from "apiRoutes/favorites";
import { LoadingSpinner } from "components/Loader/Loader";
import Modal, { useModal } from "components/Modal/Modal";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { opacityMotionTransition } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { useUserContext } from "Store/UserContext";
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

const FavoriteMovies = () => {
  const { setFavorite } = useSetFavorite();
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => profileFavoritesInfiniteQueryKey(accountId, "movies"), [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getFavorites({
        mediaType: "movies",
        accountId,
        pageQuery: page
      })
  });

  const removeFavorite = async (id) => {
    const response = await setFavorite({ mediaType: "movie", mediaId: id, favoriteState: false });

    if (response?.success) {
      toast.success("Item has been removed from favorites");
    } else {
      toast.error("An error occurred", { description: "An error occurred while removing the item from favorites, please try again later." });
    }
  };

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && list.length === 0 ? (
        <LoadingSpinner />
      ) : list.length > 0 ? (
        <MediaTemplateGrid className='gap-y-3248' media={list} mediaType='movie' gridType='poster' isLoadingNewItems={isLoading}>
          {(movie) => (
            <FavoritesCTA clickHandler={() => removeFavorite(movie?.id)} mediaData={{ name: movie?.title, releaseDate: movie?.release_date }} />
          )}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No Movies are marked as favorite yet</PlaceholderText>
      )}
    </motion.div>
  );
};

const FavoriteTvShows = () => {
  const { setFavorite } = useSetFavorite();
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => profileFavoritesInfiniteQueryKey(accountId, "tv"), [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getFavorites({
        mediaType: "tv",
        accountId,
        pageQuery: page
      })
  });

  const removeFavorite = async (id) => {
    const response = await setFavorite({ mediaType: "tv", mediaId: id, favoriteState: false });

    if (response?.success) {
      toast.success("Item has been removed from favorites");
    } else {
      toast.error("An error occurred", { description: "An error occurred while removing the item from favorites, please try again later." });
    }
  };

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && list.length === 0 ? (
        <LoadingSpinner />
      ) : list.length > 0 ? (
        <MediaTemplateGrid className='gap-y-3248' media={list} mediaType='tv' gridType='poster' isLoadingNewItems={isLoading}>
          {(tv) => <FavoritesCTA clickHandler={() => removeFavorite(tv?.id)} mediaData={{ name: tv?.name, releaseDate: tv?.first_air_date }} />}
        </MediaTemplateGrid>
      ) : (
        <PlaceholderText>No TV Shows are marked as favorite yet</PlaceholderText>
      )}
    </motion.div>
  );
};

const Favorites = () => {
  const { data: moviesCount = 0, isPending: moviesCountPending } = useProfileFavoriteMoviesCount();
  const { data: tvCount = 0, isPending: tvCountPending } = useProfileFavoriteTvCount();
  const countsLoading = moviesCountPending || tvCountPending;

  if (countsLoading) {
    return (
      <P size='large' className='text-center'>
        Loading your favorites...
      </P>
    );
  }

  return (
    <Fragment>
      <ProfileMediaTab tabCounts={{ movies: moviesCount, tv: tvCount }}>
        {(tabState) => (
          <AnimatePresence mode='wait' initial={false}>
            {matches(tabState, "movies") && <FavoriteMovies key='movies' />}
            {matches(tabState, "tv") && <FavoriteTvShows key='tv' />}
          </AnimatePresence>
        )}
      </ProfileMediaTab>
    </Fragment>
  );
};

export default Favorites;
