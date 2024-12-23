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

const MediaTemplateGrid = ({ media, mediaType }) => {
  return (
    <Grid
      colConfig={{
        xxs: 2,
        sm: 3,
        lg: 4,
        xl: 5,
        "2xl": "desktopAutoFillMedia"
      }}>
      {media.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date }) => (
        <GridCol key={id}>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 }
            }}
            whileTap={{ scale: 0.95 }}>
            <Link href={`/${mediaType}/${id}-${getCleanTitle(title || name)}`} passHref>
              <div className='relative aspect-poster'>
                <Image
                  src={getTMDBImage({ path: poster_path, type: "poster" })}
                  alt={title || name}
                  fill
                  style={{ objectFit: "cover" }}
                  className='rounded-xl shadow-xl'
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
                <RatingTag rating={vote_average} />
              </div>
            </Link>
          </motion.div>
          <div className='mt-24 pe-10'>
            <H6 weight='semibold'>{title || name}</H6>
            <P className='mt-4 text-neutral-400' weight='medium' size='small-to-p'>
              {getReleaseDate(release_date || first_air_date)}
            </P>
          </div>
        </GridCol>
      ))}
    </Grid>
  );
};

export default MediaTemplateGrid;
