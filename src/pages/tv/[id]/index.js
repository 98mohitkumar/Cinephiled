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

const TvShow = ({ tvData, error, languages, socialIds }) => {
  let creators = [];
  let characters = [];
  let cast = [];
  let creditsDetails = [];
  let reviewDetails = [];
  let backdrops = [];
  let posters = [];
  let videos = [];

  let getyear = '';
  let endyear = '';
  let epRuntime = {};
  let tvFacts = {};
  let tvStatus = '';
  let ogLanguage = '';
  let netwrok = '';
  let type = '';

  if (!error) {
    creditsDetails = tvData.credits;
    creditsDetails.crew.forEach((item) => {
      if (item.job === 'Characters') characters.push(item);
    });
    tvData.created_by.length > 0 &&
      tvData.created_by.forEach((item) => creators.push(item));

    tvData.videos.results.forEach(
      (item) =>
        item.site === 'YouTube' && item.type === 'Trailer' && videos.push(item)
    );
    cast = creditsDetails.cast;

    cast.splice(15);

    reviewDetails = tvData.reviews;
    backdrops = tvData.images.backdrops;
    posters = tvData.images.posters;

    getyear = tvData.first_air_date
      ? new Date(tvData.first_air_date).getFullYear()
      : 'TBA';
    endyear =
      tvData.status === 'Ended' || tvData.status === 'Canceled'
        ? '- ' + new Date(tvData.last_air_date).getFullYear()
        : '- ';

    const getH = Math.floor(tvData.episode_run_time[0] / 60);
    const getM = Math.ceil((tvData.episode_run_time[0] / 60 - getH) * 60);
    epRuntime = { getH, getM };

    tvStatus = !tvData.status ? 'TBA' : tvData.status;

    ogLanguage = !tvData.original_language ? 'TBA' : tvData.original_language;

    netwrok = !tvData.networks[0] ? 'TBA' : tvData.networks[0].name;

    type = !tvData.type ? 'TBA' : tvData.type;

    tvFacts = {
      status: tvStatus,
      language: ogLanguage,
      network: netwrok,
      type: type
    };
  }

  if (characters.length > 2) {
    characters.splice(2);
  }

  if (creators.length > 3) {
    creators.splice(3);
  }

  let crew = [...creators, ...characters];

  return (
    <>
      <Head>
        <title>
          {!error
            ? `${tvData.name} (${getyear}
          ${endyear}) - Cinephiled`
            : 'Not Found - Cinephiled'}
        </title>
        {!error && (
          <>
            <meta
              property='og:image'
              content={`https://image.tmdb.org/t/p/w1280${tvData.backdrop_path}`}
            />
            <meta
              property='og:title'
              content={`${tvData.name} (${getyear}
          ${endyear}) - Cinephiled`}
            ></meta>
          </>
        )}
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <>
          <HeroDetailsContainer className='position-relative mb-auto'>
            <HeroBgContainer className='position-absolute'>
              <HeroBg
                backdrop={tvData.backdrop_path}
                className='position-absolute'
              ></HeroBg>
              <DominantColor image={tvData.poster_path} />
            </HeroBgContainer>
            <DetailsHeroWrap>
              <HeroImgWrapper>
                <HeroImg data={tvData.poster_path} />

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
                  date={getyear}
                  runtime={epRuntime}
                  crew={crew}
                />
              </HeroInfo>
            </DetailsHeroWrap>
          </HeroDetailsContainer>
          <TVFacts facts={tvFacts} languages={languages} />
          <TVTab
            id={tvData.id}
            cast={cast}
            seasons={tvData.seasons}
            reviews={reviewDetails.results}
            backdrops={backdrops}
            posters={posters}
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
