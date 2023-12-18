import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { RatingWrapper, Span } from "components/MovieInfo/MovieDetailsStyles";
import Posters from "components/Posters/Posters";
import { SeasonsRelease } from "components/TVInfo/TVStyles";
import { motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { BiChevronRight } from "react-icons/bi";
import {
  getRating,
  getReleaseYear,
  getReleaseDate,
  getRuntime,
  mergeEpisodeCount
} from "src/utils/helper";

import {
  EpisodeImg,
  Error404,
  SeasonCommonOverview,
  SeasonEpisodesWrapper,
  SeasonExpandedContainer,
  SeasonShowcaseImg,
  SeasonShowcaseWrapper,
  TrWrapper,
  Pill,
  ModulesWrapper
} from "styles/GlobalComponents";

const Seasons = ({
  error,
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

  return (
    <Fragment>
      <MetaWrapper
        title={
          error
            ? "Not Found - Cinephiled"
            : `${name}: ${seasonName} (${getReleaseYear(releaseDate)}) - cinephiled`
        }
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${seasonPoster}`}
        url={`https://cinephiled.vercel.app/tv/${id}/season/${seasonNumber}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          <div className='relative mb-auto'>
            <DominantColor image={seasonPoster} tint flip />
            <SeasonExpandedContainer className='relative z-10'>
              <h3 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-bold mb-4 pb-2'>
                {name} ({getReleaseYear(airDate)})
              </h3>

              <SeasonShowcaseWrapper>
                <SeasonShowcaseImg className='relative text-center'>
                  <Image
                    src={
                      seasonPoster
                        ? `https://image.tmdb.org/t/p/w500${seasonPoster}`
                        : "/Images/DefaultImage.png"
                    }
                    alt='TV-season-poster'
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL={blurPlaceholder}
                  />
                </SeasonShowcaseImg>

                <div>
                  <h2 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 m-0 font-bold'>
                    {seasonName} ({getReleaseYear(releaseDate)})
                  </h2>

                  <h3 className='text-[1.25rem] mt-2 mb-0 font-semibold'>
                    {getReleaseDate(releaseDate)}
                  </h3>

                  {rating ? (
                    <RatingWrapper>
                      <Fragment>
                        <Span className='text-[calc(1.525rem_+_3.3vw)] xl:text-6xl font-bold'>
                          {getRating(rating)}
                        </Span>
                        <span> / 10</span>
                      </Fragment>
                    </RatingWrapper>
                  ) : null}

                  {overview && <SeasonCommonOverview>{overview}</SeasonCommonOverview>}
                </div>
              </SeasonShowcaseWrapper>

              {episodes?.length > 0 && (
                <SeasonEpisodesWrapper>
                  <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 font-bold block mb-6'>
                    Episodes ({episodes?.length})
                  </span>

                  {episodes?.map((item, i) => (
                    <SeasonShowcaseWrapper key={item.id} className='episodesBox'>
                      <EpisodeImg className='relative text-center'>
                        <Image
                          src={
                            item.still_path
                              ? `https://image.tmdb.org/t/p/w300${item.still_path}`
                              : "/Images/DefaultBackdrop.png"
                          }
                          alt='TV-season-episode-poster'
                          layout='fill'
                          objectFit='cover'
                          placeholder='blur'
                          blurDataURL={blurPlaceholder}
                        />
                      </EpisodeImg>

                      <div>
                        <h3 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 font-bold'>
                          {item.episode_number || i + 1}. {item.name}
                        </h3>

                        <TrWrapper className='flex-wrap'>
                          <SeasonsRelease className='text-alt'>
                            {getReleaseDate(item.air_date)}
                          </SeasonsRelease>
                          <Pill>
                            <p>{getRating(item.vote_average)}</p>
                          </Pill>

                          <Span className='font-medium text-lg'>{getRuntime(item.runtime)}</Span>

                          {new Date(getReleaseDate(item.air_date)) < new Date() ? (
                            <Link href={`${routeRef.current}/episode/${item.episode_number}`}>
                              <a>
                                <Pill className='info text-base'>
                                  Episode Details
                                  <BiChevronRight size='22' />
                                </Pill>
                              </a>
                            </Link>
                          ) : null}
                        </TrWrapper>

                        {item?.overview ? (
                          <SeasonCommonOverview className='clamp'>
                            {item.overview}
                          </SeasonCommonOverview>
                        ) : null}
                      </div>
                    </SeasonShowcaseWrapper>
                  ))}
                </SeasonEpisodesWrapper>
              )}
            </SeasonExpandedContainer>

            {cast?.length > 0 ? (
              <ModulesWrapper className='relative z-10'>
                <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mt-12 mb-8 font-bold block'>
                  Cast ({cast?.length ?? 0})
                </span>

                <CastGrid className='justify-start'>
                  {cast?.map((item) => (
                    <CastWrapper key={item.id}>
                      <Link
                        href={`/person/${item.id}-${item.name.replace(/[' ']/g, "-")}`}
                        passHref>
                        <a>
                          <motion.div
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.1 }
                            }}
                            whileTap={{ scale: 0.95 }}>
                            <CastImg className='relative text-center'>
                              <Image
                                src={
                                  item.profile_path
                                    ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                                    : "/Images/DefaultAvatar.png"
                                }
                                alt='cast-image'
                                layout='fill'
                                objectFit='cover'
                                objectPosition='top'
                                placeholder='blur'
                                blurDataURL={blurPlaceholder}
                              />
                            </CastImg>
                          </motion.div>
                        </a>
                      </Link>

                      <div className='mt-3'>
                        <Span className='font-bold movieCastHead line-clamp-2'>
                          {item?.character}
                        </Span>
                        <Span className='movieCastName block'>{item.name}</Span>
                        <Span className='movieCastName block episode-count'>
                          {item?.episode_count} episodes
                        </Span>
                      </div>
                    </CastWrapper>
                  ))}
                </CastGrid>
              </ModulesWrapper>
            ) : null}
          </div>

          {posters?.length > 0 ? (
            <ModulesWrapper>
              <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mt-12 mb-8 font-bold block'>
                Posters ({posters?.length})
              </span>

              <Posters posters={posters} />
            </ModulesWrapper>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

Seasons.getInitialProps = async (ctx) => {
  try {
    const response = await fetch(
      apiEndpoints.tv.tvSeasonDetails({
        id: ctx.query.id,
        seasonNumber: ctx.query.sn
      })
    );

    const tvRes = await fetch(apiEndpoints.tv.tvDetailsNoAppend(ctx.query.id));
    const error = response.ok ? false : true;

    if (error) {
      throw Error("cannot fetch data");
    } else {
      const res = await response.json();
      const tvData = await tvRes.json();

      return {
        error,
        releaseDate: res?.air_date,
        overview: res?.overview,
        cast: mergeEpisodeCount(
          res?.aggregate_credits?.cast
            ?.map(({ roles, ...rest }) => roles.map((role) => ({ ...rest, ...role })))
            .flat()
        ),
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
      };
    }
  } catch {
    return { error: true };
  }
};

export default Seasons;
