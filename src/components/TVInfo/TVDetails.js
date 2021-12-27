import {
  Credits,
  CreditsWrapper,
  Divider,
  GenreWrap,
  HeroInfoTitle,
  HeroInfoWrapper,
  RatingWrapper,
  Rounded,
  RtoR,
  Span,
} from "../MovieInfo/MovieDetailsStyles";

const TVDetails = ({ tvData, date, runtime, crew }) => {
  tvData.genres > 3 && tvData.genres.splice(3);

  return (
    <>
      <HeroInfoWrapper>
        <HeroInfoTitle className="my-2">
          {tvData.name} ({date})
        </HeroInfoTitle>

        <RtoR>
          {tvData.genres.length > 0 && (
            <GenreWrap>
              {tvData.genres.map((item) => (
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
          <Span className="fw-normal my-4 d-block">{tvData.tagline}</Span>
        </i>
        <Span className="fw-normal">{tvData.overview}</Span>
        <RatingWrapper>
          <Span className="display-3 fw-bolder">{tvData.vote_average}</Span>
          <span> / 10</span>
        </RatingWrapper>
        <CreditsWrapper>
          {crew.length > 0 &&
            crew.map((item) => (
              <Credits key={item.credit_id}>
                <Span className="d-block">{item.name}</Span>
                <Span className="d-block fw-normal">
                  {item.job ? item.job : "Creator"}
                </Span>
              </Credits>
            ))}
        </CreditsWrapper>
      </HeroInfoWrapper>
    </>
  );
};

export default TVDetails;
