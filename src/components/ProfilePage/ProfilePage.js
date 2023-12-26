import MetaWrapper from "components/MetaWrapper";
import Tabs, { LinearTabs } from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import useTabs from "hooks/useTabs";
import { Fragment } from "react";
import { framerTabVariants } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import { useUserContext } from "Store/UserContext";
import { ModulesWrapper } from "styles/GlobalComponents";
import Favorites from "./Favorites";
import { Banner, ProfileAvatar, ProfileStats } from "./ProfilePageStyles";
import ProfileRecommendations from "./ProfileRecommendations";
import Ratings from "./Ratings";
import Watchlist from "./Watchlist";

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
    tabLocation: "profileMediaTabState",
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
  const {
    favoriteMovies,
    favoriteTvShows,
    moviesWatchlist,
    tvShowsWatchlist,
    ratedMovies,
    ratedTvShows
  } = useMediaContext();

  const userAvatar = {
    type: userInfo?.avatar?.tmdb?.avatar_path ? "tmdb" : "hash",
    avatar: userInfo?.avatar?.tmdb?.avatar_path ?? userInfo?.avatar?.gravatar?.hash
  };

  const stats = {
    Watchlist: moviesWatchlist?.length + tvShowsWatchlist?.length ?? 0,
    Favorites: favoriteMovies?.length + favoriteTvShows?.length ?? 0,
    Rated: ratedMovies?.length + ratedTvShows.length ?? 0
  };

  const { activeTab, setTab } = useTabs({
    tabLocation: "profileTab",
    defaultState: "watchlist"
  });

  return (
    <Fragment>
      <MetaWrapper title={`${(userInfo?.name ?? userInfo?.username) || ""} - Cinephiled`} />

      {userInfo?.accountId ? (
        <div className='h-full w-full grow'>
          {/* Banner  */}
          <Banner>
            <div className='BG' />
            <div className='on-top'>
              <div className='profile flex items-center justify-center flex-col'>
                <ProfileAvatar avatar={userAvatar} />
                <div className='text-center'>
                  <h4 className='font-bold text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem]'>
                    {userInfo?.name}
                  </h4>
                  {userInfo?.username && (
                    <h4 className='font-normal text-xl m-0'>{userInfo?.username}</h4>
                  )}
                </div>
              </div>

              <ProfileStats>
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className='flex items-center'>
                    <h4 className='m-0 text-base sm:text-xl font-medium'>{key}:</h4>
                    <h4 className='m-0 ms-2 font-normal text-base sm:text-xl'>{value}</h4>
                  </div>
                ))}
              </ProfileStats>
            </div>
          </Banner>

          {/* main content */}
          <div className='h-full w-full mt-3'>
            <div className='px-3'>
              <LinearTabs tabList={linearTabsList} currentTab={activeTab} setTab={setTab} />
            </div>
            <AnimatePresence exitBeforeEnter initial={false}>
              {/* Watchlist */}
              {activeTab === "watchlist" && (
                <motion.div
                  key='watchlist'
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
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
                  transition={{ duration: 0.5 }}>
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
                  transition={{ duration: 0.5 }}>
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
                  transition={{ duration: 0.5 }}>
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
