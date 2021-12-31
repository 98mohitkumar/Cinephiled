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
  Tagline,
} from "../MovieInfo/MovieDetailsStyles";

const TVDetails = ({ tvData, date, runtime, crew }) => {
  tvData.genres.length > 3 && tvData.genres.splice(3);

  return (
    <>
      <HeroInfoWrapper>
        <HeroInfoTitle className="mb-2">
          {tvData.name} ({date})
        </HeroInfoTitle>

        <RtoR className="my-3">
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
        {tvData.tagline !== "" && (
          <i>
            <Tagline className="my-4 d-block">{tvData.tagline}</Tagline>
          </i>
        )}
        <Span className="fw-normal">{tvData.overview}</Span>
        <RatingWrapper>
          {tvData.vote_average !== 0 ? (
            <>
              <Span className="display-3 fw-bolder">{tvData.vote_average}</Span>
              <span> / 10</span>
            </>
          ) : (
            <Span className="display-3 fw-bolder">NR</Span>
          )}
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
