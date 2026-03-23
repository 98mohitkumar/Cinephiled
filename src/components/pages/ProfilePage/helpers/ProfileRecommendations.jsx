import { motion, AnimatePresence } from "motion/react";
import { Fragment, useMemo } from "react";

import { LoadingSpinner } from "components/Loader/Loader";
import PlaceholderText from "components/Shared/PlaceholderText";
import MediaTemplateGrid from "components/Templates/MediaTemplateGrid";
import { apiEndpoints } from "data/apiEndpoints";
import { opacityMotionTransition } from "data/global";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import { useUserContext } from "Store/UserContext";
import { matches, removeDuplicates } from "utils/helper";

import { ProfileMediaTab } from "./ProfileMediaTab";

const MovieRecommendations = () => {
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => ["profile-recommendations", "movie", accountId], [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    maxPages: 5,
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getRecommendations({
        mediaType: "movie",
        accountId,
        pageQuery: page
      })
  });

  const { cleanedItems } = removeDuplicates(list);

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && cleanedItems.length === 0 ? (
        <LoadingSpinner />
      ) : cleanedItems.length > 0 ? (
        <MediaTemplateGrid media={cleanedItems} mediaType='movie' gridType='poster' isLoadingNewItems={isLoading} />
      ) : (
        <PlaceholderText>No Movie recommendations available</PlaceholderText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const {
    userInfo: { accountId }
  } = useUserContext();

  const queryKey = useMemo(() => ["profile-recommendations", "tv", accountId], [accountId]);

  const { list, isLoading } = useInfiniteQuery({
    initialPage: 1,
    useUserToken: true,
    queryKey,
    enabled: Boolean(accountId),
    maxPages: 5,
    getEndpoint: ({ page }) =>
      apiEndpoints.user.getRecommendations({
        mediaType: "tv",
        accountId,
        pageQuery: page
      })
  });

  const { cleanedItems } = removeDuplicates(list);

  return (
    <motion.div {...opacityMotionTransition}>
      {isLoading && cleanedItems.length === 0 ? (
        <LoadingSpinner />
      ) : cleanedItems.length > 0 ? (
        <MediaTemplateGrid media={cleanedItems} mediaType='tv' gridType='poster' isLoadingNewItems={isLoading} />
      ) : (
        <PlaceholderText>No TV Show recommendations available</PlaceholderText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  return (
    <Fragment>
      <ProfileMediaTab>
        {(tabState) => (
          <AnimatePresence mode='wait' initial={false}>
            {matches(tabState, "movies") && <MovieRecommendations key='movies' />}
            {matches(tabState, "tv") && <TvRecommendations key='tv' />}
          </AnimatePresence>
        )}
      </ProfileMediaTab>
    </Fragment>
  );
};

export default ProfileRecommendations;
