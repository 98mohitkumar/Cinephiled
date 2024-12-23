import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import Backdrops from "components/Backdrops/Backdrops";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import { CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import SocialMediaLinks from "components/SocialMediaLinks/SocialMediaLinks";
import { SeasonsRelease } from "components/TVInfo/TVStyles";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder } from "data/global";
import { EpisodeInfoWrapper, EpisodeShowCaseWrapper, ModulesWrapper, Pill, SeasonCommonOverview, TrWrapper } from "styles/GlobalComponents";
import { fetchOptions, getCleanTitle, getRating, getReleaseDate, getReleaseYear, getRuntime } from "utils/helper";

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
        title={`${name} (${getReleaseYear(airDate)}) S${seasonNumber}E${episodeNumber} - Details - cinephiled`}
        description={overview}
        image={`https://image.tmdb.org/t/p/w780${backdrop}`}
        url={`https://cinephiled.vercel.app/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`}
      />

      <Fragment>
        <div className='relative mb-auto'>
          <DominantColor image={backdrop} tint isUsingBackdrop flip />

          <EpisodeInfoWrapper className='relative z-10'>
            <Breadcrumbs links={links} />

            <h3 className='mb-4 pb-2 text-[calc(1.325rem_+_.9vw)] font-bold lg:text-[2rem]'>
              {name} ({getReleaseYear(releaseDate)})
            </h3>

            <EpisodeShowCaseWrapper>
              <div className='image-wrapper'>
                <Image
                  src={backdrop ? `https://image.tmdb.org/t/p/w500${backdrop}` : "/Images/DefaultBackdrop.png"}
                  alt='episde-backdrop'
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder='blur'
                  blurDataURL={blurPlaceholder}
                />
              </div>

              <div>
                <h3 className='m-0 text-[calc(1.325rem_+_.9vw)] font-bold leading-8 lg:text-[2rem]'>
                  {episodeName} ({`S${seasonNumber}E${episodeNumber}`})
                </h3>

                <TrWrapper>
                  <SeasonsRelease className='text-alt'>{getReleaseDate(releaseDate)}</SeasonsRelease>

                  <Pill>
                    <p>{getRating(rating)}</p>
                  </Pill>

                  <Span className='text-lg font-semibold'>{getRuntime(runtime)}</Span>
                </TrWrapper>

                <SocialMediaLinks
                  links={{}}
                  homepage={null}
                  mediaDetails={{
                    title: name,
                    description: overview
                  }}
                  className='!justify-start'
                />

                {overview ? <SeasonCommonOverview>{overview}</SeasonCommonOverview> : null}
              </div>
            </EpisodeShowCaseWrapper>
          </EpisodeInfoWrapper>

          {cast?.length > 0 ? (
            <ModulesWrapper className='relative z-10'>
              <span className='mb-6 mt-8 block text-[calc(1.325rem_+_.9vw)] font-bold leading-8 lg:text-[2rem]'>Cast ({cast?.length})</span>

              <CastGrid className='justify-start'>
                {cast.map((item) => (
                  <CastWrapper key={item.name}>
                    <Link href={`/person/${item.id}-${getCleanTitle(item.name)}`} passHref>
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.95 }}>
                        <CastImg className='relative text-center'>
                          <Image
                            src={
                              item?.profile_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}` : "/Images/DefaultAvatar.png"
                            }
                            alt='cast-image'
                            fill
                            style={{ objectFit: "cover", objectPosition: "top" }}
                            placeholder='blur'
                            blurDataURL={blurPlaceholder}
                          />
                        </CastImg>
                      </motion.div>
                    </Link>

                    <div className='mt-3'>
                      <Span className='movieCastHead line-clamp-2 font-bold'>{item?.character}</Span>
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
              <span className='mb-6 mt-12 block text-[calc(1.325rem_+_.9vw)] font-bold leading-8 lg:text-[2rem]'>Backdrops ({posters.length})</span>
              <Backdrops backdrops={posters} />
            </ModulesWrapper>
          </Fragment>
        ) : null}
      </Fragment>
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

    return {
      props: {
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
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};
