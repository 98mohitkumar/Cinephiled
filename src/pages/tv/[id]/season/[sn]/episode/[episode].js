import Backdrops from 'components/Backdrops/Backdrops';
import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper
} from 'components/Cast/CastStyles';
import MetaWrapper from 'components/MetaWrapper';
import { Span } from 'components/MovieInfo/MovieDetailsStyles';
import { SeasonsRelease } from 'components/TVInfo/TVStyles';
import { motion } from 'framer-motion';
import { apiEndpoints } from 'globals/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useMemo } from 'react';
import {
  CastPageInfo,
  EpisodeInfoWrapper,
  EpisodeShowCaseWrapper,
  Error404,
  Pill,
  SeasonCommonOverview,
  TrWrapper
} from 'styles/GlobalComponents';

const Episode = ({ error, data, tvData }) => {
  const releaseYear = tvData?.airDate
    ? new Date(tvData?.airDate).getFullYear()
    : 'TBA';

  const getReleaseDate = useCallback((date) => {
    const releaseDate = !date
      ? 'TBA'
      : new Date(date.toString()).toDateString().slice(4, -5) +
        ', ' +
        new Date(date.toString()).getFullYear();

    return releaseDate;
  }, []);

  const getRating = useCallback((rating) => {
    const vote = !rating ? 'NR' : Number.parseFloat(rating).toFixed(1);

    return vote;
  }, []);

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
            ? `${tvData.name} S${data.season_number}E${data.episode_number}  (${releaseYear}) - Details -- cinephiled`
            : 'Not Found - Cinephiled'
        }
        description={data?.overview}
        image={`https://image.tmdb.org/t/p/w780${data?.still_path}`}
        url={`https://cinephiled.vercel.app/tv/${tvData.id}/season/${data.season_number}/episode/${data.episode_number}`}
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <EpisodeInfoWrapper>
          <h3 className='text fs-2 fw-bold mb-4 pb-2'>
            {tvData?.name} ({releaseYear})
          </h3>

          <EpisodeShowCaseWrapper>
            <div className='image-wrapper'>
              <Image
                src={`https://image.tmdb.org/t/p/w780${data?.still_path}`}
                alt='episde-backdrop'
                layout='fill'
                objectFit='cover'
                placeholder='blur'
                blurDataURL='data:image/webp;base64,UklGRgwCAABXRUJQVlA4WAoAAAAgAAAAAQAAAgAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggHgAAAJABAJ0BKgIAAwAHQJYlpAAC51m2AAD+5R4qGAAAAA=='
              />
            </div>

            <div>
              <h3 className='text fs-2 fw-bold'>
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
                  <Span>
                    {runtimeFormatted.getH === 1 && runtimeFormatted.getM === 0
                      ? '60m'
                      : runtimeFormatted.getH > 0 &&
                        runtimeFormatted.getH + 'h '}
                    {runtimeFormatted.getM > 0 && runtimeFormatted.getM + 'm'}
                  </Span>
                ) : (
                  <Span>TBA</Span>
                )}
              </TrWrapper>

              {data.overview && (
                <SeasonCommonOverview>{data.overview}</SeasonCommonOverview>
              )}
            </div>
          </EpisodeShowCaseWrapper>

          {cast?.length > 0 && (
            <CastContainer className='pt-5 px-0 pb-0'>
              <CastGrid className='justify-content-start'>
                <CastPageInfo className='p-0 text-start'>
                  <span className='fs-2 fw-bold d-inlin-block'>
                    Cast ({cast?.length})
                  </span>
                </CastPageInfo>

                {cast.map((item) => (
                  <CastWrapper key={item.name}>
                    <Link
                      href={`/person/${item.id}-${item.name.replace(
                        /[' ']/g,
                        '-'
                      )}`}
                      passHref
                    >
                      <a>
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.1 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <CastImg className='position-relative text-center'>
                            <Image
                              src={
                                item?.profile_path
                                  ? `https://image.tmdb.org/t/p/w276_and_h350_face${item.profile_path}`
                                  : '/Images/DefaultAvatar.png'
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
                      <Span className='fw-bold movieCastHead d-block'>
                        {item?.character}
                      </Span>
                      <Span className='movieCastName d-block'>
                        {item?.name}
                      </Span>
                    </div>
                  </CastWrapper>
                ))}
              </CastGrid>
            </CastContainer>
          )}
        </EpisodeInfoWrapper>
      )}

      {data?.images?.stills?.length > 0 && (
        <Fragment>
          <EpisodeInfoWrapper className='pb-3 pt-5 pb-sm-4'>
            <span className='fs-2 fw-bold'>
              Backdrops ({data?.images?.stills?.length})
            </span>
          </EpisodeInfoWrapper>
          <Backdrops backdrops={data?.images?.stills} />
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
      throw Error('cannot fetch data');
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
