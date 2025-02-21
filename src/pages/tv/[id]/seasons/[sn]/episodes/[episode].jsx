import Link from "next/link";
import { Fragment } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import { mediaDetailsWrapper } from "components/Shared/GlobalComponents";
import MediaHeroBackground from "components/Shared/MediaHeroBackground/MediaHeroBackground";
import MetaWrapper from "components/Shared/MetaWrapper";
import TVStats from "components/Shared/TVStats";
import { CastCarousel } from "components/Templates/CastTemplate";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import H3 from "components/UI/Typography/H3";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { LAYOUT_TYPES, ROUTES, siteInfo } from "data/global";
import { cn, fetchOptions, getNiceName, getReleaseYear, matches } from "utils/helper";
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
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <Fragment>
      <MetaWrapper
        title={`${name} (${getReleaseYear(airDate)}) S${seasonNumber}E${episodeNumber} - cinephiled`}
        description={overview}
        image={getTMDBImage({ path: backdrop, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name })}/seasons/${seasonNumber}/episodes/${episodeNumber}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={backdrop} posterPath={backdrop} alt='episode-backdrop' />

        <LayoutContainer
          className={cn("flex items-center gap-32 max-lg:pb-3248 lg:py-4864", {
            "blank py-2464": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
          })}
          css={mediaDetailsWrapper}>
          <div
            className={cn("w-full max-w-full", {
              "lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
              "lg:max-w-3xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
            })}>
            <H4 className={cn("mb-16 text-pretty", matches(LAYOUT_TYPE, LAYOUT_TYPES.blank) ? "text-neutral-300" : "text-neutral-400")}>
              {name} ({getReleaseYear(airDate)})
            </H4>

            <div>
              <H2 tag='h1' className='mb-16 text-pretty'>
                {episodeName} ({`S${seasonNumber}E${episodeNumber}`})
              </H2>

              <TVStats releaseDate={releaseDate} rating={rating} totalRuntime={runtime} />

              {overview ? <P size='large'>{overview}</P> : null}

              {/* <ShareButton className='mt-20' shape='circle' iconSize={20} size='large' /> */}

              {director?.id && director?.name ? (
                <FlexBox className='mt-3240 flex-wrap items-center gap-x-4864 gap-y-24'>
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
          {/* cast */}
          {cast?.length > 0 ? (
            <LayoutContainer className='py-3248 pe-4'>
              <H3 className='mb-1620'>Cast</H3>
              <CastCarousel cast={cast} />
            </LayoutContainer>
          ) : null}

          {/* backdrops */}
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
