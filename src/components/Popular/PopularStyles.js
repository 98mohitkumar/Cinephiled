import styled from 'styled-components';

export const MoviesSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 240px));
  place-items: center;
  justify-content: center;
  gap: 2rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(auto-fit, minmax(160px, 225px));
    padding: 1.75rem !important;
    gap: 1.25rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1rem;
    padding: 1rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem !important;
    gap: 0.35rem 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 165px));
  }
`;

export const Cards = styled.div`
  width: 14rem;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 13.2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 10rem;
  }
`;

export const CardImg = styled.div`
  position: relative;
  height: 20rem;
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

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 15rem;
  }

  .poster {
    border-radius: 12px;
    overflow: hidden;
  }
`;

export const MoviesInfo = styled.div`
  padding: 1.75rem 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0rem;
  }
`;

export const MoviesInfoTitle = styled.h2`
  margin-top: 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ReleaseDate = styled.p`
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
`;

export const Rating = styled.div`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: #ddd;
  color: #212121;
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  margin-top: 18.5rem;
  border: 5px solid #121212;
  position: absolute;
  right: 0;

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 2.5rem;
    width: 2.5rem;
    margin-top: 13.8rem;
    margin-right: 0.5rem !important;
    font-size: 0.75rem;
  }
`;

export const TVSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 240px));
  place-items: center;
  justify-content: center;
  gap: 2rem;
  margin: auto;

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(auto-fit, minmax(160px, 225px));
    padding: 1.75rem !important;
    gap: 1.25rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1rem;
    padding: 1rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem !important;
    gap: 0.35rem 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 165px));
  }
`;

export const TVInfo = styled.div`
  padding: 1.75rem 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0rem;
  }
`;

export const TVInfoTitle = styled.h2`
  margin-top: 0.25rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Tab = styled.div`
  width: 40%;
  height: 4.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 4rem auto;
  border: 4px solid rgb(221, 221, 221);
  background: rgb(221, 221, 221);
  border-radius: 14px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  position: relative;

  @media only ${(props) => props.theme.breakpoints.lg} {
    width: 50%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 75%;
    height: 4rem;
    margin: 2rem auto;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 85%;
    height: 3.25rem;
    border-radius: 10px;
  }
`;

export const MovieSelection = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: ${(props) => (props.isMovies ? 'white' : 'black')};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.325s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin-top: -3px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
    margin-top: 0px;
  }
`;

export const Slider = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: black;
  ${(props) =>
    props.isMovies
      ? `transform: translateX(0%);`
      : `transform: translateX(100%);`}
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.xs} {
    border-radius: 8px;
  }
`;

export const TVSelection = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: ${(props) => (props.isMovies ? 'black' : 'white')};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin-top: -3px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
    margin-top: 0px;
  }
`;
