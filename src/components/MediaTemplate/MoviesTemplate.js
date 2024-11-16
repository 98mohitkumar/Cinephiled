import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cards, CardImg, CardInfo, InfoTitle, ReleaseDate } from "./TemplateStyles";
import { Grid } from "components/Layout/helpers";
import RatingTag from "components/RatingTag/RatingTag";
import { blurPlaceholder } from "globals/constants";
import defaultImage from "images/DefaultImage.png";
import { getCleanTitle, getReleaseDate } from "utils/helper";

// redundant
const MoviesTemplate = ({ movies, creditsPage = false }) => {
  return (
    <Grid
      colConfig={{
        xxs: 2,
        xs: 3,
        md: 4,
        lg: 5,
        "2xl": "desktopAutoFitMedia"
      }}>
      {movies.length > 0
        ? movies.map(({ id, title, poster_path, vote_average, release_date, job }) => (
            <Cards key={id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 }
                }}
                whileTap={{ scale: 0.95 }}>
                <Link href={`/movie/${id}-${getCleanTitle(title)}`} passHref>
                  <div className='relative'>
                    <CardImg>
                      <Image
                        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage}
                        alt='movie-poster'
                        fill
                        style={{ objectFit: "cover" }}
                        className='poster'
                        placeholder='blur'
                        blurDataURL={blurPlaceholder}
                      />
                    </CardImg>
                    <RatingTag rating={vote_average} />
                  </div>
                </Link>
              </motion.div>
              <CardInfo>
                <InfoTitle className={creditsPage ? "leading-6" : ""}>{title}</InfoTitle>
                <ReleaseDate>{getReleaseDate(release_date)}</ReleaseDate>
                {creditsPage && job?.length > 0 ? <p className='text-base font-medium text-neutral-400'>{[...new Set(job)].join(", ")}</p> : null}
              </CardInfo>
            </Cards>
          ))
        : null}
    </Grid>
  );
};

export default MoviesTemplate;
