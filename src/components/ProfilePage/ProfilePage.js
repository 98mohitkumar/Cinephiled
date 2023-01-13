import MetaWrapper from 'components/MetaWrapper';
import Tabs, { LinearTabs } from 'components/Tabs/Tabs';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Fragment,
  useContext,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useRef
} from 'react';
import { MediaContext } from 'Store/MediaContext';
import { UserContext } from 'Store/UserContext';
import Favorites from './Favorites';
import { Banner, ProfileAvatar, ProfileStats } from './ProfilePageStyles';
import ProfileRecommendations from './ProfileRecommendations';
import Ratings from './Ratings';
import Watchlist from './Watchlist';

export const ProfileMediaTab = ({ tabState, setTabState }) => {
  const tabList = useMemo(
    () => [
      { key: 'movies', name: 'Movies' },
      { key: 'tv', name: 'TV Shows' }
    ],
    []
  );

  useLayoutEffect(() => {
    const tabPosition = localStorage.getItem('profileMediaTabState');
    setTabState((prev) => tabPosition ?? prev);
  }, [setTabState]);

  const tabHandler = useCallback(
    (tab) => {
      localStorage.setItem('profileMediaTabState', tab);
      setTabState(tab);
    },
    [setTabState]
  );

  return (
    <Tabs
      tabList={tabList}
      currentTab={tabState}
      setTab={tabHandler}
      className='mb-4'
    />
  );
};

const Profile = () => {
  const [currentTab, setCurrentTab] = useState('watchlist');
  const { userInfo } = useContext(UserContext);
  const {
    favoriteMovies,
    favoriteTvShows,
    moviesWatchlist,
    tvShowsWatchlist,
    ratedMovies,
    ratedTvShows
  } = useContext(MediaContext);

  const userAvatar = useMemo(
    () => ({
      type: userInfo?.avatar?.tmdb?.avatar_path ? 'tmdb' : 'hash',
      avatar:
        userInfo?.avatar?.tmdb?.avatar_path ?? userInfo?.avatar?.gravatar?.hash
    }),
    [userInfo?.avatar]
  );

  const stats = useMemo(
    () => ({
      Watchlist: moviesWatchlist?.length + tvShowsWatchlist?.length ?? 0,
      Favorites: favoriteMovies?.length + favoriteTvShows?.length ?? 0,
      Rated: ratedMovies?.length + ratedTvShows.length ?? 0
    }),
    [
      favoriteMovies?.length,
      favoriteTvShows?.length,
      moviesWatchlist?.length,
      ratedMovies?.length,
      ratedTvShows.length,
      tvShowsWatchlist?.length
    ]
  );

  const tabs = useMemo(
    () => [
      { key: 'watchlist', name: 'Watchlist' },
      { key: 'ratings', name: 'Ratings' },
      { key: 'favorites', name: 'Favorites' },
      { key: 'recommendations', name: 'Recommendations' }
    ],
    []
  );

  const tabHandler = useCallback((tab) => {
    localStorage.setItem('profileTab', tab);
    setCurrentTab(tab);
  }, []);

  const tabContainerRef = useRef(null);

  useLayoutEffect(() => {
    const tabPosition = localStorage.getItem('profileTab');
    setCurrentTab((prev) => tabPosition ?? prev);

    if (
      tabPosition === 'recommendations' &&
      tabContainerRef?.current &&
      window.innerWidth < 550
    ) {
      tabContainerRef.current.scrollLeft = 200;
    }
  }, [tabContainerRef.current]);

  return (
    <Fragment>
      <MetaWrapper
        title={`${(userInfo?.name ?? userInfo?.username) || ''} - Cinephiled`}
      />

      {userInfo?.id && (
        <div className='h-100 w-100 flex-grow-1'>
          {/* Banner  */}
          <Banner>
            <div className='BG' />
            <div className='on-top'>
              <div className='profile d-flex align-items-center justify-content-center flex-column'>
                <ProfileAvatar avatar={userAvatar} />
                <div className='text-center'>
                  <h4 className='fw-bold fs-1'>{userInfo?.name}</h4>
                  <h4
                    className={
                      userInfo?.name ? 'fw-normal fs-5 m-0' : 'fw-bold fs-1'
                    }
                  >
                    {userInfo?.username}
                  </h4>
                </div>
              </div>

              <ProfileStats>
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className='d-flex align-items-center'>
                    <h4 className='m-0 text'>{key}:</h4>{' '}
                    <h4 className='m-0 ms-2 fw-normal text'>{value}</h4>
                  </div>
                ))}
              </ProfileStats>
            </div>
          </Banner>

          {/* main content */}
          <div className='h-100 w-100 mt-3'>
            <div className='px-3'>
              <LinearTabs
                tabList={tabs}
                currentTab={currentTab}
                setTab={tabHandler}
                scrollRef={tabContainerRef}
              />
            </div>
            <AnimatePresence exitBeforeEnter initial={false}>
              {/* Watchlist */}
              {currentTab === 'watchlist' && (
                <motion.div
                  key='watchlist'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Watchlist />
                </motion.div>
              )}

              {/* ratings  */}
              {currentTab === 'ratings' && (
                <motion.div
                  key='ratings'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Ratings />
                </motion.div>
              )}

              {/* favorites  */}
              {currentTab === 'favorites' && (
                <motion.div
                  key='favorites'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Favorites />
                </motion.div>
              )}

              {/* recommendations */}
              {currentTab === 'recommendations' && (
                <motion.div
                  key='recommendations'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProfileRecommendations />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
