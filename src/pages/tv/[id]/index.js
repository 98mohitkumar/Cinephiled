import Head from 'next/head';
import DominantColor from '../../../components/DominantColor/DominantColor';
import {
  Gradient,
  HeroImgWrapper,
  HeroTrailer
} from '../../../styles/GlobalComponents';
import TVDetails from '../../../components/TVInfo/TVDetails';
import {
  DetailsHeroWrap,
  Error404,
  HeroBg,
  HeroBgContainer,
  HeroDetailsContainer,
  HeroImg,
  HeroInfo
} from '../../../styles/GlobalComponents';
import TVTab from '../../../components/TVInfo/TVTab';
import TVFacts from '../../../components/TVInfo/TVFacts';
import { FaYoutube } from 'react-icons/fa';
import { Span } from '../../../components/MovieInfo/MovieDetailsStyles';
import SocialMediaLinks from '../../../components/SocialMediaLinks/SocialMediaLinks';
import Image from 'next/image';
import { useMemo } from 'react';

const TvShow = ({ tvData, error, languages, socialIds }) => {
  const crew = useMemo(
    () => (!error ? tvData?.credits?.crew : []),
    [error, tvData?.credits?.crew]
  );

  const crewData = useMemo(
    () =>
      !error
        ? [
            ...tvData?.created_by?.slice(0, 2),
            ...crew?.filter((credit) => credit.job === 'Characters').slice(0, 2)
          ]
        : [],
    [crew, error, tvData?.created_by]
  );

  const cast = useMemo(
    () => (!error ? tvData?.credits?.cast.slice(0, 15) : []),
    [error, tvData?.credits?.cast]
  );

  const videos = useMemo(
    () =>
      !error
        ? tvData?.videos?.results?.filter(
            (item) => item?.site === 'YouTube' && item?.type === 'Trailer'
          )
        : [],
    [error, tvData?.videos?.results]
  );

  const epRuntime = useMemo(() => {
    const getH = Math.floor(tvData?.episode_run_time[0] / 60);
    const getM = Math.ceil((tvData?.episode_run_time[0] / 60 - getH) * 60);
    return { getH, getM };
  }, [tvData?.episode_run_time]);

  const tvStatus = useMemo(
    () => (!error ? (!tvData.status ? 'TBA' : tvData?.status) : ''),
    [error, tvData?.status]
  );

  const ogLanguage = useMemo(
    () =>
      !error
        ? !tvData.original_language
          ? 'TBA'
          : tvData?.original_language
        : '',
    [error, tvData?.original_language]
  );

  const network = useMemo(
    () =>
      !error ? (!tvData.networks[0] ? 'TBA' : tvData?.networks[0]?.name) : '',
    [error, tvData?.networks]
  );

  const type = useMemo(
    () => (!error ? (!tvData.type ? 'TBA' : tvData?.type) : ''),
    [error, tvData?.type]
  );

  const tvFacts = useMemo(
    () =>
      !error ? { status: tvStatus, language: ogLanguage, network, type } : {},
    [error, network, ogLanguage, tvStatus, type]
  );

  const getYear = useMemo(
    () =>
      !error
        ? tvData?.first_air_date
          ? new Date(tvData?.first_air_date).getFullYear()
          : 'TBA'
        : '',
    [error, tvData?.first_air_date]
  );

  const endYear = useMemo(
    () =>
      !error
        ? tvData?.status === 'Ended' || tvData.status === 'Canceled'
          ? '- ' + new Date(tvData?.last_air_date).getFullYear()
          : '- '
        : '',
    [error, tvData?.last_air_date, tvData?.status]
  );

  return (
    <>
      <Head>
        <title>
          {!error
            ? `${tvData.name} (${getYear}
          ${endYear}) - Cinephiled`
            : 'Not Found - Cinephiled'}
        </title>
        {!error && (
          <>
            <meta
              property='og:image'
              content={`https://image.tmdb.org/t/p/w780${tvData?.backdrop_path}`}
              key='og_image'
            />
            <meta
              property='og:title'
              content={`${tvData?.name} (${getYear}
          ${endYear}) - Cinephiled`}
            ></meta>
          </>
        )}
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          {/* tv info hero section */}
          <HeroDetailsContainer className='position-relative mb-auto'>
            <HeroBgContainer className='position-absolute'>
              <HeroBg className='position-absolute text-center'>
                <Image
                  src={
                    tvData.backdrop_path
                      ? `https://image.tmdb.org/t/p/w1280${tvData?.backdrop_path}`
                      : '/Images/Hex.png'
                  }
                  alt='tv-backdrop'
                  layout='fill'
                  objectFit='cover'
                  priority
                />
              </HeroBg>
              <DominantColor image={tvData?.poster_path} />
            </HeroBgContainer>
            <DetailsHeroWrap>
              <HeroImgWrapper>
                <HeroImg className='position-relative text-center'>
                  <Image
                    src={
                      tvData.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tvData?.poster_path}`
                        : '/Images/DefaultImage.png'
                    }
                    alt='tv-poster'
                    layout='fill'
                    objectFit='cover'
                    priority
                  />
                </HeroImg>

                {videos.length !== 0 && (
                  <a
                    href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                    target='_blank'
                    rel='noreferrer'
                    aria-label='trailer'
                  >
                    <HeroTrailer>
                      <FaYoutube size='1.5rem' />
                      <Span>Play Trailer</Span>
                    </HeroTrailer>
                  </a>
                )}
                <SocialMediaLinks
                  links={socialIds}
                  homepage={tvData.homepage}
                />
              </HeroImgWrapper>

              <Gradient />
              <HeroInfo className='d-flex'>
                <TVDetails
                  tvData={tvData}
                  date={getYear}
                  runtime={epRuntime}
                  crew={crewData}
                />
              </HeroInfo>
            </DetailsHeroWrap>
          </HeroDetailsContainer>

          {/* tv facts */}
          <TVFacts facts={tvFacts} languages={languages} />

          {/* tv tabs */}
          <TVTab
            id={tvData.id}
            cast={cast}
            seasons={tvData?.seasons}
            reviews={tvData?.reviews?.results ?? []}
            backdrops={tvData?.images?.backdrops ?? []}
            posters={tvData?.images?.posters ?? []}
          />
        </>
      )}
    </>
  );
};

TvShow.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const tv_id = ctx.query.id;

    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${api_key}&language=en-US&append_to_response=images,videos,credits,reviews&include_image_language=en,null`
    );

    const languagesResponse = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${api_key}`
    );

    const socialLinks = await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}/external_ids?api_key=${api_key}&language=en-US`
    );

    const error = tvResponse.ok ? false : true;

    if (error) {
      throw new Error();
    } else {
      const tvData = await tvResponse.json();

      const languages = await languagesResponse.json();

      const socialIds = await socialLinks.json();

      return {
        tvData,
        error,
        languages,
        socialIds
      };
    }
  } catch {
    return { error: true };
  }
};

export default TvShow;
