import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1600px;
  margin: auto;
`;

export const Container = styled.div`
  width: 100%;
  height: 32rem;
  overflow: hidden;
`;

export const AboutWrapper = styled.div`
  min-height: 100vh;
`;

export const AboutContainer = styled.div`
  margin: 2rem 4rem auto;
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
`;

export const DetailsHeroWrap = styled.div`
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-items: center;
  min-height: 40rem;
  gap: 0rem 2rem;
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
`;

export const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(0deg, #121212 14%, rgba(21, 21, 21, 0.5) 100%);
  inset: 0;
  z-index: -1;
`;

export const SearchHeading = styled.h1`
  font-weight: bold;
`;

export const SearchContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 3rem 6rem;
`;

export const BadQuery = styled.h1`
  font-weight: bold;
  font-size: 10rem;
  text-align: center;
`;

export const SearchResultsContainer = styled.div`
  padding: 2rem 3rem;
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
  box-shadow: 0px 0px 2rem rgba(0, 0, 0, 0.2);
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
`;

export const QueryInfoWrapper = styled.div`
  padding: 0.65rem 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const QueryRealeaseDate = styled.p`
  color: #818181;
  font-size: 1rem;
  font-family: "Satoshi", sans-serif;
  font-weight: 400;
  margin-bottom: 0rem;
`;

export const QueryDescription = styled.p`
  color: #121212;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin-top: 10px;
  margin-bottom: 0rem;
`;

export const NoDataText = styled.p`
  padding: 1.25rem 6rem;
`;

export const RecommendationsContainer = styled.div`
  width: 100%;
  padding: 1rem 3rem;
`;

export const RecommendationsGrid = styled.div`
  width: 100%;
  padding: 0rem 3rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
`;

export const RecommendedWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  align-self: flex-start;
`;

export const RecommendedImg = styled.div`
  height: 150px;
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/w500${props.backdrop}) no-repeat center center /cover`};
  cursor: pointer;
  border-radius: 16px;
`;

export const HeroImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
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
`;

export const SocialMediaLinksWrapper = styled.div`
  width: 17rem;
  height: 45px;
  color: #ebebeb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.25rem;
  display: ${(props) => (props.notShow ? "none;" : "flex;")};
`;
