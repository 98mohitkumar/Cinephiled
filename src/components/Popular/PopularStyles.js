import styled from "styled-components";

export const MoviesSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 3rem 0rem;
`;

export const Cards = styled.div`
  width: 14rem;
  max-height: auto;
  align-self: flex-start;
`;

export const CardImg = styled.div`
  height: 20rem;
  background: ${(props) => `url(https://image.tmdb.org/t/p/w780${props.data})
    no-repeat center center / cover`};
  border-radius: 12px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.25s ease-in;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 1.5rem rgba(0, 0, 0, 1);
  }
`;

export const MoviesInfo = styled.div`
  padding: 1.75rem 1rem;
`;

export const MoviesInfoTitle = styled.h2`
  font-size: 1.25rem;
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
`;

export const TVSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 3rem 0rem;
`;

export const TVInfo = styled.div`
  padding: 1.75rem 1rem;
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
  border: 4px solid white;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
  position: relative;
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
`;
