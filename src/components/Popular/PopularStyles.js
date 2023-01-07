import styled from 'styled-components';

export const CardsContainerGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 230px));
  place-items: center;
  justify-content: center;
  padding: 2rem 4.2vw;
  gap: 2rem;

  &.xl-row-gap {
    gap: 2.75rem 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 1.5rem;

    &.xl-row-gap {
      gap: 2.25rem 1.25rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 210px));

    &.xl-row-gap {
      gap: 2rem 1.25rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 175px));
    padding: 0rem 1.25rem 1.25rem;
    gap: 1.25rem;
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
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  transition: box-shadow 0.25s ease-in;
  border-radius: 12px;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
        0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }

  .poster {
    border-radius: 12px;
  }
`;

export const CardInfo = styled.div`
  padding-top: 1.65rem;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding-top: 1.45rem;
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
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
  margin: 0;

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 14px;
  }
`;

export const Rating = styled.div`
  position: absolute;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: #ddd;
  color: #212121;
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  border: 5px solid #121212;
  right: 16px;
  bottom: -22px;

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 2.5rem;
    width: 2.5rem;
    right: 12px;
    bottom: -22px;
    font-size: 0.75rem;
  }
`;
