import {
  CardImg,
  CardInfo,
  Cards,
  InfoTitle,
  Rating,
  ReleaseDate
} from "components/MediaTemplate/TemplateStyles";
import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { getCleanTitle, getRating, getReleaseDate } from "src/utils/helper";
import { RatingOverlay } from "./ProfilePageStyles";

const MediaCard = ({ data, link, children, rating, recommendation }) => {
  return (
    <Cards>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 }
        }}
        whileTap={{ scale: 0.95 }}>
        <Link
          href={`/${link}/${data?.id}-${getCleanTitle(data?.title || data?.name)}`}
          passHref
          scroll={false}>
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
            {recommendation && (
              <Rating className='flex justify-center items-center'>
                {getRating(data?.vote_average)}
              </Rating>
            )}
          </div>
        </Link>
      </motion.div>
      {recommendation ? (
        <CardInfo>
          <InfoTitle>{data?.title || data?.name}</InfoTitle>
          <ReleaseDate>{getReleaseDate(data?.release_date || data?.first_air_date)}</ReleaseDate>
        </CardInfo>
      ) : (
        <div className='pt-4'>{children}</div>
      )}
    </Cards>
  );
};

export default MediaCard;
