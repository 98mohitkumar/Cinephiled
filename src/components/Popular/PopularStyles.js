import styled from 'styled-components';

export const CardsContainerGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  place-items: center;
  justify-content: center;
  padding: 3rem 4.2vw;
  gap: 2rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 0.35rem 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem 1.25rem;
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

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      cursor: pointer;
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
        0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }

  .poster {
    border-radius: 12px;
    overflow: hidden;
  }
`;

export const CardInfo = styled.div`
  padding: 1.75rem 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0rem;
  }
`;

export const InfoTitle = styled.h2`
  margin-top: 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ReleaseDate = styled.p`
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
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

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 2.5rem;
    width: 2.5rem;
    right: 8px;
    bottom: -22px;
    font-size: 0.75rem;
  }
`;
