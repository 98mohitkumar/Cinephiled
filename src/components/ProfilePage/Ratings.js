import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useContext, useMemo, useState } from 'react';
import { MediaContext } from '../../Store/MediaContext';
import { NoDataText } from '../../styles/GlobalComponents';
import { CardsContainerGrid } from '../Popular/PopularStyles';
import RatingModal, { useModal } from '../RatingModal/RatingModal';
import Tabs from '../Tabs/Tabs';
import MediaCard from './MediaCard';
import { CTAButton } from './ProfilePageStyles';

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();

  const { id, name, releaseDate, type } = mediaData;

  const year = useMemo(
    () => (releaseDate ? new Date(releaseDate).getFullYear() : 'TBA'),
    [releaseDate]
  );

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible && (
          <RatingModal
            key='rating-modal'
            mediaType={type}
            mediaId={id}
            closeModal={closeModal}
            mediaName={`${name} (${year})`}
          />
        )}
      </AnimatePresence>

      <CTAButton
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
      >
        Edit Rating
      </CTAButton>
    </Fragment>
  );
};

const Ratings = () => {
  const [tabState, setTabState] = useState('movies');
  const { ratedMovies, ratedTvShows } = useContext(MediaContext);

  const tabList = useMemo(
    () => [
      { key: 'movies', name: 'Movies' },
      { key: 'tv', name: 'TV Shows' }
    ],
    []
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
            key={`${ratedMovies?.length}-movies`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {ratedMovies.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {ratedMovies.map((movie) => (
                  <MediaCard
                    key={movie?.id}
                    data={movie}
                    link='movies'
                    rating={movie?.rating ?? false}
                  >
                    <RatingCTA
                      rating={movie?.rating}
                      mediaData={{
                        id: movie?.id,
                        name: movie?.title,
                        releaseDate: movie?.release_date,
                        type: 'movie'
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No movies rated yet
              </NoDataText>
            )}
          </motion.div>
        )}

        {tabState === 'tv' && (
          <motion.div
            key={`${ratedTvShows?.length}-tv`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {ratedTvShows.length > 0 ? (
              <CardsContainerGrid className='xl-row-gap'>
                {ratedTvShows.map((tv) => (
                  <MediaCard
                    key={tv?.id}
                    data={tv}
                    link='tv'
                    rating={tv?.rating ?? false}
                  >
                    <RatingCTA
                      rating={tv?.rating}
                      mediaData={{
                        id: tv?.id,
                        name: tv?.name,
                        releaseDate: tv?.first_air_date,
                        type: 'tv'
                      }}
                    />
                  </MediaCard>
                ))}
              </CardsContainerGrid>
            ) : (
              <NoDataText className='fw-bold text-center my-5'>
                No tv shows rated yet
              </NoDataText>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Ratings;
