import { CardsContainerGrid } from "components/Popular/PopularStyles";
import { motion, AnimatePresence } from "framer-motion";
import useInfiniteQuery from "hooks/useInfiniteQuery";
import removeDuplicates from "hooks/removeDuplicates";
import { useState, useMemo, Fragment, useContext } from "react";
import { MediaContext } from "Store/MediaContext";
import { NoDataText } from "styles/GlobalComponents";
import MediaCard from "./MediaCard";
import { ProfileMediaTab } from "./ProfilePage";

const MovieRecommendations = () => {
  const { movieRecommendations } = useContext(MediaContext);

  const { list: moviesList } = useInfiniteQuery({
    initialPage: 2,
    mediaType: "movie",
    isProfileRecommendations: true
  });

  const extendedList = useMemo(
    () => movieRecommendations.concat(moviesList),
    [movieRecommendations, moviesList]
  );

  const { cleanedItems } = removeDuplicates(extendedList);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      {cleanedItems.length > 0 ? (
        <CardsContainerGrid>
          {cleanedItems.map((movie) => (
            <MediaCard
              key={movie?.id}
              data={movie}
              link='movies'
              recommendation
            />
          ))}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='fw-bold text-center my-5'>
          No recommendations for now
        </NoDataText>
      )}
    </motion.div>
  );
};

const TvRecommendations = () => {
  const { tvRecommendations } = useContext(MediaContext);

  const { list: tvList } = useInfiniteQuery({
    initialPage: 2,
    mediaType: "tv",
    isProfileRecommendations: true
  });

  const extendedList = useMemo(
    () => tvRecommendations.concat(tvList),
    [tvList, tvRecommendations]
  );

  const { cleanedItems } = removeDuplicates(extendedList);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      {cleanedItems.length > 0 ? (
        <CardsContainerGrid>
          {cleanedItems.map((tv) => (
            <MediaCard key={tv?.id} data={tv} link='tv' recommendation />
          ))}
        </CardsContainerGrid>
      ) : (
        <NoDataText className='fw-bold text-center my-5'>
          No recommendations for now
        </NoDataText>
      )}
    </motion.div>
  );
};

const ProfileRecommendations = () => {
  const [tabState, setTabState] = useState("");

  return (
    <Fragment>
      <ProfileMediaTab tabState={tabState} setTabState={setTabState} />

      <AnimatePresence exitBeforeEnter initial={false}>
        {tabState === "movies" && <MovieRecommendations key='movies' />}

        {tabState === "tv" && <TvRecommendations key='tv' />}
      </AnimatePresence>
    </Fragment>
  );
};

export default ProfileRecommendations;
