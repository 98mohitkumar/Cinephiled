import Head from 'next/head';
import Image from 'next/image';
import {
  SeasonInfoMain,
  SeasonInfoWrapper,
  SeasonsRelease,
  SeasonTitle,
} from '../../../../components/TVInfo/TVStyles';
import {
  EpisodeImg,
  Error404,
  SeasonCommonOverview,
  SeasonEpisodesWrapper,
  SeasonExpandedContainer,
  SeasonShowcaseImg,
  SeasonShowcaseTitle,
  SeasonShowcaseWrapper,
  TrWrapper,
  Rating,
} from '../../../../styles/GlobalComponents';

const Seasons = ({ error, data }) => {
  const getYear = (date) => {
    const year = !date ? 'TBA' : new Date(date).getFullYear();
    return year;
  };

  const getReleaseDate = (date) => {
    const releaseDate = !date
      ? 'TBA'
      : new Date(date.toString()).toDateString().slice(4, -5) +
        ', ' +
        new Date(date.toString()).getFullYear();

    return releaseDate;
  };

  const getRating = (rating) => {
    const vote = !rating ? 'NR' : Number.parseFloat(rating).toFixed(1);

    return vote;
  };
  return (
    <>
      <Head>
        <title>{!error ? data.name : 'Not Found - Cinephiled'}</title>
        <meta
          property='og:image'
          content={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
          key='og_image'
        />
        <meta property='og:title' content={data.name}></meta>
      </Head>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <SeasonExpandedContainer>
          <SeasonShowcaseWrapper>
            <SeasonShowcaseImg className='position-relative'>
              <Image
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : '/Images/DefaultImage.png'
                }
                alt='TV-season-poster'
                layout='fill'
                objectFit='cover'
              />
            </SeasonShowcaseImg>

            <div>
              <SeasonShowcaseTitle>
                {data.name} ({getYear(data.air_date)})
              </SeasonShowcaseTitle>
              {data.overview && (
                <SeasonCommonOverview>{data.overview}</SeasonCommonOverview>
              )}
            </div>
          </SeasonShowcaseWrapper>
          <SeasonEpisodesWrapper>
            <span className='episodesTitle'>
              Episodes ({data.episodes.length})
            </span>
            {data.episodes.map((item, i) => (
              <SeasonShowcaseWrapper className='my-5 episodesBox' key={item.id}>
                <EpisodeImg className='position-relative'>
                  <Image
                    src={
                      item.still_path
                        ? `https://image.tmdb.org/t/p/w500${item.still_path}`
                        : '/Images/DefaultImage.png'
                    }
                    alt='TV-season-episode-poster'
                    layout='fill'
                    objectFit='cover'
                  />
                </EpisodeImg>
                <SeasonInfoWrapper className='ipRes'>
                  <SeasonInfoMain>
                    <SeasonTitle className='text'>
                      {!item.episode_number ? i : item.episode_number}.{' '}
                      {item.name}
                    </SeasonTitle>
                    <TrWrapper>
                      <SeasonsRelease className='text airDate'>
                        {getReleaseDate(item.air_date)}
                      </SeasonsRelease>
                      <Rating>
                        <p>{getRating(item.vote_average)}</p>
                      </Rating>
                    </TrWrapper>
                    {item.overview && (
                      <SeasonCommonOverview>
                        {item.overview}
                      </SeasonCommonOverview>
                    )}
                  </SeasonInfoMain>
                </SeasonInfoWrapper>
              </SeasonShowcaseWrapper>
            ))}
          </SeasonEpisodesWrapper>
        </SeasonExpandedContainer>
      )}
    </>
  );
};

Seasons.getInitialProps = async (ctx) => {
  try {
    const api_key = process.env.NEXT_PUBLIC_API_KEY;
    const seasonNumber = ctx.query.sn;
    const tv_id = ctx.query.id;

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}/season/${seasonNumber}?api_key=${api_key}&language=en-US`
    );

    const error = response.ok ? false : true;

    const res = await response.json();

    return { error, data: res };
  } catch {
    return { error: true };
  }
};

export default Seasons;
