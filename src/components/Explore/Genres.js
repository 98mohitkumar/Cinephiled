import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";
import { getCleanTitle } from "src/utils/helper";
import { GenreBG, OverFlowWrapper, PseudoTrack } from "./ExploreStyles";

const GenreSection = ({ genres, mediaType }) => {
  return (
    <Fragment>
      <h2 className='text-[calc(1.3rem_+_.6vw)] xl:text-[1.75rem] font-medium m-0 mb-3'>
        {mediaType === "movie" ? "Movie" : "TV"} Genres
      </h2>

      <OverFlowWrapper className='snap-x snap-mandatory'>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}-${getCleanTitle(genre.name)}/${
              mediaType === "movie" ? "movies" : "tv"
            }`}
            passHref
            legacyBehavior>
            <GenreBG as={motion.a} whileTap={{ scale: 0.9 }} className='snap-start snap-always'>
              <span className='title'>{genre.name}</span>
            </GenreBG>
          </Link>
        ))}
      </OverFlowWrapper>
      <PseudoTrack />
    </Fragment>
  );
};

const Genres = ({ movieGenres, tvGenres }) => {
  return (
    <Fragment>
      <div className='pb-5 md:pb-7 mb-5'>
        <GenreSection genres={movieGenres} mediaType='movie' />
      </div>

      <div>
        <GenreSection genres={tvGenres} mediaType='tv' />
      </div>
    </Fragment>
  );
};

export default Genres;
