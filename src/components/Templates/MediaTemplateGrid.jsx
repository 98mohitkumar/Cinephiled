import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import RatingTag from "components/RatingTag/RatingTag";
import { Grid, GridCol } from "components/UI/Grid";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { cn, getNiceName, getReleaseDate, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaTemplateGrid = ({ media, showRating = true, extraInfoCallback = null, mediaType = "movies", gridType = "poster", imageSize = "w500" }) => {
  const gridConfig = matches(gridType, "poster")
    ? {
        xxs: 2,
        sm: 3,
        lg: 4,
        xl: 5,
        "2xl": "desktopAutoFillMedia"
      }
    : {
        xxs: 2,
        md: 3,
        lg: 4,
        "2xl": 5,
        "4xl": 6
      };

  const getMediaRoute = (type) => {
    switch (type) {
      case "movie":
        return ROUTES.movies;
      case "tv":
        return ROUTES.tv;
      case "collections":
        return ROUTES.collections;
      case "lists":
        return ROUTES.lists;
      default:
        return ROUTES.movies;
    }
  };

  return (
    <Grid colConfig={gridConfig} className='items-start'>
      {media.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date, media_type, backdrop_path }, index) => (
        <GridCol title={title || name} key={id}>
          <Link href={`/${getMediaRoute(media_type || mediaType)}/${getNiceName({ id, name: title || name })}`} passHref>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}>
              <div className={cn("relative", matches(gridType, "poster") ? "aspect-poster" : "aspect-backdrop")}>
                <Image
                  src={getTMDBImage({ path: matches(gridType, "poster") ? poster_path : backdrop_path, type: gridType, size: imageSize })}
                  alt={title || name}
                  fill
                  className='rounded-xl object-cover shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
                {showRating ? <RatingTag rating={vote_average} /> : null}
              </div>
            </motion.div>
          </Link>

          {extraInfoCallback ? (
            extraInfoCallback(media[index])
          ) : (
            <div className='mt-24 pe-10'>
              <H6 weight='medium' className='text-balance'>
                {title || name}
              </H6>
              <P className='text-neutral-400' weight='medium' size='small-to-p'>
                {getReleaseDate(release_date || first_air_date)}
              </P>
            </div>
          )}
        </GridCol>
      ))}
    </Grid>
  );
};

export default MediaTemplateGrid;
