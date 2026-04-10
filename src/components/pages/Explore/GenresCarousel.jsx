import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from "next/link";

import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import { ROUTES } from "data/global";
import { theme } from "theme/theme";
import { getNiceName, matches } from "utils/helper";

import { genreCardStyles } from "./ExploreStyles";
import { genreColorsMap } from "./genreColors";

const GenreSection = ({ genres, genreType }) => {
  const [sliderRef] = useKeenSlider({
    renderMode: "precision",
    dragSpeed: 1.75,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 1.35,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.xs})`]: {
        slides: {
          perView: 1.5,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.sm})`]: {
        slides: {
          perView: 2.15,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.lg})`]: {
        slides: {
          perView: 2.85,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.xl})`]: {
        slides: {
          perView: 3.5,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints["2xl"]})`]: {
        slides: {
          perView: 4.5,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints["3xl"]})`]: {
        slides: {
          perView: 5.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints["4xl"]})`]: {
        slides: {
          perView: 6.25,
          spacing: 16
        }
      }
    }
  });

  return (
    <div>
      <H4 weight='semibold' className='mb-16'>
        {matches(genreType, "movies") ? "Movie" : "TV"} Genres
      </H4>

      <div className='-mx-1664 overflow-clip px-1664'>
        <div ref={sliderRef} className='keen-slider !overflow-visible'>
          {genres.map((genre) => {
            const colors = genreColorsMap.find((color) => matches(genre.id, color.id));

            return (
              <div key={genre.id} className='keen-slider__slide'>
                <Link
                  href={`/${ROUTES.genres}/${getNiceName({ id: genre.id, name: genre.name })}/${genreType}`}
                  css={genreCardStyles({
                    backgroundColor: colors.backgroundColor,
                    backgroundImage: colors.backgroundImage,
                    backgroundBlendMode: colors.backgroundBlendMode
                  })}>
                  <H4 className='genre-name relative z-10 leading-8' weight='semibold'>
                    {genre.name}
                  </H4>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GenresCarousel = ({ movieGenres, tvGenres }) => {
  return (
    <FlexBox className='flex-col gap-2448'>
      <GenreSection genres={movieGenres} genreType='movies' />

      <GenreSection genres={tvGenres} genreType='tv' />
    </FlexBox>
  );
};

export default GenresCarousel;
