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
} from "./MovieDetailsStyles";

const MovieDetails = ({ movieDetailsData, date, runtime, crew }) => {
  const releaseDate =
    new Date(movieDetailsData.release_date.toString())
      .toDateString()
      .slice(4, -5) +
    ", " +
    new Date(movieDetailsData.release_date.toString()).getFullYear();

  movieDetailsData.genres.length > 3 && movieDetailsData.genres.splice(3);

  // console.log(movieDetailsData);

  return (
    <Fragment>
      <HeroInfoWrapper>
        <HeroInfoTitle className="my-2">
          {movieDetailsData.title} ({date})
        </HeroInfoTitle>
        <RtoR className="my-3">
          <Span>{releaseDate}</Span>
          <Divider className="mx-3" />
          {movieDetailsData.genres.length > 0 && (
            <GenreWrap className="fw-bold">
              {movieDetailsData.genres.map((item) => (
                <Rounded key={item.id}>{item.name}</Rounded>
              ))}
              <Divider className="me-3 ms-2" />
            </GenreWrap>
          )}
          <Span>
            {runtime.getH === 1 && runtime.getM === 0
              ? "60m"
              : runtime.getH > 0 && runtime.getH + "h "}
            {runtime.getM > 0 && runtime.getM + "m"}
          </Span>
        </RtoR>
        <i>
          <Span className="fw-normal my-4 d-block">
            {movieDetailsData.tagline}
          </Span>
        </i>
        <Span className="fw-normal">{movieDetailsData.overview}</Span>
        <RatingWrapper>
          <Span className="display-3 fw-bolder">
            {movieDetailsData.vote_average}
          </Span>
          <span> / 10</span>
        </RatingWrapper>
        <CreditsWrapper>
          {crew.map((item) => (
            <Credits key={item.credit_id}>
              <Span className="d-block">{item.name}</Span>
              <Span className="d-block fw-normal">{item.job}</Span>
            </Credits>
          ))}
        </CreditsWrapper>
      </HeroInfoWrapper>
    </Fragment>
  );
};

export default MovieDetails;
