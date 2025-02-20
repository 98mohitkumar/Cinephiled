import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import { mediaDetailsWrapper, ratingTag } from "components/Shared/GlobalComponents";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import MetaWrapper from "components/Shared/MetaWrapper";
import ShareButton from "components/Shared/ShareButton";
import { CaseCarousel } from "components/Templates/CastTemplate";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H3 from "components/UI/Typography/H3";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { LAYOUT_TYPES, ROUTES, blurPlaceholder } from "data/global";
import { cn, fetchOptions, getNiceName, getRating, getReleaseDate, getReleaseYear, getRuntime, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const Episode = ({
  releaseDate,
  overview,
  cast,
  seasonNumber,
  episodeNumber,
  rating,
  backdrop,
  episodeName,
  runtime,
  backdrops,
  director,
  writers,
  tvData: { id, name, airDate }
}) => {
  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (backdrop) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else if (!backdrop) {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <Fragment>
      <MetaWrapper
        title={`${name} (${getReleaseYear(airDate)}) S${seasonNumber}E${episodeNumber} - Details - cinephiled`}
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={backdrop} posterPath={backdrop} alt='episode-backdrop' />

        <LayoutContainer
          className={cn("flex items-center gap-32 max-lg:pb-3248 lg:py-4864", {
            "blank py-2464": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
          })}
          css={mediaDetailsWrapper}>
          {/* backdrop image, if there is a backdrop path */}
          <div
            className={cn("relative hidden aspect-backdrop min-w-80", {
              block: matches(LAYOUT_TYPE, LAYOUT_TYPES.poster)
            })}>
            <Image
              src={getTMDBImage({ path: backdrop, type: "backdrop" })}
              alt={name}
              fill
              className='rounded-xl object-cover shadow-xl'
              placeholder='blur'
              blurDataURL={blurPlaceholder}
            />
          </div>

          <div
            className={cn("w-full max-w-full", {
              "lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
              "lg:max-w-3xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
            })}>
            <H4 className={cn("mb-20 text-pretty", matches(LAYOUT_TYPE, LAYOUT_TYPES.blank) ? "text-neutral-300" : "text-neutral-400")}>
              {name} ({getReleaseYear(releaseDate)})
            </H4>

            <div>
              <H3 tag='h1' className='mb-12 text-pretty'>
                {episodeName} ({`S${seasonNumber}E${episodeNumber}`})
              </H3>

              <FlexBox className='mb-12 items-center gap-2432'>
                <P size='large' weight='medium' className='text-neutral-300'>
                  {getReleaseDate(releaseDate)}
                </P>

                <div css={ratingTag}>
                  <P weight='semibold' className='font-montserrat text-neutral-900'>
                    {getRating(rating)}
                  </P>
                </div>

                <P size='large' weight='medium' className='text-neutral-300'>
                  {getRuntime(runtime)}
                </P>

                <ShareButton className='rounded-full px-16' iconSize={16} size='small' />
              </FlexBox>

              {overview ? <P size='large'>{overview}</P> : null}

              {director?.id && director?.name ? (
                <FlexBox className='mt-48 flex-wrap items-center gap-x-4864 gap-y-24'>
                  <div>
                    <P size='large' weight='semibold'>
                      Director
                    </P>

                    <Link href={`/${ROUTES.person}/${getNiceName({ id: director?.id, name: director?.name })}`}>
                      <P weight='medium' className='text-neutral-300 underline transition-colors can-hover:text-neutral-100 can-hover:no-underline'>
                        {director?.name}
                      </P>
                    </Link>
                  </div>

                  {writers?.length > 0
                    ? writers.map((writer) => (
                        <div key={writer.id}>
                          <P size='large' weight='semibold'>
                            Writer
                          </P>

                          <Link href={`/${ROUTES.person}/${getNiceName({ id: writer?.id, name: writer?.name })}`}>
                            <P
                              weight='medium'
                              className='text-neutral-300 underline transition-colors can-hover:text-neutral-100 can-hover:no-underline'>
                              {writer?.name}
                            </P>
                          </Link>
                        </div>
                      ))
                    : null}
                </FlexBox>
              ) : null}
            </div>
          </div>
        </LayoutContainer>
      </section>

      <div className='relative grow'>
        <DominantColor image={backdrop} isUsingBackdrop tint angle='0deg' />

        <div className='relative z-10'>
          {cast?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H3 className='mb-1620'>Cast</H3>
              <CaseCarousel cast={cast} />
            </LayoutContainer>
          ) : null}

          {backdrops?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H3 className='mb-1620'>Backdrops</H3>
              <MediaImageTemplateGrid items={backdrops} type='backdrops' />
            </LayoutContainer>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Episode;

export const getServerSideProps = async (ctx) => {
  try {
    const [response, tvRes] = await Promise.all([
      fetch(
        apiEndpoints.tv.episodeDetails({
          id: ctx.query.id,
          seasonNumber: ctx.query.sn,
          episodeNumber: ctx.query.episode
        }),
        fetchOptions()
      ),
      fetch(apiEndpoints.tv.tvDetailsNoAppend(ctx.query.id), fetchOptions())
    ]);

    if (!response.ok) throw new Error("error fetching details");

    const [res, tvData] = await Promise.all([response.json(), tvRes.json()]);

    const { cast, guest_stars } = res?.credits;

    const director = res?.credits?.crew?.find((item) => item.job === "Director") || null;
    const writers = res?.credits?.crew?.filter((item) => item.job === "Writer").slice(0, 2) || [];

    return {
      props: {
        res,
        releaseDate: res?.air_date,
        overview: res?.overview,
        cast: cast.concat(guest_stars) || [],
        seasonNumber: res?.season_number,
        episodeNumber: res?.episode_number,
        episodeName: res?.name,
        rating: res?.vote_average,
        backdrop: res?.still_path,
        runtime: res?.runtime,
        backdrops: res?.images?.stills,
        director,
        writers,
        tvData: {
          id: ctx.query.id,
          name: tvData?.name,
          airDate: tvData?.first_air_date
        }
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
