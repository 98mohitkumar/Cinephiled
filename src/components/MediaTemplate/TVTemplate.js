import { motion } from "framer-motion";
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

const TVTemplate = ({ TV }) => {
  const releaseDates = useGetReleaseDates(TV);

  return (
    <CardsContainerGrid>
      {TV.length > 0 &&
        TV.map(
          (TV, i) =>
            TV.poster_path && (
              <Cards key={TV.id}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/tv/${TV.id}-${TV.name.replace(/[' ', '/']/g, "-")}`}
                    passHref
                    scroll={false}>
                    <a className='relative block'>
                      <CardImg>
                        <Image
                          src={
                            TV.poster_path
                              ? `https://image.tmdb.org/t/p/w500${TV.poster_path}`
                              : "/Images/DefaultImage.png"
                          }
                          alt='movie-poster'
                          layout='fill'
                          objectFit='cover'
                          className='poster'
                          placeholder='blur'
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </CardImg>

                      <Rating className='flex justify-center items-center'>
                        {!TV.vote_average ? "NR" : TV.vote_average.toFixed(1)}
                      </Rating>
                    </a>
                  </Link>
                </motion.div>
                <CardInfo>
                  <InfoTitle>{TV.name}</InfoTitle>
                  <ReleaseDate>{releaseDates[i]}</ReleaseDate>
                </CardInfo>
              </Cards>
            )
        )}
    </CardsContainerGrid>
  );
};

export default TVTemplate;
