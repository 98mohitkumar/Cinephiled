import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { theme } from "theme/theme";
import { getCleanTitle } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

export const CaseCarousel = ({ cast }) => {
  const [sliderRef] = useKeenSlider({
    renderMode: "performance",
    dragSpeed: 1.4,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 2.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.xs})`]: {
        slides: {
          perView: 2.75,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.sm})`]: {
        slides: {
          perView: 3.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.md})`]: {
        slides: {
          perView: 4.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.lg})`]: {
        slides: {
          perView: 5.25,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints.xl})`]: {
        slides: {
          perView: 6.25,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["2xl"]})`]: {
        slides: {
          perView: 7.25,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["3xl"]})`]: {
        slides: {
          perView: 8.25,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["4xl"]})`]: {
        slides: {
          perView: 9.25,
          spacing: 20
        }
      }
    }
  });

  return (
    <Fragment>
      <div ref={sliderRef} className='keen-slider'>
        {cast.map((item) => (
          <div key={item.id} className='keen-slider__slide'>
            <Link href={`/${ROUTES.person}/${item.id}-${getCleanTitle(item.name)}`} passHref>
              <motion.div className='relative aspect-profile' whileTap={{ scale: 0.95 }} title={item.name}>
                <Image
                  src={getTMDBImage({ path: item.profile_path, type: "profile", size: "w342" })}
                  alt={item.name}
                  fill
                  className='rounded-xl object-cover object-top shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </motion.div>

              <div className='mt-12'>
                <P size='large' weight='semibold' className='line-clamp-1' title={item.character}>
                  {item.character}
                </P>
                <P className='text-neutral-400' title={item.name}>
                  {item.name}
                </P>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
