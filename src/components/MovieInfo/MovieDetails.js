import { Fragment } from "react";
import {
  Divider,
  Rounded,
  GenreWrap,
  HeroInfoWrapper,
  RatingWrapper,
  HeroInfoTitle,
  RtoR,
  Span,
  CreditsWrapper,
  Credits,
  Tagline,
  ReleaseDateWrapper,
  Overview,
  Light,
} from "./MovieDetailsStyles";

const MovieDetails = ({
  movieDetailsData,
  date,
  runtime,
  crew,
  easter,
  showEaster,
}) => {
  const releaseDate =
    movieDetailsData.release_date === ""
      ? "TBA"
      : new Date(movieDetailsData.release_date.toString())
          .toDateString()
          .slice(4, -5) +
        ", " +
        new Date(movieDetailsData.release_date.toString()).getFullYear();

  movieDetailsData.genres.length > 3 && movieDetailsData.genres.splice(3);

  return (
    <Fragment>
      <HeroInfoWrapper>
        <HeroInfoTitle className="mb-2">
          {movieDetailsData.title} ({date})
        </HeroInfoTitle>
        {easter && <Light onClick={showEaster} />}
        <RtoR className="my-3">
          <ReleaseDateWrapper>
            <Span>{releaseDate}</Span>
          </ReleaseDateWrapper>
          {movieDetailsData.genres.length > 0 && (
            <GenreWrap className="fw-bold">
              <Divider />
              {movieDetailsData.genres.map((item) => (
                <Rounded key={item.id}>{item.name}</Rounded>
              ))}
              <Divider />
            </GenreWrap>
          )}
          {runtime.getH === 0 && runtime.getM === 0 ? (
            <Span>TBA</Span>
          ) : (
            <Span>
              {runtime.getH === 1 && runtime.getM === 0
                ? "60m"
                : runtime.getH > 0 && runtime.getH + "h "}
              {runtime.getM > 0 && runtime.getM + "m"}
            </Span>
          )}
        </RtoR>
        {movieDetailsData.tagline !== "" && (
          <i>
            <Tagline className="my-4 d-block">
              {movieDetailsData.tagline}
            </Tagline>
          </i>
        )}
        <Overview className="fw-normal">
          {movieDetailsData.overview === "" ? "-" : movieDetailsData.overview}
        </Overview>
        <RatingWrapper>
          {movieDetailsData.vote_average !== 0 ? (
            <>
              <Span className="display-3 fw-bolder">
                {movieDetailsData.vote_average}
              </Span>
              <span> / 10</span>
            </>
          ) : (
            <Span className="display-3 fw-bolder">NR</Span>
          )}
        </RatingWrapper>
        <CreditsWrapper>
          {crew.map((item) => (
            <Credits key={item.credit_id}>
              <Span className="d-block fw-bold">{item.name}</Span>
              <Span className="d-block fw-normal">{item.job}</Span>
            </Credits>
          ))}
        </CreditsWrapper>
      </HeroInfoWrapper>
    </Fragment>
  );
};

export default MovieDetails;
