import { Fragment } from "react";

import { Gradient } from "../Movie/MovieStyles";
import {
  Divider,
  Rounded,
  GenreWrap,
  LightorDark,
  MovieRatingWrapper,
  MovieTitle,
  RtoR,
  Span,
  MovieCreditWrapper,
  MovieCredit,
} from "./MovieDetailsStyles";

const MovieDetails = ({ movieDetailsData, date, runtime, crew }) => {
  const releaseDate = new Date(movieDetailsData.release_date.toString())
    .toDateString()
    .slice(4);

  return (
    <Fragment>
      <Gradient />
      <LightorDark>
        <MovieTitle className="my-2">
          {movieDetailsData.title} ({date})
        </MovieTitle>
        <RtoR className="my-3">
          <Span>{releaseDate}</Span>
          <Divider className="mx-3" />
          <GenreWrap className="fw-bold">
            {movieDetailsData.genres.map((item) => (
              <Rounded key={item.id}>{item.name}</Rounded>
            ))}
          </GenreWrap>
          <Divider className="mx-3" />
          <Span>
            {runtime.getH} hours and {runtime.getM} min
          </Span>
        </RtoR>
        <i>
          <Span className="fw-normal my-4 d-block">
            {movieDetailsData.tagline}
          </Span>
        </i>
        <Span className="fw-normal">{movieDetailsData.overview}</Span>
        <MovieRatingWrapper>
          <Span className="display-3 fw-bolder">
            {movieDetailsData.vote_average}
          </Span>
          <span> / 10</span>
        </MovieRatingWrapper>
        <MovieCreditWrapper>
          {crew.map((item) => (
            <MovieCredit key={item.credit_id}>
              <Span className="d-block">{item.name}</Span>
              <Span className="d-block fw-normal">{item.job}</Span>
            </MovieCredit>
          ))}
        </MovieCreditWrapper>
      </LightorDark>
    </Fragment>
  );
};

export default MovieDetails;
