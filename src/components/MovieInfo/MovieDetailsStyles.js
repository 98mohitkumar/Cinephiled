import styled from "styled-components";

export const HeroInfoWrapper = styled.div`
  color: white;
  margin: 0rem;
`;

export const HeroInfoTitle = styled.h1`
  font-weight: bold;
  font-size: 2.25rem;
  margin-top: 0rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1.35rem;
    line-height: 1.5;
  }
`;

export const Span = styled.span`
  font-weight: 500;
`;

export const ReleaseDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const GenreWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  max-width: 88vw;
  width: max-content;
  gap: 0rem 1rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    order: 3;
  }

  & div:nth-last-child(2)::after {
    content: "";
    right: -6px;
  }
`;

export const Rounded = styled.div`
  border: 2px solid white;
  border-radius: 20px;
  padding: 0.05rem 0.75rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-weight: 500 !important;
    font-size: 20px;
    border: none;
    padding: 0;
    position: relative;

    &::after {
      content: ",";
      position: absolute;
      right: -6px;
      bottom: 0;
    }
  }
`;

export const Divider = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  display: inline-block;
  background-color: white;

  @media only ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }
`;

export const RtoR = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
  gap: 1rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    & > span,
    & > div > span {
      font-size: 1rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin: 1.25rem 0rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    margin: 0.8rem 0rem !important;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: flex-start;
    & > span,
    & > div > span {
      font-size: 20px;
    }
  }
`;

export const RatingWrapper = styled.div`
  margin: 1rem 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > span:first-child {
      font-size: 4.5rem !important;
      font-weight: 600 !important;
    }
  }
`;

export const Overview = styled.p`
  font-size: 20px;
  font-weight: 500;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 18px;
  }
`;

export const CreditsWrapper = styled.div`
  display: grid;
  place-items: center start;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 18px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0rem 0.5rem;
    grid-template-columns: repeat(2, 1fr);
    font-size: 18px;
  }
`;

export const Credits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const FactsWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, max-content);
  gap: 2rem 5rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 18px;
    gap: 2rem 4rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 2rem 2.5rem;
    padding: 0.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 2rem 3rem;
    padding: 0rem 0rem 0rem 1rem;
    justify-items: flex-start;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FactsFieldSet = styled.fieldset`
  padding: 1rem;
  margin: 1rem auto;
  border: 2px solid #fff;
  border-radius: 20px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
    border: none;
  }
`;

export const FactsLegend = styled.legend`
  width: max-content;
  padding: 0rem 1rem;
  margin: 0;
  margin-left: 1rem;
  float: none;

  @media only ${(props) => props.theme.breakpoints.xs} {
    margin: 0;
    padding: 0rem 0.5rem;
    font-size: 2.5rem;
  }
`;

export const CastContainer = styled.div`
  width: 100%;
  padding: 2rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 2rem 1rem;
  }
`;

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 250px));
  place-items: center;
  justify-content: center;
  gap: 2rem 0rem;
  padding: 1rem 4rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(auto-fit, minmax(190px, 220px));
    gap: 1.25rem 0rem;
    padding: 1rem 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 1rem 0rem;
    padding: 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1rem 0rem;
    grid-template-columns: repeat(auto-fit, minmax(170px, 192px));
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 0.35rem 0rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CastImg = styled.div`
  background: ${(props) =>
    props.data === null
      ? `Url(/Images/DefaultAvatar.png) no-repeat center center /cover`
      : `Url(https://image.tmdb.org/t/p/w500${props.data}) no-repeat center 5% /cover`};
  width: 100%;
  height: 230px;
  border-radius: 12px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 210px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 180px;
  }
`;

export const CastWrapper = styled.div`
  width: 185px;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 170px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 150px;
  }
`;

export const ReviewsContainer = styled.div`
  width: 100%;
  padding: 2rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 1rem;
  }
`;

export const ReviewsWrap = styled.div`
  width: 100%;
  padding: 1rem 8rem;
  overflow: hidden;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 1rem 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 1rem 2.25rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1rem 1.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0.5rem;
  }
`;

export const Review = styled.p`
  padding: 1.25rem 6rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding-right: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1.25rem 0.5rem;
  }
`;

export const ReviewAuthorWrap = styled.div`
  max-width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  & span {
    font-weight: bold;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 1rem;
    margin-bottom: 0.75rem;

    & span {
      font-size: 16px;
    }
  }
`;

export const ReviewAuthorImg = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    `Url(https://avatars.dicebear.com/api/bottts/${props.id}.svg) no-repeat center center / cover`};
`;

export const BackdropsContainer = styled.div`
  width: 100%;
  padding: 3rem 5rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 2rem 1rem;
  }
`;

export const BackdropsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 2.5rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1rem;
  }
  @media only ${(props) => props.theme.breakpoints.xs} {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const BackdropsImgContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.lg} {
    height: 245px;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    height: 200px;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 150px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 220px;
  }
`;

export const BackdropsImg = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/w1280${props.backdrop}) no-repeat center center /cover;`};
  transition: transform 0.25s cubic-bezier(0.79, 0.14, 0.15, 0.86);

  &:hover {
    transform: scale(1.2);
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    &:hover {
      transform: scale(1.4);
    }
  }
`;

export const PostersContainer = styled.div`
  width: 100%;
  padding: 3rem 5rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 2rem 1rem;
  }
`;

export const PostersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 2rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

export const PostersImg = styled.div`
  width: 100%;
  height: 370px;
  border-radius: 12px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/w780${props.poster}) no-repeat center center /cover;`};

  @media only ${(props) => props.theme.breakpoints.lg} {
    height: 320px;
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    height: 250px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 260px;
  }
`;

export const Tagline = styled.span`
  font-weight: 400;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 18px;
  }
`;
