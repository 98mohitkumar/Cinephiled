import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useContext } from "react";
import { framerTabVariants, removeDuplicates } from "src/utils/helper";
import { MediaContext } from "Store/MediaContext";
import { Loader, NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";

const MovieRecommendations = () => {
  const { movieRecommendations } = useContext(MediaContext);
  const { cleanedItems } = removeDuplicates(movieRecommendations);

  return (
    <motion.div
      variants={framerTabVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.5 }}>
      {cleanedItems.length > 0 ? (
        <CardsContainerGrid>
          {cleanedItems.map((movie) => (
            <MediaCard key={movie?.id} data={movie} link='movies' recommendation />
          ))}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='font-bold text-center my-5'>No recommendations for now</NoDataText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const { tvRecommendations } = useContext(MediaContext);
  const { cleanedItems } = removeDuplicates(tvRecommendations);

  return (
    <motion.div
      variants={framerTabVariants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{ duration: 0.5 }}>
      {cleanedItems.length > 0 ? (
        <CardsContainerGrid>
          {cleanedItems.map((tv) => (
            <MediaCard key={tv?.id} data={tv} link='tv' recommendation />
          ))}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='font-bold text-center my-5'>No recommendations for now</NoDataText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  const { movieRecommendationsLoading, tvRecommendationsLoading } = useContext(MediaContext);
  return (
    <Fragment>
      {movieRecommendationsLoading || tvRecommendationsLoading ? (
        <div className='min-h-[45vh] grid place-items-center'>
          <Loader className='profile-page' />
        </div>
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence exitBeforeEnter initial={false}>
              {tabState === "movies" && <MovieRecommendations key='movies' />}
              {tabState === "tv" && <TvRecommendations key='tv' />}
            </AnimatePresence>
          )}
        </ProfileMediaTab>
      )}
    </Fragment>
  );
};

export default ProfileRecommendations;
