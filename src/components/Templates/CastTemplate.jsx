import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { GridCol, Grid } from "components/UI/Grid";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { theme } from "theme/theme";
import { getNiceName } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

export const CastCarousel = ({ cast, children }) => {
  const [sliderRef] = useKeenSlider({
    renderMode: "performance",
    dragSpeed: 1.75,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 2.25
        }
      },
      [`(min-width: ${theme.breakpoints.xs})`]: {
        slides: {
          perView: 2.75
        }
      },
      [`(min-width: ${theme.breakpoints.sm})`]: {
        slides: {
          perView: 3.25
        }
      },
      [`(min-width: ${theme.breakpoints.md})`]: {
        slides: {
          perView: 4.25
        }
      },
      [`(min-width: ${theme.breakpoints.lg})`]: {
        slides: {
          perView: 5.25
        }
      },
      [`(min-width: ${theme.breakpoints.xl})`]: {
        slides: {
          perView: 6.25
        }
      },
      [`(min-width: ${theme.breakpoints["2xl"]})`]: {
        slides: {
          perView: 7.25
        }
      },
      [`(min-width: ${theme.breakpoints["3xl"]})`]: {
        slides: {
          perView: 8.25
        }
      },
      [`(min-width: ${theme.breakpoints["4xl"]})`]: {
        slides: {
          perView: 9.25
        }
      }
    }
  });

  return (
    <Fragment>
      <div ref={sliderRef} className='keen-slider'>
        {cast.map((item) => (
          <div key={item.id} className='keen-slider__slide'>
            <div className='mr-1620'>
              <Link href={`/${ROUTES.person}/${getNiceName({ id: item.id, name: item.name })}`} passHref>
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

                {children ? (
                  children(item)
                ) : (
                  <div className='mt-12'>
                    <P weight='bold' className='line-clamp-2' title={item.character}>
                      {item.character}
                    </P>
                    <P className='text-neutral-400' title={item.name}>
                      {item.name}
                    </P>
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export const PeopleTemplateGrid = ({ items, children, additionalGridItem }) => {
  return (
    <Grid
      colConfig={{
        xxs: 2,
        xs: 3,
        md: 4,
        lg: "peopleGrid"
      }}>
      {items.map((person) => (
        <Link href={`/${ROUTES.person}/${getNiceName({ id: person.id, name: person.name })}`} passHref key={person.id} title={person.name}>
          <GridCol>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}>
              <div className='relative aspect-profile'>
                <Image
                  src={getTMDBImage({ path: person.profile_path, type: "profile", size: "w342" })}
                  alt={person.name}
                  fill
                  className='rounded-xl object-cover object-top shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </div>
            </motion.div>

            {children ? (
              children(person)
            ) : (
              <div className='mt-12'>
                <P tag='h6' weight='bold' className='text-pretty' title={person.name}>
                  {person.name}
                </P>
                <P className='text-neutral-400' weight='medium' size='small'>
                  {person.known_for_department}
                </P>
              </div>
            )}
          </GridCol>
        </Link>
      ))}

      {additionalGridItem || null}
    </Grid>
  );
};
