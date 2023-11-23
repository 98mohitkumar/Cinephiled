import { CastContainer, CastGrid, CastImg, CastWrapper } from "components/Cast/CastStyles";
import MetaWrapper from "components/MetaWrapper";
import { Span } from "components/MovieInfo/MovieDetailsStyles";
import Posters from "components/Posters/Posters";
import { SeasonsRelease } from "components/TVInfo/TVStyles";
import { motion } from "framer-motion";
import { apiEndpoints } from "globals/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { BiChevronRight } from "react-icons/bi";

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
  CastPageInfo
} from "styles/GlobalComponents";

const Seasons = ({ error, data, tvData: { id, name, airDate }, seasonNumber }) => {
  const router = useRouter();
  const routeRef = useRef(router.asPath);

  const getYear = (date) => {
    const year = !date ? "TBA" : new Date(date).getFullYear();
    return year;
  };

  const getReleaseDate = (date) => {
    const releaseDate = !date
      ? "TBA"
      : new Date(date.toString()).toDateString().slice(4, -5) +
        ", " +
        new Date(date.toString()).getFullYear();

    return releaseDate;
  };

  const getRating = (rating) => {
    const vote = !rating ? "NR" : Number.parseFloat(rating).toFixed(1);

    return vote;
  };

  const runtimeFormatted = (runtime) => {
    const getH = Math.floor(runtime / 60);
    const getM = Math.ceil((runtime / 60 - getH) * 60);
    return { getH, getM };
  };

  return (
    <Fragment>
      <MetaWrapper
        title={
          !error
            ? `${name}: ${data?.name} (${getYear(data.air_date)}) - Details -- cinephiled`
            : "Not Found - Cinephiled"
        }
        description={data?.overview}
        image={`https://image.tmdb.org/t/p/w780${data?.poster_path}`}
        url={`https://cinephiled.vercel.app/tv/${id}/season/${seasonNumber}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <SeasonExpandedContainer>
          <h3 className='text fs-2 fw-bold mb-4 pb-2'>
            {name} ({getYear(airDate)})
          </h3>

          <SeasonShowcaseWrapper>
            <SeasonShowcaseImg className='position-relative text-center'>
              <Image
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : "/Images/DefaultImage.png"
                }
                alt='TV-season-poster'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </SeasonShowcaseImg>

            <div>
              <h2 className='fs-2 m-0 fw-bold'>
                {data.name} ({getYear(data.air_date)})
              </h2>

              <h3 className='fs-5 mt-2 mb-0 air-date'>{getReleaseDate(data.air_date)}</h3>

              {data.overview && <SeasonCommonOverview>{data.overview}</SeasonCommonOverview>}
            </div>
          </SeasonShowcaseWrapper>

          {data.episodes.length > 0 && (
            <SeasonEpisodesWrapper>
              <span className='fs-2 fw-bold d-block mb-4'>Episodes ({data.episodes.length})</span>

              {data.episodes.map((item, i) => (
                <SeasonShowcaseWrapper key={item.id} className='episodesBox'>
                  <EpisodeImg className='position-relative text-center'>
                    <Image
                      src={
                        item.still_path
                          ? `https://image.tmdb.org/t/p/w500${item.still_path}`
                          : "/Images/DefaultBackdrop.png"
                      }
                      alt='TV-season-episode-poster'
                      layout='fill'
                      objectFit='cover'
                      placeholder='blur'
                      blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                    />
                  </EpisodeImg>

                  <div>
                    <h3 className='text fs-2 fw-bold'>
                      {!item.episode_number ? i + 1 : item.episode_number}. {item.name}
                    </h3>

                    <TrWrapper className='flex-wrap'>
                      <SeasonsRelease className='text-alt'>
                        {getReleaseDate(item.air_date)}
                      </SeasonsRelease>
                      <Pill>
                        <p>{getRating(item.vote_average)}</p>
                      </Pill>

                      {!isNaN(runtimeFormatted(item.runtime).getH) ? (
                        <Span>
                          {runtimeFormatted(item.runtime).getH === 1 &&
                          runtimeFormatted(item.runtime).getM === 0
                            ? "60m"
                            : runtimeFormatted(item.runtime).getH > 0 &&
                              runtimeFormatted(item.runtime).getH + "h "}
                          {runtimeFormatted(item.runtime).getM > 0 &&
                            runtimeFormatted(item.runtime).getM + "m"}
                        </Span>
                      ) : (
                        <Span>TBA</Span>
                      )}

                      {new Date(getReleaseDate(item.air_date)) < new Date() && (
                        <Link href={`${routeRef.current}/episode/${item.episode_number}`}>
                          <a>
                            <Pill className='info'>
                              View episode info
                              <BiChevronRight size='22' />
                            </Pill>
                          </a>
                        </Link>
                      )}
                    </TrWrapper>

                    {item.overview && (
                      <SeasonCommonOverview className='clamp'>{item.overview}</SeasonCommonOverview>
                    )}
                  </div>
                </SeasonShowcaseWrapper>
              ))}
            </SeasonEpisodesWrapper>
          )}
        </SeasonExpandedContainer>
      )}

      {data?.aggregate_credits?.cast?.length > 0 && (
        <CastContainer className='py-5'>
          <CastGrid className='justify-content-start'>
            <CastPageInfo className='p-0 text-start'>
              <span className='fs-2 fw-bold d-inlin-block'>
                Cast ({data?.aggregate_credits?.cast?.length})
              </span>
            </CastPageInfo>

            {data.aggregate_credits.cast.map((item) => (
              <CastWrapper key={item.id}>
                <Link href={`/person/${item.id}-${item.name.replace(/[' ']/g, "-")}`} passHref>
                  <a>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}>
                      <CastImg className='position-relative text-center'>
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
                          blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
                        />
                      </CastImg>
                    </motion.div>
                  </a>
                </Link>

                <div className='mt-3'>
                  <Span className='fw-bold movieCastHead d-block'>{item?.roles[0]?.character}</Span>
                  <Span className='movieCastName d-block'>{item.name}</Span>
                  <Span className='movieCastName d-block episode-count'>
                    {item?.roles[0]?.episode_count} episodes
                  </Span>
                </div>
              </CastWrapper>
            ))}
          </CastGrid>
        </CastContainer>
      )}

      {data?.images?.posters?.length > 0 && (
        <Fragment>
          <CastContainer className='pb-3 pt-5 pb-sm-4'>
            <span className='fs-2 fw-bold'>Posters ({data?.images?.posters?.length})</span>
          </CastContainer>
          <Posters posters={data?.images?.posters} />
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

      delete res?.aggregate_credits?.crew;

      return {
        error,
        data: res,
        seasonNumber: ctx.query.sn,
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
