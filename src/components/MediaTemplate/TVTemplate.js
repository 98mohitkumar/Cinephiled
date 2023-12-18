import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { getRating, getReleaseDate } from "src/utils/helper";
import {
  CardsContainerGrid,
  Cards,
  CardImg,
  Rating,
  CardInfo,
  InfoTitle,
  ReleaseDate
} from "./TemplateStyles";

const TVTemplate = ({ TV, creditsPage = false }) => {
  return (
    <CardsContainerGrid>
      {TV?.length > 0
        ? TV.map(({ id, name, poster_path, vote_average, first_air_date, job }) => (
            <Cards key={id}>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 }
                }}
                whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/tv/${id}-${name.replace(/[' ', '/']/g, "-")}`}
                  passHref
                  scroll={false}>
                  <a className='relative block'>
                    <CardImg>
                      <Image
                        src={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "/Images/DefaultImage.png"
                        }
                        alt='movie-poster'
                        layout='fill'
                        objectFit='cover'
                        className='poster'
                        placeholder='blur'
                        blurDataURL={blurPlaceholder}
                      />
                    </CardImg>
                    <Rating className='flex justify-center items-center'>
                      {getRating(vote_average)}
                    </Rating>
                  </a>
                </Link>
              </motion.div>
              <CardInfo>
                {creditsPage ? null : <InfoTitle>{name}</InfoTitle>}
                <ReleaseDate>{getReleaseDate(first_air_date)}</ReleaseDate>
                {creditsPage && job?.length > 0 ? (
                  <p className='text-white text-base mt-1 font-medium'>{job.join(", ")}</p>
                ) : null}
              </CardInfo>
            </Cards>
          ))
        : null}
    </CardsContainerGrid>
  );
};

export default TVTemplate;
