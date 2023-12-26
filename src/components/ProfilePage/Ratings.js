import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import RatingModal, { useModal } from "components/RatingModal/RatingModal";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { framerTabVariants, getReleaseYear } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import { Loader, NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";
import { CTAButton } from "./ProfilePageStyles";

const RatingCTA = ({ mediaData }) => {
  const { isModalVisible, openModal, closeModal } = useModal();
  const { id, name, releaseDate, type, posterPath } = mediaData;

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isModalVisible ? (
          <RatingModal
            key='rating-modal'
            mediaType={type}
            mediaId={id}
            posterPath={posterPath}
            releaseDate={releaseDate}
            title={name}
            closeModal={closeModal}
            mediaName={`${name} (${getReleaseYear(releaseDate)})`}
          />
        ) : null}
      </AnimatePresence>

      <CTAButton
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className='text-gray-950'>
        Edit Rating
      </CTAButton>
    </Fragment>
  );
};

const Ratings = () => {
  const { ratedMovies, ratedTvShows, ratedMoviesLoading, ratedTvShowsLoading } = useMediaContext();
  return (
    <Fragment>
      {ratedMoviesLoading || ratedTvShowsLoading ? (
        <div className='min-h-[45vh] grid place-items-center'>
          <Loader className='profile-page' />
        </div>
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              {tabState === "movies" && (
                <motion.div
                  key={`${ratedMovies?.length}-movies`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
                  {ratedMovies.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {ratedMovies.map((movie) => (
                        <MediaCard
                          key={movie?.id}
                          data={movie}
                          link='movies'
                          rating={movie?.rating ?? false}>
                          <RatingCTA
                            mediaData={{
                              id: movie?.id,
                              name: movie?.title,
                              posterPath: movie?.poster_path,
                              releaseDate: movie?.release_date,
                              type: "movie"
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
                  ) : (
                    <NoDataText className='font-bold text-center my-5'>
                      No Movies rated yet
                    </NoDataText>
                  )}
                </motion.div>
              )}

              {tabState === "tv" && (
                <motion.div
                  key={`${ratedTvShows?.length}-tv`}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  transition={{ duration: 0.5 }}>
                  {ratedTvShows.length > 0 ? (
                    <CardsContainerGrid className='xl-row-gap'>
                      {ratedTvShows.map((tv) => (
                        <MediaCard key={tv?.id} data={tv} link='tv' rating={tv?.rating ?? false}>
                          <RatingCTA
                            mediaData={{
                              id: tv?.id,
                              name: tv?.name,
                              releaseDate: tv?.first_air_date,
                              type: "tv"
                            }}
                          />
                        </MediaCard>
                      ))}
                    </CardsContainerGrid>
                  ) : (
                    <NoDataText className='font-bold text-center my-5'>
                      No TV shows rated yet
                    </NoDataText>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </ProfileMediaTab>
      )}
    </Fragment>
  );
};

export default Ratings;
