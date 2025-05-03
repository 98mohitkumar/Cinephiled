import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import RatingTag from "components/RatingTag/RatingTag";
import { Grid, GridCol } from "components/UI/Grid";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder } from "data/global";
import { cn, getNiceName, getReleaseDate, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

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

const MediaTemplateGrid = ({
  media,
  showRating = true,
  children = null,
  mediaType = "movie",
  gridType = "poster",
  imageSize = "w500",
  className = "",
  gridConfig = null
}) => {
  const gridSizeConfig =
    gridConfig ||
    (matches(gridType, "poster")
      ? { xxs: 2, sm: 3, lg: 4, xl: 5, "2xl": "desktopAutoFillMedia" }
      : { xxs: 1, xs: 2, lg: "desktopAutoFillMediaBackdrop" });

  return (
    <Grid colConfig={gridSizeConfig} className={cn("items-start gap-y-2032", className)}>
      {media.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date, media_type, backdrop_path }, index) => (
        <GridCol key={id}>
          <Link href={`/${getMediaRoute(media_type || mediaType)}/${getNiceName({ id, name: title || name })}`} passHref title={title || name}>
            <motion.div whileHover={{ scale: 1.05, transition: { duration: 0.1 } }} whileTap={{ scale: 0.95 }}>
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

          {children ? (
            children(media[index])
          ) : (
            <div className='mt-2024'>
              <H6 weight='semibold' className='line-clamp-2 text-pretty'>
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
