import DominantColor from "components/DominantColor/DominantColor";
import DownloadMediaButton from "components/DownloadMediaButton/DownloadMediaButton";
import { PseudoTrack } from "components/Explore/ExploreStyles";
import { HeroInfoTitle, HeroInfoWrapper, Span } from "components/MovieInfo/MovieDetailsStyles";
import { PostersImg, PostersWrapper } from "components/Posters/PostersStyles";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import { blurPlaceholder } from "globals/constants";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { getGender } from "src/utils/helper";
import {
  DetailsHeroWrap,
  HeroDetailsContainer,
  HeroImg,
  HeroImgWrapper
} from "styles/GlobalComponents";
import { Bio, Details } from "./PersonDetailsStyles";
import PersonPageTab from "./PersonPageTab";

const PersonDetails = ({ details }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const postersWrapperRef = useRef(null);
  const { external_ids, images } = details;
  const casting =
    details?.combined_credits?.cast?.map((item) => ({
      ...item,
      department: item.department || "Acting",
      job: item.job || "Actor"
    })) || [];
  const crew = details?.combined_credits?.crew || [];
  const combinedCredits = casting?.concat(crew)?.sort((a, z) => z.vote_count - a.vote_count);

  const movieCredits = combinedCredits.filter((item) => item.media_type === "movie");
  const tvCredits = combinedCredits.filter((item) => item.media_type === "tv");

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

  const imageCount = images?.profiles?.length;

  useEffect(() => {
    const checkOverFlow = () => {
      if (postersWrapperRef.current) {
        const { scrollWidth, clientWidth } = postersWrapperRef.current;

        if (scrollWidth > clientWidth) {
          setIsOverflowing(true);
        } else {
          setIsOverflowing(false);
        }
      }
    };

    checkOverFlow();
    window.addEventListener("resize", checkOverFlow);
    return () => {
      window.removeEventListener("resize", checkOverFlow);
    };
  }, [imageCount]);

  return (
    <div className='mb-auto'>
      <HeroDetailsContainer className='relative mb-auto person-details'>
        <DominantColor tint flip image={combinedCredits[0]?.poster_path} />
        <div className='relative z-10'>
          <DetailsHeroWrap style={{ minHeight: "auto" }} className='pb-0'>
            <HeroImgWrapper>
              <HeroImg className='no-shadow relative text-center'>
                <Image
                  src={
                    details?.profile_path
                      ? `https://image.tmdb.org/t/p/w500${details?.profile_path}`
                      : "/Images/DefaultImage.png"
                  }
                  alt='cast-image'
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </HeroImg>

              <SocialMediaLinks
                links={external_ids}
                mediaDetails={{
                  title: details.name,
                  description: details.biography
                }}
              />
            </HeroImgWrapper>

            <HeroInfoWrapper className='w-full me-auto max-w-3xl'>
              <HeroInfoTitle>{details.name}</HeroInfoTitle>

              <Details className='my-4'>
                <div>
                  <Span className='block font-bold'>Gender</Span>
                  <Span className='block font-normal text-lg'>{getGender(details.gender)}</Span>
                </div>

                {!details.deathday && details.birthday && (
                  <div>
                    <Span className='block font-bold'>Age</Span>
                    <Span className='block font-normal text-lg'>
                      {getAge(details.birthday, true)} years old
                    </Span>
                  </div>
                )}

                {details?.birthday && (
                  <div>
                    <Span className='block font-bold'>Birthday</Span>
                    <Span className='block font-normal text-lg'>
                      {new Date(details.birthday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </Span>
                  </div>
                )}

                {details?.deathday && (
                  <div>
                    <Span className='block font-bold'>Death Day</Span>
                    <Span className='block font-normal text-lg'>
                      {new Date(details.deathday).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </Span>
                  </div>
                )}

                {details?.deathday && (
                  <div>
                    <Span className='block font-bold'>Died at</Span>
                    <Span className='block font-normal text-lg'>
                      {getAge(details.deathday, false)} years old
                    </Span>
                  </div>
                )}

                {details?.place_of_birth && (
                  <div>
                    <Span className='block font-bold'>Place of Birth</Span>
                    <Span className='block font-normal text-lg'>{details.place_of_birth}</Span>
                  </div>
                )}

                <div>
                  <Span className='block font-bold'>Known For</Span>
                  <Span className='block font-normal text-lg'>{details.known_for_department}</Span>
                </div>

                <div>
                  <Span className='block font-bold'>Known Credits</Span>
                  <Span className='block font-normal text-lg'>{combinedCredits.length}</Span>
                </div>
              </Details>
            </HeroInfoWrapper>
          </DetailsHeroWrap>

          {details.biography && (
            <div className='mt-6 md:mt-14'>
              {details.biography && (
                <Fragment>
                  <Span className='block text-[calc(1.35rem_+_.9vw)] lg:text-[2.2rem] font-semibold'>
                    Biography
                  </Span>
                  <Bio>{details.biography}</Bio>
                </Fragment>
              )}
            </div>
          )}

          {imageCount > 1 ? (
            <Fragment>
              <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mt-14 mb-6 font-semibold block'>
                Media ({imageCount})
              </span>

              <PostersWrapper
                className='profile-media-grid pb-8'
                style={{ "--colCount": imageCount }}
                ref={postersWrapperRef}>
                {images?.profiles.map((item, i) => (
                  <PostersImg key={i} className='relative text-center'>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                      alt='poster'
                      fill
                      style={{ objectFit: "cover" }}
                      placeholder='blur'
                      blurDataURL={blurPlaceholder}
                    />

                    <DownloadMediaButton item={item.file_path} />
                  </PostersImg>
                ))}
              </PostersWrapper>

              {isOverflowing ? <PseudoTrack /> : null}
            </Fragment>
          ) : null}
        </div>
      </HeroDetailsContainer>

      {combinedCredits?.length > 0 && (
        <PersonPageTab movieCredits={movieCredits} tvCredits={tvCredits} />
      )}
    </div>
  );
};

export default PersonDetails;
