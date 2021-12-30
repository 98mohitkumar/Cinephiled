import styled from "styled-components";

export const MoviesSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 280px));
  place-items: center;
  justify-content: center;
  gap: 2rem 0rem;

  @media only ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: repeat(auto-fit, minmax(190px, 235px));
    padding: 1.75rem !important;
    gap: 1.25rem 0rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1rem 0rem;
    padding: 1rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.75rem !important;
    gap: 0.35rem 0rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 175px));
  }
`;

export const Cards = styled.div`
  width: 14rem;
  max-height: auto;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.md} {
    width: 13.2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 10rem;
  }
`;

export const CardImg = styled.div`
  height: 20rem;
  background: ${(props) => `url(https://image.tmdb.org/t/p/w780${props.data})
    no-repeat center center / cover`};
  border-radius: 12px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  transition: box-shadow 0.25s ease-in;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
      0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
      0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 15rem;
  }
`;

export const MoviesInfo = styled.div`
  padding: 1.75rem 0.35rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0.35rem;
  }
`;

export const MoviesInfoTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
`;

export const ReleaseDate = styled.p`
  font-family: "Satoshi", sans-serif;
  font-weight: 500;
`;

export const Rating = styled.div`
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: #ddd;
  color: #212121;
  font-family: "Satoshi", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  margin-top: 18.5rem;
  border: 5px solid #121212;

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
  grid-template-columns: repeat(auto-fit, minmax(190px, 280px));
  place-items: center;
  justify-content: center;
  gap: 2rem 0rem;
  margin: auto;

  @media only ${(props) => props.theme.breakpoints.md} {
    grid-template-columns: repeat(auto-fit, minmax(190px, 235px));
    padding: 1.75rem !important;
    gap: 1.25rem 0rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1rem 0rem;
    padding: 1rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.75rem !important;
    gap: 0.35rem 0rem;
    grid-template-columns: repeat(auto-fit, minmax(160px, 175px));
  }
`;

export const TVInfo = styled.div`
  padding: 1.75rem 1rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 0.35rem;
  }
`;

export const TVInfoTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
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

  @media only ${(props) => props.theme.breakpoints.md} {
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
  color: ${(props) => (props.isMovies ? "white" : "black")};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.325s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
  }
`;

export const Slider = styled.div`
  position: absolute;
  width: 50%;
  height: 4rem;
  background: black;
  ${(props) =>
    props.isMovies
      ? `transform: translateX(0%);`
      : `transform: translateX(100%);`}
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.md} {
    height: 3.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 2.75rem;
    border-radius: 8px;
  }
`;

export const TVSelection = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: ${(props) => (props.isMovies ? "black" : "white")};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
  }
`;
