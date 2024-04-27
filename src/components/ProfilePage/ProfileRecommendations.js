import Loading from "components/Loading";
import { CardsContainerGrid } from "components/MediaTemplate/TemplateStyles";
import PlaceholderText from "components/PlaceholderText";
import { motion, AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import { framerTabVariants, removeDuplicates } from "src/utils/helper";
import { useMediaContext } from "Store/MediaContext";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";

const MovieRecommendations = () => {
  const { movieRecommendations } = useMediaContext();
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
        <PlaceholderText>No recommendations for now</PlaceholderText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const { tvRecommendations } = useMediaContext();
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
        <PlaceholderText>No recommendations for now</PlaceholderText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  const { movieRecommendationsLoading, tvRecommendationsLoading } = useMediaContext();
  return (
    <Fragment>
      {movieRecommendationsLoading || tvRecommendationsLoading ? (
        <Loading />
      ) : (
        <ProfileMediaTab>
          {(tabState) => (
            <AnimatePresence mode='wait' initial={false}>
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
