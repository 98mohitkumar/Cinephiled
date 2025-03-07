import { AnimatePresence, motion } from "motion/react";
import { Fragment } from "react";

import MetaWrapper from "components/Shared/MetaWrapper";
import { LinearTabs } from "components/Shared/Tabs/Tabs";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { opacityMotionTransition } from "data/global";
import useTabs from "hooks/useTabs";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { matches } from "utils/helper";

import Favorites from "./helpers/Favorites";
import ProfileRecommendations from "./helpers/ProfileRecommendations";
import Ratings from "./helpers/Ratings";
import Watchlist from "./helpers/Watchlist";
import { bannerStyles, ProfileAvatar } from "./ProfilePageStyles";

const linearTabsList = [
  { key: "watchlist", name: "Watchlist" },
  { key: "ratings", name: "Ratings" },
  { key: "favorites", name: "Favorites" },
  { key: "recommendations", name: "Recommendations" }
];

const Profile = () => {
  const { userInfo } = useUserContext();
  const { favoriteMovies, favoriteTvShows, moviesWatchlist, tvShowsWatchlist, ratedMovies, ratedTvShows } = useMediaContext();

  const userAvatar = {
    type: userInfo?.avatar?.tmdb?.avatar_path ? "tmdb" : "hash",
    avatar: userInfo?.avatar?.tmdb?.avatar_path || userInfo?.avatar?.gravatar?.hash
  };

  const stats = {
    Watchlist: moviesWatchlist?.length + tvShowsWatchlist?.length || 0,
    Favorites: favoriteMovies?.length + favoriteTvShows?.length || 0,
    Rated: ratedMovies?.length + ratedTvShows.length || 0
  };

  const { activeTab, setTab } = useTabs({
    tabLocation: "profileTab"
  });

  return (
    <Fragment>
      <MetaWrapper title={`${userInfo?.name || userInfo?.username || ""} - Cinephiled`} />

      {/* Banner  */}
      <div css={bannerStyles}>
        <div className='banner-background' />
        <div className='relative z-20 p-20'>
          <FlexBox className='flex-col items-center justify-center gap-8'>
            <ProfileAvatar $avatar={userAvatar} />
            <div className='text-center'>
              <H2>{userInfo?.name}</H2>
              {userInfo?.username && (
                <P size='large' className='mt-8'>
                  {userInfo?.username}
                </P>
              )}
            </div>
          </FlexBox>

          <FlexBox className='mt-32 flex-wrap justify-center gap-x-2448 gap-y-16'>
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className='flex items-center gap-4'>
                <P size='large' weight='bold'>
                  {key}:
                </P>
                <P size='large'>{value}</P>
              </div>
            ))}
          </FlexBox>
        </div>
      </div>

      <div className='mt-12 px-24'>
        <LinearTabs tabList={linearTabsList} currentTab={activeTab} setTab={setTab} />
      </div>

      {/* main content */}
      <LayoutContainer className='py-3248'>
        <AnimatePresence mode='wait' initial={false}>
          {/* Watchlist */}
          {matches(activeTab, "watchlist") && (
            <motion.div key='watchlist' {...opacityMotionTransition}>
              <Watchlist />
            </motion.div>
          )}

          {/* ratings  */}
          {matches(activeTab, "ratings") && (
            <motion.div {...opacityMotionTransition} key='ratings'>
              <Ratings />
            </motion.div>
          )}

          {/* favorites  */}
          {matches(activeTab, "favorites") && (
            <motion.div {...opacityMotionTransition} key='favorites'>
              <Favorites />
            </motion.div>
          )}

          {/* recommendations */}
          {matches(activeTab, "recommendations") && (
            <motion.div {...opacityMotionTransition} key='recommendations'>
              <ProfileRecommendations />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutContainer>
    </Fragment>
  );
};

export default Profile;
