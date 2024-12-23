import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { Fragment } from "react";

import H3 from "components/UI/Typography/H3";
import H5 from "components/UI/Typography/H5";
import { theme } from "theme/theme";
import { getCleanTitle, matches } from "utils/helper";

import { genreCardStyles } from "./ExploreStyles";

const GenreSection = ({ genres, mediaType }) => {
  const [sliderRef] = useKeenSlider({
    renderMode: "performance",
    dragSpeed: 1.4,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 1.75,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.sm})`]: {
        slides: {
          perView: 2.75,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.lg})`]: {
        slides: {
          perView: 3.75,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints.xl})`]: {
        slides: {
          perView: 4.75,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["2xl"]})`]: {
        slides: {
          perView: 5.75,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["3xl"]})`]: {
        slides: {
          perView: 6.75,
          spacing: 20
        }
      }
    }
  });

  return (
    <Fragment>
      <H3 weight='semibold' className='mb-16'>
        {matches(mediaType, "movie") ? "Movie" : "TV"} Genres
      </H3>

      <div ref={sliderRef} className='keen-slider'>
        {genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}-${getCleanTitle(genre.name)}/${mediaType === "movie" ? "movies" : "tv"}`}
            passHref
            legacyBehavior>
            <a className='keen-slider__slide' css={genreCardStyles}>
              <H5 className='z-2 text-center' weight='semibold'>
                {genre.name}
              </H5>
            </a>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

const Genres = ({ movieGenres, tvGenres }) => {
  return (
    <Fragment>
      <div className='mb-2448'>
        <GenreSection genres={movieGenres} mediaType='movie' />
      </div>

      <div>
        <GenreSection genres={tvGenres} mediaType='tv' />
      </div>
    </Fragment>
  );
};

export default Genres;
