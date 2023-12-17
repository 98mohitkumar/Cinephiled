import { motion } from "framer-motion";
import { blurPlaceholder } from "globals/constants";
import useGetReleaseDates from "hooks/useGetReleaseDates";
import Image from "next/image";
import Link from "next/link";
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
  const releaseDates = useGetReleaseDates(TV);

  return (
    <CardsContainerGrid>
      {TV.length > 0 &&
        TV.map((Tv, i) => (
          <Cards key={Tv.id}>
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.95 }}>
              <Link
                href={`/tv/${Tv.id}-${Tv.name.replace(/[' ', '/']/g, "-")}`}
                passHref
                scroll={false}>
                <a className='relative block'>
                  <CardImg>
                    <Image
                      src={
                        Tv.poster_path
                          ? `https://image.tmdb.org/t/p/w500${Tv.poster_path}`
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
                    {!Tv.vote_average
                      ? "NR"
                      : Tv.vote_average % 1 === 0
                      ? Tv.vote_average
                      : Tv.vote_average.toFixed(1)}
                  </Rating>
                </a>
              </Link>
            </motion.div>
            <CardInfo>
              {creditsPage ? null : <InfoTitle>{Tv.name}</InfoTitle>}
              <ReleaseDate>{releaseDates[i]}</ReleaseDate>
              {creditsPage && Tv?.job ? (
                <p className='text-white text-base mt-1 font-medium'>{Tv.job.join(", ")}</p>
              ) : null}
            </CardInfo>
          </Cards>
        ))}
    </CardsContainerGrid>
  );
};

export default TVTemplate;
