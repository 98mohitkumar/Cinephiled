import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1600px;
  margin: auto;
`;

export const Container = styled.div`
  width: 100%;
  height: 32rem;
  overflow: hidden;

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 25rem;
  }
`;

export const AboutWrapper = styled.div`
  min-height: 100vh;
`;

export const AboutContainer = styled.div`
  margin: 1rem 4rem auto;

  @media only ${(props) => props.theme.breakpoints.xs} {
    margin: 2rem;
    margin-bottom: auto;
  }
`;

export const Error404 = styled.h1`
  font-weight: bold;
  font-size: 10rem;
  text-align: center;
  background: ${(props) => `linear-gradient(
    90deg,
    ${props.theme.colors.accent2},
    ${props.theme.colors.accent3}
  )`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: hue-rotate(45deg);
  -webkit-filter: hue-rotate(45deg);
  animation: textGradient 4s alternate-reverse linear infinite;

  @keyframes textGradient {
    to {
      filter: hue-rotate(360deg);
      -webkit-filter: hue-rotate(360deg);
    }
  }
`;

export const DetailsWrapper = styled.div`
  min-height: 100vh;
`;

export const HeroDetailsContainer = styled.div`
  width: 100%;
  min-height: 40rem;
  overflow: hidden;
`;

export const HeroBgContainer = styled.div`
  inset: 0;
  z-index: -1;

  @media only ${(props) => props.theme.breakpoints.ip} {
    bottom: 20rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    bottom: 45rem;
  }
`;

export const HeroBg = styled.div`
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/w1280${props.backdrop}) no-repeat center center /cover`};
  inset: 0;
`;

export const HeroImg = styled.div`
  height: 25rem;
  width: 17rem;
  background: ${(props) =>
    props.data !== null
      ? `Url(https://image.tmdb.org/t/p/w780${props.data}) no-repeat center center /cover`
      : `Url(/Images/DefaultImage.png) no-repeat center center /cover`};
  border-radius: 12px;
  box-shadow: 0 0 2rem rgb(12 12 12 /0.4);

  @media only ${(props) => props.theme.breakpoints.lg} {
    margin: 0rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    height: 18rem;
    width: 12rem;
  }
`;

export const DetailsHeroWrap = styled.div`
  padding: 3.5rem 4.2vw;
  display: grid;
  grid-template-columns: 315px 1fr;
  align-items: center;
  justify-items: center;
  min-height: 40rem;
  gap: 0rem 2rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: 280px 1fr;
    padding: 3rem 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 3rem 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 2rem 5px;
  }
`;

export const HeroInfo = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  @media only ${(props) => props.theme.breakpoints.xs} {
    & span {
      font-size: 14px;
    }
  }
`;

export const FactsFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > :nth-child(1) {
      font-size: 20px;
    }

    & > :nth-child(2) {
      font-size: 16px;
    }
  }
`;

export const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(0deg, #121212 14%, rgba(21, 21, 21, 0.5) 100%);
  inset: 0;
  z-index: -1;

  @media only ${(props) => props.theme.breakpoints.ip} {
    bottom: 20rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    bottom: 45rem;
  }
`;

export const SearchHeading = styled.h1`
  font-weight: bold;
`;

export const SearchContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 3rem 6rem;
  margin-bottom: auto;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 3rem 4.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 3rem 1rem;
  }
`;

export const BadQuery = styled.h1`
  font-weight: bold;
  font-size: calc(4rem + 4vw);
  text-align: center;
`;

export const SearchResultsContainer = styled.div`
  padding: 2rem 3rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 2rem 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0rem;
  }
`;

export const EmptySearch = styled.h3`
  padding: 2rem 0rem;
  font-weight: 500;
`;

export const QueryContainer = styled.div`
  height: 142px;
  width: 100%;
  background: white;
  border-radius: 10px;
  margin: 1.75rem 0rem;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  outline: 1px solid rgba(255, 255, 255, 0.5);
`;

export const QueryImg = styled.div`
  min-width: 6rem;
  height: 142px;
  background: ${(props) =>
    props.poster !== null
      ? `Url(https://image.tmdb.org/t/p/w500${props.poster}) no-repeat center center /cover`
      : `Url(/Images/DefaultImage.png) no-repeat center center /cover`};
`;

export const QueryTitle = styled.span`
  color: #121212;
  font-weight: 500;
  font-size: 1.5rem;
  display: block;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 20px;
    line-height: 1.2;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 16px;
  }
`;

export const QueryInfoWrapper = styled.div`
  padding: 0.65rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem;
  }
`;

export const QueryRealeaseDate = styled.p`
  color: #818181;
  font-size: 1rem;
  font-family: "Satoshi", sans-serif;
  font-weight: 400;
  margin-bottom: 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 14px;
  }
`;

export const QueryDescription = styled.p`
  color: #121212;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin-top: 10px;
  margin-bottom: 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 0.9rem;
    margin-top: 10px;
    padding: 0.1rem 0rem;
    line-height: 1.2;
  }
`;

export const NoDataText = styled.p`
  padding: 1.25rem;
  font-size: 2.25rem;
`;

export const RecommendationsContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 1rem 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem;
  }
`;

export const RecommendationsGrid = styled.div`
  padding: 0rem 3rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
    padding: 0rem 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    grid-template-columns: 1fr;
    padding: 0px;
  }
`;

export const RecommendedWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem 0rem;
  }
`;

export const RecommendedImg = styled.div`
  height: 150px;
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/w500${props.backdrop}) no-repeat center center /cover`};
  border-radius: 12px;
  transition: box-shadow 0.25s ease-in;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
      0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
      0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 200px;
  }
`;

export const HeroImgWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 2rem 0rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 0rem;
    grid-template-columns: 192px;
    justify-items: flex-start;
    padding: 0rem 1rem;
    gap: 2rem;

    & > div:first-child {
      grid-column: 1 / span 2;
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 1.75rem;
    & > div:first-child {
      grid-column: 1 / span 1;
    }
  }
`;

export const HeroTrailer = styled.div`
  background: #ebebeb;
  color: #121212;
  border-radius: 8px;
  width: 17rem;
  height: 45px;
  padding: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  cursor: pointer;

  & span {
    font-weight: bold;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 12rem;
    font-size: 1rem;
  }
`;

export const SocialMediaLinksWrapper = styled.div`
  width: 17rem;
  height: 45px;
  color: #ebebeb;
  display: ${(props) => (props.notShow ? "none;" : "flex;")};
  justify-content: space-around;
  align-items: center;
  padding: 0.25rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    justify-content: flex-start;
    width: max-content;
    gap: 4rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 3rem;
  }
`;

export const AboutCreditsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 26px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 80%;
  }
`;
