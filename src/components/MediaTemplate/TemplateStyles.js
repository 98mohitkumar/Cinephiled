import styled from "styled-components";

export const CardsContainerGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));
  place-items: center;
  gap: clamp(20px, 3vw, 32px);

  &.xl-row-gap {
    gap: clamp(16px, 5vw, 44px) clamp(20px, 3vw, 32px);
  }

  @media only ${(props) => props.theme.breakpoints.xl} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Cards = styled.div`
  width: 100%;
  align-self: flex-start;
`;

export const CardImg = styled.div`
  position: relative;
  text-align: center;
  aspect-ratio: 0.666;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  transition: box-shadow 0.25s ease-in;
  border-radius: 12px;
  overflow: hidden;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }

  .poster {
    border-radius: 12px;
  }
`;

export const CardInfo = styled.div`
  margin-top: 26px;

  @media only ${(props) => props.theme.breakpoints.sm} {
    margin-top: 22px;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 16px;
  }
`;

export const ReleaseDate = styled.p`
  font-weight: 500;
  margin: 0;

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 14px;
  }
`;
