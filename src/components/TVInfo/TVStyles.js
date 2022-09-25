import styled from 'styled-components';

export const SeasonsContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 3rem 5rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 90%;
    padding: 3rem 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 3rem 0rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0rem;
  }
`;

export const SeasonWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 180px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  cursor: pointer;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  outline: 1px solid rgba(255, 255, 255, 0.5);
`;

export const SeasonImg = styled.div`
  position: relative;
  min-width: 7.5rem;
  text-align: center;
`;

export const SeasonInfoWrapper = styled.div`
  padding: 1rem 2rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem;
  }
`;

export const SeasonInfoMain = styled.div`
  width: 100%;

  @media only ${(props) => props.theme.breakpoints.xs} {
    .xsRes {
      margin-bottom: 4px !important;
    }
  }
`;

export const SeasonTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #121212;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1.05rem;
  }
`;

export const SeasonsRelease = styled.span`
  font-size: 1rem;
  color: #121212;
  font-weight: bold;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 0.9rem;
  }
`;

export const SeasonDetailsDivider = styled.div`
  height: 1rem;
  width: 1.5px;
  background: #121212;
  display: inline-block;
  margin: 0rem 1rem;
`;

export const SeasonDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > div {
      display: none;
    }

    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const SeasonsOverview = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  color: #121212;
  margin: 0;
  margin-top: 15px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 14.4px;
  }
`;
