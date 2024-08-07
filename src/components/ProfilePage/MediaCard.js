import { CardImg, Cards } from "components/MediaTemplate/TemplateStyles";
import RatingTag from "components/RatingTag/RatingTag";
import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { getCleanTitle } from "src/utils/helper";
import { RatingOverlay } from "./ProfilePageStyles";

const MediaCard = ({ data, link, children, rating }) => {
  return (
    <Cards>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 }
        }}
        whileTap={{ scale: 0.95 }}>
        <Link href={`/${link}/${data?.id}-${getCleanTitle(data?.title || data?.name)}`} passHref>
          <div className='relative'>
            <CardImg className='flex justify-end'>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                alt='movie-poster'
                fill
                style={{ objectFit: "cover" }}
                className='poster'
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />

              {rating && (
                <RatingOverlay>
                  <AiFillStar size='14px' />
                  <p className='m-0 font-semibold'>{rating}</p>
                </RatingOverlay>
              )}
            </CardImg>
            {rating ? null : <RatingTag rating={data?.vote_average} />}
          </div>
        </Link>
      </motion.div>

      <div className={rating ? "pt-4" : "pt-9"}>{children}</div>
    </Cards>
  );
};

export default MediaCard;
