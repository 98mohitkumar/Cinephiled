import Backdrops from "components/Backdrops/Backdrops";
import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import { SeasonsRelease } from "components/TVInfo/TVStyles";
import { motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useMemo } from "react";
import {
  EpisodeInfoWrapper,
  EpisodeShowCaseWrapper,
  Error404,
  ModulesWrapper,
  Pill,
  SeasonCommonOverview,
  TrWrapper
} from "styles/GlobalComponents";

const Episode = ({ error, data, tvData }) => {
  const releaseYear = tvData?.airDate ? new Date(tvData?.airDate).getFullYear() : "TBA";

  const getReleaseDate = (date) => {
    const releaseDate = !date
      ? "TBA"
      : new Date(date.toString()).toDateString().slice(4, -5) +
        ", " +
        new Date(date.toString()).getFullYear();

    return releaseDate;
  };

  const getRating = (rating) => {
    const vote = !rating ? "NR" : rating % 1 === 0 ? rating : rating.toFixed(1);

    return vote;
  };

  const cast = useMemo(
    () => data?.credits?.cast?.concat(data?.credits?.guest_stars) ?? [],
    [data?.credits?.cast, data?.credits?.guest_stars]
  );

  const runtimeFormatted = useMemo(() => {
    const getH = Math.floor(data?.runtime / 60);
    const getM = Math.ceil((data?.runtime / 60 - getH) * 60);
    return { getH, getM };
  }, [data?.runtime]);

  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${tvData.name} S${data.season_number}E${data.episode_number}  (${releaseYear}) - Details - cinephiled`
            : "Not Found - Cinephiled"
        }
        description={data?.overview}
        image={`https://image.tmdb.org/t/p/w780${data?.still_path}`}
        url={`https://cinephiled.vercel.app/tv/${tvData.id}/season/${data.season_number}/episode/${data.episode_number}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <Fragment>
          <div className='relative mb-auto'>
            <DominantColor image={data?.still_path} tint isUsingBackdrop flip />

            <EpisodeInfoWrapper className='relative z-10'>
              <h3 className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] font-bold mb-4 pb-2'>
                {tvData?.name} ({releaseYear})
              </h3>

              <EpisodeShowCaseWrapper>
                <div className='image-wrapper'>
                  <Image
                    src={
                      data?.still_path
                        ? `https://image.tmdb.org/t/p/w780${data?.still_path}`
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
                    {data?.name} ({`S${data.season_number}E${data.episode_number}`})
                  </h3>

                  <TrWrapper>
                    <SeasonsRelease className='text-alt'>
                      {getReleaseDate(data.air_date)}
                    </SeasonsRelease>

                    <Pill>
                      <p>{getRating(data.vote_average)}</p>
                    </Pill>

                    {!isNaN(runtimeFormatted.getH) ? (
                      <Span className='font-medium text-lg'>
                        {runtimeFormatted.getH === 1 && runtimeFormatted.getM === 0
                          ? "60m"
                          : runtimeFormatted.getH > 0 && runtimeFormatted.getH + "h "}
                        {runtimeFormatted.getM > 0 && runtimeFormatted.getM + "m"}
                      </Span>
                    ) : (
                      <Span className='font-medium text-lg'>TBA</Span>
                    )}
                  </TrWrapper>

                  {data.overview && <SeasonCommonOverview>{data.overview}</SeasonCommonOverview>}
                </div>
              </EpisodeShowCaseWrapper>
            </EpisodeInfoWrapper>

            {cast?.length > 0 && (
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
                        <Span className='font-bold movieCastHead block'>{item?.character}</Span>
                        <Span className='movieCastName block'>{item?.name}</Span>
                      </div>
                    </CastWrapper>
                  ))}
                </CastGrid>
              </ModulesWrapper>
            )}
          </div>

          {data?.images?.stills?.length > 0 && (
            <Fragment>
              <ModulesWrapper>
                <span className='text-[calc(1.325rem_+_.9vw)] lg:text-[2rem] leading-8 mt-12 mb-8 font-bold block'>
                  Backdrops ({data?.images?.stills?.length})
                </span>
                <Backdrops backdrops={data?.images?.stills} />
              </ModulesWrapper>
            </Fragment>
          )}
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

      delete res?.crew;
      delete res?.credits?.crew;
      delete res?.guest_stars;

      return {
        error,
        data: res,
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
