import Backdrops from "components/Backdrops/Backdrops";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { SeasonsRelease } from "components/TVInfo/TVStyles";
import { motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getRating, getReleaseDate, getReleaseYear, getRuntime } from "src/utils/helper";
import {
  EpisodeInfoWrapper,
  EpisodeShowCaseWrapper,
  Error404,
  ModulesWrapper,
  Pill,
  SeasonCommonOverview,
  TrWrapper
} from "styles/GlobalComponents";

const Episode = ({
  error,
  releaseDate,
  overview,
  cast,
  seasonNumber,
  episodeNumber,
  rating,
  backdrop,
  episodeName,
  runtime,
  posters,
  tvData: { id, name, airDate }
}) => {
  const links = [
    {
      href: `/tv/${id}`,
      label: "TV Show Details"
    },
    {
      href: `/tv/${id}/season/${seasonNumber}`,
      label: `Season ${seasonNumber}`
    },
    {
      href: "#",
      label: `${episodeName} (S${seasonNumber}E${episodeNumber})`
    }
  ];

  return (
    <Fragment>
      <MetaWrapper
        title={
          error
            ? "Not Found - Cinephiled"
            : `${name} (${getReleaseYear(
                airDate
              )}) S${seasonNumber}E${episodeNumber} - Details - cinephiled`
        }
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          <div className='relative mb-auto'>
            <DominantColor image={backdrop} tint isUsingBackdrop flip />

            <EpisodeInfoWrapper className='relative z-10'>
              <Breadcrumbs links={links} />

              <h3 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-bold mb-4 pb-2'>
                {name} ({getReleaseYear(releaseDate)})
              </h3>

              <EpisodeShowCaseWrapper>
                <div className='image-wrapper'>
                  <Image
                    src={
                      backdrop
                        ? `https://image.tmdb.org/t/p/w300${backdrop}`
                        : "/Images/DefaultBackdrop.png"
                    }
                    alt='episde-backdrop'
                    layout='fill'
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL={blurPlaceholder}
                  />
                </div>

                <div>
                  <h3 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 m-0 font-bold'>
                    {episodeName} ({`S${seasonNumber}E${episodeNumber}`})
                  </h3>

                  <TrWrapper>
                    <SeasonsRelease className='text-alt'>
                      {getReleaseDate(releaseDate)}
                    </SeasonsRelease>

                    <Pill>
                      <p>{getRating(rating)}</p>
                    </Pill>

                    <Span className='font-medium text-lg'>{getRuntime(runtime)}</Span>
                  </TrWrapper>

                  {overview ? <SeasonCommonOverview>{overview}</SeasonCommonOverview> : null}
                </div>
              </EpisodeShowCaseWrapper>
            </EpisodeInfoWrapper>

            {cast?.length > 0 ? (
              <ModulesWrapper className='relative z-10'>
                <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 my-8 font-bold block'>
                  Cast ({cast?.length})
                </span>

                <CastGrid className='justify-start'>
                  {cast.map((item) => (
                    <CastWrapper key={item.name}>
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
                                  item?.profile_path
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
                        <Span className='movieCastName block'>{item?.name}</Span>
                      </div>
                    </CastWrapper>
                  ))}
                </CastGrid>
              </ModulesWrapper>
            ) : null}
          </div>

          {posters?.length > 0 ? (
            <Fragment>
              <ModulesWrapper>
                <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mt-12 mb-8 font-bold block'>
                  Backdrops ({posters.length})
                </span>
                <Backdrops backdrops={posters} />
              </ModulesWrapper>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Episode;

Episode.getInitialProps = async (ctx) => {
  try {
    const response = await fetch(
      apiEndpoints.tv.episodeDetails({
        id: ctx.query.id,
        seasonNumber: ctx.query.sn,
        episodeNumber: ctx.query.episode
      })
    );

    const tvRes = await fetch(apiEndpoints.tv.tvDetailsNoAppend(ctx.query.id));

    const error = response.ok ? false : true;

    if (error) {
      throw Error("cannot fetch data");
    } else {
      const res = await response.json();
      const tvData = await tvRes.json();

      const { cast, guest_stars } = res?.credits;

      return {
        error,
        releaseDate: res?.air_date,
        overview: res?.overview,
        cast: cast.concat(guest_stars) || [],
        seasonNumber: res?.season_number,
        episodeNumber: res?.episode_number,
        episodeName: res?.name,
        rating: res?.vote_average,
        backdrop: res?.still_path,
        runtime: res?.runtime,
        posters: res?.images?.stills,
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
