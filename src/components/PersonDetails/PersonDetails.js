import { HeroInfoTitle, HeroInfoWrapper, Span } from "components/MovieInfo/MovieDetailsStyles";
import {
  RecommendationsGrid,
  RecommendedImg,
  RecommendedWrapper,
  InfoTitle
} from "components/Recommendations/RecommendationsStyles";
import { motion } from "framer-motion";
import removeDuplicates from "hooks/removeDuplicates";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useMemo } from "react";
import {
  DetailsHeroWrap,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper,
  ModulesWrapper
} from "styles/GlobalComponents";
import { Bio, Details } from "./PersonDetails.styles";

const PersonDetails = ({ details }) => {
  const getGender = (g) => {
    switch (g) {
      case 0:
        return "-";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non Binary";
    }
  };

  const works = useMemo(
    () =>
      details?.known_for_department === "Acting"
        ? details?.combined_credits?.cast
        : details?.combined_credits?.crew,
    [
      details?.combined_credits?.cast,
      details?.combined_credits?.crew,
      details?.known_for_department
    ]
  );

  works?.sort((a, z) => z.vote_count - a.vote_count); // sort works array
  works?.length > 100 && works.splice(100); // splice if bigger than 100 for filtering

  const { cleanedItems: cleaned } = removeDuplicates(works || []);

  const getAge = (b, alive) => {
    if (alive) {
      const today = new Date();
      const age = Math.floor(
        (today - new Date(details.birthday)) / (1000 * 3600 * 24 * 30.4375 * 12)
      );

      return age;
    } else {
      const diedAt = Math.floor(
        (new Date(b) - new Date(details.birthday)) / (1000 * 3600 * 24 * 30.4375 * 12)
      );

      return diedAt;
    }
  };

  return (
    <div className='mb-auto'>
      <HeroDetailsContainer className='relative mb-auto person-details'>
        <DetailsHeroWrap style={{ minHeight: "auto" }} className='pb-0'>
          <HeroImgWrapper>
            <HeroImg className='no-shadow relative text-center'>
              <Image
                src={
                  details.profile_path
                    ? `https://image.tmdb.org/t/p/w500${details.profile_path}`
                    : "/Images/DefaultImage.png"
                }
                alt='cast-image'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </HeroImg>
          </HeroImgWrapper>

          <HeroInfoWrapper className='w-full me-auto' style={{ maxWidth: "700px" }}>
            <HeroInfoTitle>{details.name}</HeroInfoTitle>

            <Details className='py-4'>
              <div>
                <Span className='block font-bold'>Gender</Span>
                <Span className='block font-normal'>{getGender(details.gender)}</Span>
              </div>

              {!details.deathday && details.birthday && (
                <div>
                  <Span className='block font-bold'>Age</Span>
                  <Span className='block font-normal'>
                    {getAge(details.birthday, true)} years old
                  </Span>
                </div>
              )}

              {details.birthday && (
                <div>
                  <Span className='block font-bold'>Birthday</Span>
                  <Span className='block font-normal'>{details.birthday}</Span>
                </div>
              )}

              {details.deathday && (
                <div>
                  <Span className='block font-bold'>Death Day</Span>
                  <Span className='block font-normal'>{details.deathday}</Span>
                </div>
              )}

              {details.deathday && (
                <div>
                  <Span className='block font-bold'>Died at</Span>
                  <Span className='block font-normal'>
                    {getAge(details.deathday, false)} years old
                  </Span>
                </div>
              )}

              <div>
                <Span className='block font-bold'>Known For</Span>
                <Span className='block font-normal'>{details.known_for_department}</Span>
              </div>

              <div>
                <Span className='block font-bold'>Known Credits</Span>
                <Span className='block font-normal'>{cleaned.length}</Span>
              </div>
            </Details>
          </HeroInfoWrapper>
        </DetailsHeroWrap>

        {details.biography && (
          <div className='mt-6 md:mt-14'>
            {details.biography && (
              <Fragment>
                <Span className='block text-3xl md:text-4xl font-bold'>Biography</Span>
                <Bio>{details.biography}</Bio>
              </Fragment>
            )}
          </div>
        )}
      </HeroDetailsContainer>

      {cleaned?.length > 0 && (
        <ModulesWrapper>
          <Span className='block text-[calc(1.425rem_+_2.1vw)] xl:text-5xl text-center genre'>
            Filmography
          </Span>

          <RecommendationsGrid>
            {cleaned.map((item, i) =>
              item.media_type === "movie"
                ? !item?.duplicate && (
                    <RecommendedWrapper key={i}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}>
                        <Link
                          href={`/movies/${item.id}-${item.title.replace(/[' ', '/']/g, "-")}`}
                          passHref
                          scroll={false}>
                          <a>
                            <RecommendedImg className='relative text-center'>
                              <Image
                                src={
                                  item.backdrop_path
                                    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                    : "/Images/DefaultBackdrop.png"
                                }
                                alt='movie-backdrop'
                                layout='fill'
                                objectFit='cover'
                                placeholder='blur'
                                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                              />
                            </RecommendedImg>
                          </a>
                        </Link>
                      </motion.div>
                      <InfoTitle className='mt-3 text-center'>{item.title}</InfoTitle>
                    </RecommendedWrapper>
                  )
                : !item?.duplicate && (
                    <RecommendedWrapper key={i}>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}>
                        <Link
                          href={`/tv/${item.id}-${item.name.replace(/[' ', '/']/g, "-")}`}
                          passHref
                          scroll={false}>
                          <a>
                            <RecommendedImg className='relative text-center'>
                              <Image
                                src={
                                  item.backdrop_path
                                    ? `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                                    : "/Images/DefaultBackdrop.png"
                                }
                                alt='TV-backdrop'
                                layout='fill'
                                objectFit='cover'
                                placeholder='blur'
                                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                              />
                            </RecommendedImg>
                          </a>
                        </Link>
                      </motion.div>
                      <InfoTitle className='mt-3 text-center'>{item.name}</InfoTitle>
                    </RecommendedWrapper>
                  )
            )}
          </RecommendationsGrid>
        </ModulesWrapper>
      )}
    </div>
  );
};

export default PersonDetails;
