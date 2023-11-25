import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";
import { GenreBG, OuterWrapper, OverFlowWrapper, PseudoTrack } from "./ExploreStyles";

const GenreSection = ({ genres, mediaType }) => {
  return (
    <Fragment>
      <h2 className='fs-3 m-0 mb-3'>{mediaType === "movie" ? "Movie" : "TV"} Genres</h2>

      <OuterWrapper>
        <OverFlowWrapper>
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/genre/${genre.id}-${genre.name}/${mediaType === "movie" ? "movies" : "tv"}`}
              passHref>
              <GenreBG
                genrename={genre.name.replaceAll(" ", "-")}
                as={motion.a}
                whileTap={{ scale: 0.9 }}>
                <span className='title'>{genre.name}</span>
              </GenreBG>
            </Link>
          ))}
        </OverFlowWrapper>
      </OuterWrapper>
      <PseudoTrack />
    </Fragment>
  );
};

const Genres = ({ movieGenres, tvGenres }) => {
  return (
    <Fragment>
      <div className='pb-3 pb-md-5 mb-3'>
        <GenreSection genres={movieGenres} mediaType='movie' />
      </div>

      <div>
        <GenreSection genres={tvGenres} mediaType='tv' />
      </div>
    </Fragment>
  );
};

export default Genres;
