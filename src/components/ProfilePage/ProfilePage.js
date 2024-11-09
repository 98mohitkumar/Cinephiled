import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import Favorites from "./Favorites";
import { Banner, ProfileAvatar, ProfileStats } from "./ProfilePageStyles";
import ProfileRecommendations from "./ProfileRecommendations";
import Ratings from "./Ratings";
import Watchlist from "./Watchlist";
import MetaWrapper from "components/MetaWrapper";
import Tabs, { LinearTabs } from "components/Tabs/Tabs";
import useTabs from "hooks/useTabs";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { ModulesWrapper } from "styles/GlobalComponents";
import { framerTabVariants } from "utils/helper";

const tabList = [
  { key: "movies", name: "Movies" },
  { key: "tv", name: "TV Shows" }
];

const linearTabsList = [
  { key: "watchlist", name: "Watchlist" },
  { key: "ratings", name: "Ratings" },
  { key: "favorites", name: "Favorites" },
  { key: "recommendations", name: "Recommendations" }
];

export const ProfileMediaTab = ({ children }) => {
  const { activeTab, setTab } = useTabs({
    tabLocation: "profileMediaTab",
    defaultState: "movies"
  });

  return (
    <Fragment>
      <Tabs tabList={tabList} currentTab={activeTab} setTab={setTab} className='mb-4' />
      {children(activeTab)}
    </Fragment>
  );
};

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
    tabLocation: "profileTab",
    defaultState: "watchlist"
  });

  return (
    <Fragment>
      <MetaWrapper title={`${userInfo?.name || userInfo?.username || ""} - Cinephiled`} />

      {userInfo?.accountId ? (
        <div className='h-full w-full grow'>
          {/* Banner  */}
          <Banner>
            <div className='BG' />
            <div className='on-top'>
              <div className='profile flex flex-col items-center justify-center'>
                <ProfileAvatar $avatar={userAvatar} />
                <div className='text-center'>
                  <h4 className='text-[calc(1.375rem_+_1.5vw)] font-bold leading-snug xl:text-[2.5rem]'>{userInfo?.name}</h4>
                  {userInfo?.username && <h4 className='text-xl m-0 font-normal'>{userInfo?.username}</h4>}
                </div>
              </div>

              <ProfileStats>
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className='flex items-center'>
                    <h4 className='text-base sm:text-xl m-0 font-medium'>{key}:</h4>
                    <h4 className='text-base sm:text-xl m-0 ms-2 font-normal'>{value}</h4>
                  </div>
                ))}
              </ProfileStats>
            </div>
          </Banner>

          {/* main content */}
          <div className='mt-3 h-full w-full'>
            <div className='px-3'>
              <LinearTabs tabList={linearTabsList} currentTab={activeTab} setTab={setTab} />
            </div>
            <AnimatePresence mode='wait' initial={false}>
              {/* Watchlist */}
              {activeTab === "watchlist" && (
                <motion.div
                  key='watchlist'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  <ModulesWrapper>
                    <Watchlist />
                  </ModulesWrapper>
                </motion.div>
              )}

              {/* ratings  */}
              {activeTab === "ratings" && (
                <motion.div
                  key='ratings'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  <ModulesWrapper>
                    <Ratings />
                  </ModulesWrapper>
                </motion.div>
              )}

              {/* favorites  */}
              {activeTab === "favorites" && (
                <motion.div
                  key='favorites'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  <ModulesWrapper>
                    <Favorites />
                  </ModulesWrapper>
                </motion.div>
              )}

              {/* recommendations */}
              {activeTab === "recommendations" && (
                <motion.div
                  key='recommendations'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.325 }}>
                  <ModulesWrapper>
                    <ProfileRecommendations />
                  </ModulesWrapper>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;
