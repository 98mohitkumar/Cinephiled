import { MoveRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import { mediaDetailsWrapper } from "components/Shared/GlobalComponents";
import MetaWrapper from "components/Shared/MetaWrapper";
import TVStats from "components/Shared/TVStats";
import { CastCarousel } from "components/Templates/CastTemplate";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import H3 from "components/UI/Typography/H3";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { apiEndpoints } from "data/apiEndpoints";
import { LAYOUT_TYPES, ROUTES, blurPlaceholder, siteInfo } from "data/global";
import { getReleaseYear, mergeEpisodeCount, fetchOptions, cn, matches, getNiceName } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const MediaHeroBackground = dynamic(() => import("components/Shared/MediaHeroBackground/MediaHeroBackground"), { ssr: false });

const Seasons = ({
  releaseDate,
  overview,
  cast,
  posters,
  rating,
  episodes,
  seasonNumber,
  seasonName,
  seasonPoster,
  tvData: { id, name, airDate }
}) => {
  const router = useRouter();
  const routeRef = useRef(router.asPath);
  const totalRuntime = episodes?.reduce((acc, item) => acc + item.runtime, 0);

  const seasonBackdrops = episodes?.filter((item) => item.still_path).map((item) => item.still_path) || [];
  const randomBackdrop = seasonBackdrops[Math.floor(Math.random() * seasonBackdrops.length)] || null;

  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (randomBackdrop) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <Fragment>
      <MetaWrapper
        title={`${name}: ${seasonName} (${getReleaseYear(releaseDate)}) - cinephiled`}
        description={overview}
        image={getTMDBImage({ path: randomBackdrop, type: "backdrop", size: "original" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name })}/seasons/${seasonNumber}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={randomBackdrop} posterPath={randomBackdrop} alt='episode-backdrop' />

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
                {seasonName}
              </H2>

              <TVStats releaseDate={releaseDate} totalRuntime={totalRuntime} rating={rating} size='large' />

              {overview ? <P size='large'>{overview}</P> : null}
            </div>
          </div>
        </LayoutContainer>
      </section>

      <div className='relative grow'>
        <DominantColor image={seasonPoster} isUsingBackdrop tint angle='0deg' />

        <div className='relative z-10'>
          {/* episodes */}
          {episodes?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H3 className='mb-1620'>Episodes</H3>

              <FlexBox className='flex-col gap-4864 md:max-w-screen-xl'>
                {episodes?.map((item) => (
                  <FlexBox key={item.id} className='w-full gap-x-2032 gap-y-1620 max-md:flex-col'>
                    <div className='relative aspect-backdrop w-full shrink-0 xs:w-80 lg:w-96'>
                      <Image
                        src={getTMDBImage({ path: item.still_path, type: "backdrop", size: "w780" })}
                        alt={item.name}
                        fill
                        className='rounded-xl object-cover shadow-xl'
                        placeholder='blur'
                        blurDataURL={blurPlaceholder}
                      />
                    </div>

                    <div className='self-start'>
                      <H4 className='mb-16 text-pretty'>
                        {item.episode_number}. {item.name}
                      </H4>

                      <TVStats releaseDate={item.air_date} totalRuntime={item.runtime} rating={item.vote_average} isSmall />

                      {item.overview ? <P className='line-clamp-2'>{item.overview}</P> : null}

                      <Link href={`${routeRef.current}/${ROUTES.episodes}/${item.episode_number}`}>
                        <Button variant='primary' size='small' weight='semibold' className='mt-16 flex items-center gap-8 rounded-full px-16'>
                          Episode Details
                          <MoveRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </FlexBox>
                ))}
              </FlexBox>
            </LayoutContainer>
          ) : null}

          {/* cast */}
          {cast?.length > 0 ? (
            <LayoutContainer className='py-3248 pe-4'>
              <H3 className='mb-1620'>Cast</H3>
              <CastCarousel cast={cast}>
                {(item) => (
                  <div className='mt-12'>
                    <P size='large' weight='semibold' className='line-clamp-1' title={item.character}>
                      {item.character}
                    </P>
                    <P className='text-neutral-400' title={item.name}>
                      {item.name}
                    </P>
                    <P className='text-neutral-400' size='small'>
                      {item?.episode_count} episodes
                    </P>
                  </div>
                )}
              </CastCarousel>
            </LayoutContainer>
          ) : null}

          {/* posters */}
          {posters?.length > 0 ? (
            <LayoutContainer className='py-3248'>
              <H3 className='mb-1620'>Posters</H3>
              <MediaImageTemplateGrid items={posters} type='posters' />
            </LayoutContainer>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const [response, tvRes] = await Promise.all([
      fetch(apiEndpoints.tv.tvSeasonDetails({ id: ctx.query.id, seasonNumber: ctx.query.sn }), fetchOptions()),
      fetch(apiEndpoints.tv.tvDetailsNoAppend(ctx.query.id), fetchOptions())
    ]);

    if (!response.ok) throw new Error("error fetching details");

    const [res, tvData] = await Promise.all([response.json(), tvRes.json()]);

    return {
      props: {
        releaseDate: res?.air_date,
        overview: res?.overview,
        cast: mergeEpisodeCount(res?.aggregate_credits?.cast?.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role }))).flat()),
        posters: res?.images?.posters,
        seasonPoster: res?.poster_path,
        seasonName: res?.name,
        seasonNumber: res?.season_number,
        rating: res?.vote_average,
        episodes: res?.episodes,
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

export default Seasons;
