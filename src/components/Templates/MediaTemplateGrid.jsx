import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import RatingTag from "components/RatingTag/RatingTag";
import { Grid, GridCol } from "components/UI/Grid";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { blurPlaceholder } from "data/global";
import { getCleanTitle, getReleaseDate } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaTemplateGrid = ({ media }) => {
  return (
    <Grid
      colConfig={{
        xxs: 2,
        sm: 3,
        lg: 4,
        xl: 5,
        "2xl": "desktopAutoFillMedia"
      }}
      className='items-start'>
      {media.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date, media_type }) => (
        <Link href={`/${media_type}/${id}-${getCleanTitle(title || name)}`} passHref key={id}>
          <GridCol title={title || name}>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}>
              <div className='relative aspect-poster'>
                <Image
                  src={getTMDBImage({ path: poster_path, type: "poster" })}
                  alt={title || name}
                  fill
                  className='rounded-xl object-cover shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
                <RatingTag rating={vote_average} />
              </div>
            </motion.div>
            <div className='mt-24 pe-10'>
              <H6 weight='medium'>{title || name}</H6>
              <P className='text-neutral-400' weight='medium' size='small-to-p'>
                {getReleaseDate(release_date || first_air_date)}
              </P>
            </div>
          </GridCol>
        </Link>
      ))}
    </Grid>
  );
};

export default MediaTemplateGrid;
