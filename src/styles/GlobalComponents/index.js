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

export const MovieDetailsWrapper = styled.div`
  min-height: 100vh;
`;

export const MovieContainer = styled.div`
  width: 100%;
  height: 42rem;
`;

export const MovieBgContainer = styled.div`
  inset: 0;
  z-index: 2;
  margin: 2rem 5rem;
`;

export const MovieBg = styled.div`
  border-radius: 16px;
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/original${props.backdrop}) no-repeat center center /cover`};
  z-index: 4;
  inset: 0;
`;

export const MovieImg = styled.div`
  height: 30rem;
  width: 18rem;
  background: ${(
    props
  ) => `url(https://image.tmdb.org/t/p/original${props.data})
    no-repeat center center / cover`};
  border-radius: 12px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.25s ease-in;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 1.5rem rgba(0, 0, 0, 1);
  }
`;

export const MovieHeroWrap = styled.div`
  inset: 0;
  z-index: 8;
  margin: 2rem 5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  justify-items: center;
`;

export const MovieInfo = styled.div`
  height: 100%;
  width: 100%;
  padding: 3rem;
`;
