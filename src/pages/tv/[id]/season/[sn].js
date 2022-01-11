import {
  SeasonInfoMain,
  SeasonInfoWrapper,
  SeasonsRelease,
  SeasonTitle,
} from "../../../../components/TVInfo/TVStyles";
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
} from "../../../../styles/GlobalComponents";

const Seasons = ({ error, data }) => {
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
  return (
    <>
      {error ? (
        <Error404>404</Error404>
      ) : (
        <SeasonExpandedContainer>
          <SeasonShowcaseWrapper>
            <SeasonShowcaseImg poster={data.poster_path} />
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
            <span className="episodesTitle">
              Episodes ({data.episodes.length})
            </span>
            {data.episodes.map((item, i) => (
              <SeasonShowcaseWrapper className="my-5 episodesBox" key={item.id}>
                <EpisodeImg img={item.still_path} />
                <SeasonInfoWrapper className="ipRes">
                  <SeasonInfoMain>
                    <SeasonTitle className="text">
                      {!item.episode_number ? i : item.episode_number}.{" "}
                      {item.name}
                    </SeasonTitle>
                    <TrWrapper>
                      <SeasonsRelease className="text airDate">
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
