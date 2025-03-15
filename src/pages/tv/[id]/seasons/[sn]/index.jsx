import { MoveRight } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import { mediaDetailsWrapper } from "components/Shared/GlobalComponents";
import MetaWrapper from "components/Shared/MetaWrapper";
import ShareButton from "components/Shared/ShareButton";
import TrailerModal from "components/Shared/TrailerModal";
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
import { getReleaseYear, mergeEpisodeCount, fetchOptions, cn, matches, getNiceName, getHasEpisodeReleased, getYouTubeTrailer } from "utils/helper";
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
  trailer,
  backdrop,
  tvData: { id, name, airDate }
}) => {
  const router = useRouter();
  const routeRef = useRef(router.asPath);
  const totalRuntime = episodes?.reduce((acc, item) => acc + item.runtime, 0);

  let LAYOUT_TYPE = LAYOUT_TYPES.standard;

  if (backdrop) {
    LAYOUT_TYPE = LAYOUT_TYPES.standard;
  } else {
    LAYOUT_TYPE = LAYOUT_TYPES.blank;
  }

  return (
    <Fragment>
      <MetaWrapper
        title={`${name}: ${seasonName} (${getReleaseYear(releaseDate)}) - cinephiled`}
        description={overview}
        image={getTMDBImage({ path: backdrop, type: "backdrop", size: "w1280" })}
        url={`${siteInfo.url}/${ROUTES.tv}/${getNiceName({ id, name })}/${ROUTES.seasons}/${seasonNumber}`}
      />

      <section className='relative'>
        <MediaHeroBackground backdropPath={backdrop} posterPath={backdrop} alt='episode-backdrop' />

        <LayoutContainer
          className={cn("flex items-center gap-32 above-lg:py-4864 max-lg:pb-3248", { "blank py-2464": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank) })}
          css={mediaDetailsWrapper}>
          <div
            className={cn("w-full max-w-full", {
              "above-lg:max-w-md xl:max-w-xl 2xl:max-w-2xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.standard),
              "above-lg:max-w-3xl": matches(LAYOUT_TYPE, LAYOUT_TYPES.blank)
            })}>
            <P
              weight='semibold'
              size='large'
              className={cn("text-pretty", matches(LAYOUT_TYPE, LAYOUT_TYPES.blank) ? "text-neutral-300" : "text-neutral-400")}>
              {name} ({getReleaseYear(airDate)})
            </P>

            <div>
              <H2 tag='h1' className='mb-8 text-balance'>
                {seasonName}
              </H2>

              <TVStats releaseDate={releaseDate} totalRuntime={totalRuntime} rating={rating} size='large' />

              {overview ? (
                <P size='large' className='text-pretty'>
                  {overview}
                </P>
              ) : null}

              <FlexBox className='mt-2032 items-center gap-8'>
                <TrailerModal trailer={trailer} />
                <ShareButton shape='circle' iconSize={16} size='small' title={name} text={overview} />
              </FlexBox>
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
                  <FlexBox key={item.id} className='w-full gap-x-2032 gap-y-12 max-md:flex-col'>
                    <div className='relative aspect-backdrop w-full shrink-0 above-xs:w-80 lg:w-96'>
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
                      <H4 className='mb-6 text-pretty above-md:mb-10'>
                        {item.episode_number}. {item.name}
                      </H4>

                      <TVStats releaseDate={item.air_date} totalRuntime={item.runtime} rating={item.vote_average} isSmall />

                      {item.overview ? <P className='line-clamp-2'>{item.overview}</P> : null}

                      {getHasEpisodeReleased(item.air_date) ? (
                        <Link href={`${routeRef.current}/${ROUTES.episodes}/${item.episode_number}`} className='mt-10 inline-block above-md:mt-12'>
                          <Button variant='primary' size='small' weight='semibold' className='flex items-center gap-8 rounded-full px-16'>
                            Episode Details
                            <MoveRight size={16} />
                          </Button>
                        </Link>
                      ) : null}
                    </div>
                  </FlexBox>
                ))}
              </FlexBox>
            </LayoutContainer>
          ) : null}

          {/* cast */}
          {cast?.length > 0 ? (
            <LayoutContainer className='py-3248 pe-0'>
              <H3 className='mb-1620'>Cast</H3>
              <CastCarousel cast={cast}>
                {(item) => (
                  <div className='mt-12'>
                    <P weight='bold' className='line-clamp-2' title={item.character}>
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

    const trailer = getYouTubeTrailer(res?.videos?.results);
    const episodes = res?.episodes;

    const seasonBackdrops = episodes?.map((item) => item.still_path || null).filter(Boolean) || [];
    const randomBackdrop = seasonBackdrops[Math.floor(Math.random() * seasonBackdrops.length)] || null;

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
        episodes,
        trailer,
        backdrop: randomBackdrop,
        tvData: { id: ctx.query.id, name: tvData?.name, airDate: tvData?.first_air_date }
      }
    };
  } catch {
    return { notFound: true };
  }
};

export default Seasons;
