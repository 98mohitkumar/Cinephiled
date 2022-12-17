import { motion, AnimatePresence } from 'framer-motion';
import {
  useEffect,
  useState,
  useMemo,
  Fragment,
  useContext,
  useCallback
} from 'react';
import {
  revalidationWrapper,
  useAddToWatchlist
} from '../../apiEndpoints/user';
import { MediaContext } from '../../Store/MediaContext';
import { NoDataText } from '../../styles/GlobalComponents';
import { CardsContainerGrid } from '../Popular/PopularStyles';
import { useModal } from '../RatingModal/RatingModal';
import Tabs from '../Tabs/Tabs';
import MediaCard from './MediaCard';
import { ConfirmationModal, CTAButton, ModalCard } from './ProfilePageStyles';

export const WatchlistCTA = ({ clickHandler, mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const { name, releaseDate } = mediaData;

  const year = useMemo(
    () => new Date(releaseDate).getFullYear(),
    [releaseDate]
  );

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible && (
          <ConfirmationModal
            as={motion.div}
            key='rating-modal'
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                type: 'tween',
                duration: 0.6,
                ease: [0.77, 0, 0.175, 1]
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                type: 'tween',
                duration: 0.6,
                ease: [0.77, 0, 0.175, 1]
              }
            }}
          >
            <ModalCard>
              <h5 className='m-0'>
                Are you sure you want to remove{' '}
                <span className='d-inline fw-bold'>{`${name} (${year})`}</span>{' '}
                from your watchlist
              </h5>

              <div
                className='d-flex justify-between align-items-center pt-3'
                style={{ gap: '1rem' }}
              >
                <CTAButton
                  className='secondary'
                  onClick={closeModal}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                >
                  Keep it
                </CTAButton>
                <CTAButton
                  onClick={() => {
                    closeModal();
                    clickHandler();
                  }}
                  as={motion.button}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove it
                </CTAButton>
              </div>
            </ModalCard>
          </ConfirmationModal>
        )}
      </AnimatePresence>

      <CTAButton
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className='secondary text-danger'
      >
        Remove
      </CTAButton>
    </Fragment>
  );
};

const Watchlist = () => {
  const [tabState, setTabState] = useState('movies');
  const { moviesWatchlist, tvShowsWatchlist, revalidateWatchlist } =
    useContext(MediaContext);
  const [moviesWatchlistFromApi, setMoviesWatchlistFromApi] =
    useState(moviesWatchlist);
  const [tvShowsWatchlistFromApi, setTvShowsWatchlistFromApi] =
    useState(tvShowsWatchlist);

  const { addToWatchlist } = useAddToWatchlist();

  useEffect(() => {
    if (moviesWatchlist?.length > 0) {
      setMoviesWatchlistFromApi(moviesWatchlist);
    }
  }, [moviesWatchlist]);

  useEffect(() => {
    if (tvShowsWatchlist?.length > 0) {
      setTvShowsWatchlistFromApi(tvShowsWatchlist);
    }
  }, [tvShowsWatchlist]);

  const tabList = useMemo(
    () => [
      { key: 'movies', name: 'Movies' },
      { key: 'tv', name: 'TV Shows' }
    ],
    []
  );

  const filterMedia = useCallback(
    async ({ id, type }) => {
      const response = await addToWatchlist({
        mediaType: type,
        mediaId: id,
        watchlistState: false
      });

      if (response?.success) {
        if (type === 'movie') {
          setMoviesWatchlistFromApi((prev) =>
            prev?.filter((item) => item?.id !== id)
          );
          revalidationWrapper(() => revalidateWatchlist('moviesWatchlist'));
        } else {
          setTvShowsWatchlistFromApi((prev) =>
            prev?.filter((item) => item?.id !== id)
          );

          revalidationWrapper(() => revalidateWatchlist('tvShowsWatchlist'));
        }
      }
    },
    [revalidateWatchlist, addToWatchlist]
  );

  return (
    <Fragment>
      <Tabs
        tabList={tabList}
        currentTab={tabState}
        setTab={setTabState}
        className='mb-3'
      />

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === 'movies' && (
          <motion.div
            key={`${moviesWatchlistFromApi?.length}-movies`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {moviesWatchlistFromApi.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {moviesWatchlistFromApi.map((movie) => (
                  <MediaCard key={movie?.id} data={movie} link='movies'>
                    <WatchlistCTA
                      clickHandler={() =>
                        filterMedia({ id: movie?.id, type: 'movie' })
                      }
                      mediaData={{
                        name: movie?.title,
                        releaseDate: movie?.release_date
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No movies in watchlist yet
              </NoDataText>
            )}
          </motion.div>
        )}

        {tabState === 'tv' && (
          <motion.div
            key={`${tvShowsWatchlistFromApi?.length}-tv`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {tvShowsWatchlistFromApi.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {tvShowsWatchlistFromApi.map((tv) => (
                  <MediaCard key={tv?.id} data={tv} link='tv'>
                    <WatchlistCTA
                      clickHandler={() =>
                        filterMedia({ id: tv?.id, type: 'tv' })
                      }
                      mediaData={{
                        name: tv?.name,
                        releaseDate: tv?.first_air_date
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No tv shows in watchlist yet
              </NoDataText>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Watchlist;
