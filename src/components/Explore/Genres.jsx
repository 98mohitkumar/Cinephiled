import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";
import { Fragment } from "react";
import { genreCardStyles } from "./ExploreStyles";
import H4 from "components/Typography/H4";
import "keen-slider/keen-slider.min.css";
import H5 from "components/Typography/H5";
import { breakpoints } from "tokens/misc";
import { getCleanTitle, matches } from "utils/helper";

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
      [`(min-width: ${breakpoints.sm})`]: {
        slides: {
          perView: 2.75,
          spacing: 16
        }
      },
      [`(min-width: ${breakpoints.lg})`]: {
        slides: {
          perView: 3.75,
          spacing: 20
        }
      },
      [`(min-width: ${breakpoints.xl})`]: {
        slides: {
          perView: 4.75,
          spacing: 20
        }
      },
      [`(min-width: ${breakpoints["2xl"]})`]: {
        slides: {
          perView: 5.75,
          spacing: 20
        }
      },
      [`(min-width: 1800px)`]: {
        slides: {
          perView: 6.75,
          spacing: 20
        }
      }
    }
  });

  return (
    <Fragment>
      <H4 weight='medium' className='mb-16'>
        {matches(mediaType, "movie") ? "Movie" : "TV"} Genres
      </H4>

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
