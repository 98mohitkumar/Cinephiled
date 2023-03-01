import styled from 'styled-components';

export const RecommendationsContainer = styled.div`
  width: 100%;
  padding: 0px 4.2vw 32px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0rem 1.25rem 1.25rem;
  }
`;

export const RecommendationsGrid = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(20px, 3vw, 32px);

  @media only ${(props) => props.theme.breakpoints.xl} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const RecommendedWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
`;

export const RecommendedImg = styled.div`
  aspect-ratio: 1.6 / 1;
  border-radius: 12px;
  transition: box-shadow 0.25s ease-in;
  cursor: pointer;
  overflow: hidden;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
        0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }
`;

export const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
  }
`;
