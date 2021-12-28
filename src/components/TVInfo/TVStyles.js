import styled from "styled-components";

export const SeasonsContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 3rem 5rem;
`;

export const SeasonWrapper = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  outline: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
`;

export const SeasonImg = styled.div`
  min-width: 7.5rem;
  background: ${(props) =>
    props.poster !== null
      ? `Url(https://image.tmdb.org/t/p/original${props.poster}) no-repeat center center /cover`
      : `Url(/images/DefaultImage.png) no-repeat center center /cover`};
`;

export const SeasonInfoWrapper = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SeasonInfoMain = styled.div`
  width: 100%;
`;

export const SeasonTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #121212;
`;

export const SeasonsRelease = styled.span`
  font-size: 1rem;
  color: #121212;
  font-weight: bold;
`;

export const SeasonDetailsDivider = styled.div`
  height: 1rem;
  width: 1.5px;
  background: #121212;
  display: inline-block;
  margin: 0rem 1.3rem;
`;

export const SeaonDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

export const SeaonsOverview = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #121212;
  margin: 0;
  margin-top: 15px;
`;
