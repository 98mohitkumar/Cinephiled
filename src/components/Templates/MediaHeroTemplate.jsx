import Image from "next/image";
import Link from "next/link";

import CrewCredits from "components/Shared/CrewCredits";
import { GenreTag, mediaDetailsWrapper, mediaLogo } from "components/Shared/GlobalComponents";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import H2 from "components/UI/Typography/H2";
import P from "components/UI/Typography/P";
import { LAYOUT_TYPES, ROUTES, blurPlaceholder } from "data/global";
import { cn, getNiceName, getRating, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaHeroTemplate = ({
  backdropPath,
  posterPath,
  title,
  mediaType,
  genres,
  logo,
  tagline,
  overview,
  rating,
  crewData,
  easterEgg = null,
  children,
  voteCount
}) => {
  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (backdropPath) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else if (!backdropPath && posterPath) {
    LAYOUT_TYPE = LAYOUT_TYPES.poster;
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <section className='relative'>
      <MediaHeroBackground backdropPath={backdropPath} posterPath={posterPath} alt='tv-backdrop' />
      <LayoutContainer
        className={cn("mb-3248 flex items-center above-lg:py-4864 max-lg:pb-3248", {
          "no-min-height items-start gap-3240 py-2464 max-lg:flex-col": matches(LAYOUT_TYPE, LAYOUT_TYPES.poster),
          "blank py-2464": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
        })}
        css={mediaDetailsWrapper}>
        {/* poster image, if there is a poster path */}
        {matches(LAYOUT_TYPE, LAYOUT_TYPES.poster) ? (
          <div className='relative aspect-poster min-w-64'>
            <Image
              src={getTMDBImage({ path: posterPath, type: "poster" })}
              alt={title}
              fill
              className='rounded-xl object-cover shadow-xl'
              placeholder='blur'
              blurDataURL={blurPlaceholder}
            />
          </div>
        ) : null}

        <div
          className={cn("w-full max-w-full", {
            "above-lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
            "above-lg:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.poster),
            "above-lg:max-w-3xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
          })}>
          {logo && logo?.file_path && matches(LAYOUT_TYPE, LAYOUT_TYPES.standard) ? (
            <div className='relative mb-16' css={mediaLogo({ aspectRatio: logo?.aspect_ratio })}>
              <Image
                src={getTMDBImage({ path: logo.file_path, type: "logo", size: logo.isLogoDark ? "w500_filter(negate,555,000)" : "w500" })}
                alt={title}
                fill
                className='object-contain'
                priority
              />
            </div>
          ) : (
            <H2 tag='h1' className='mb-16 text-pretty'>
              {title}
            </H2>
          )}

          {genres.length > 0 ? (
            <FlexBox className='mb-16 flex-wrap items-center gap-10'>
              {genres.map((item) => (
                <Link
                  key={item.id}
                  href={`/${ROUTES.genres}/${getNiceName({ id: item.id, name: item.name })}/${matches(mediaType, "movie") ? "movies" : "tv"}`}
                  passHref>
                  <GenreTag className='shadow-sm'>
                    <P weight='medium'>{item.name}</P>
                  </GenreTag>
                </Link>
              ))}

              {easterEgg}
            </FlexBox>
          ) : null}

          {tagline ? (
            <P size='large' weight='medium' className='mb-12 italic text-neutral-400'>
              {tagline}
            </P>
          ) : null}

          {overview ? (
            <P size='large' className='text-pretty'>
              {overview}
            </P>
          ) : null}

          {rating ? (
            <FlexBox className='my-2032 items-baseline gap-10'>
              <H1 tag='span' className='inline font-montserrat text-h1Static' weight='semibold'>
                {getRating(rating)}
              </H1>
              {voteCount && (
                <P size='large' weight='semibold' tag='span' className='font-montserrat text-neutral-500'>
                  based on {voteCount.toLocaleString()} ratings
                </P>
              )}
            </FlexBox>
          ) : null}

          {crewData.length > 0 ? <CrewCredits crewData={crewData} className='mt-2032' /> : null}

          {children}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default MediaHeroTemplate;
