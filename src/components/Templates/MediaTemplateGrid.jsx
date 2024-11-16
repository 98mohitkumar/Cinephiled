import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "components/Layout/helpers";
import RatingTag from "components/RatingTag/RatingTag";
import H6 from "components/UI/Typography/H6";
import P from "components/UI/Typography/P";
import { blurPlaceholder } from "globals/constants";
import { getCleanTitle, getReleaseDate, getTMDBImage } from "utils/helper";

const MediaTemplateGrid = ({ media, mediaType }) => {
  return (
    <Grid
      colConfig={{
        xxs: 2,
        xs: 3,
        md: 4,
        lg: 5,
        "2xl": "desktopAutoFitMedia"
      }}>
      {media.map(({ id, title, name, poster_path, vote_average, release_date, first_air_date }) => (
        <div key={id}>
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
                  className='rounded-xl'
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
        </div>
      ))}
    </Grid>
  );
};

export default MediaTemplateGrid;
