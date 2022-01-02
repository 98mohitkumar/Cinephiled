import styled from "styled-components";

export const HeroDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  z-index: 4;
  background: -moz-linear-gradient(
    270deg,
    rgba(31, 31, 31, 0.5) 0%,
    rgba(18, 18, 18, 1) 95%
  );
  background: -webkit-linear-gradient(
    270deg,
    rgba(31, 31, 31, 0.5) 0%,
    rgba(18, 18, 18, 1) 95%
  );
  background: linear-gradient(
    180deg,
    rgba(31, 31, 31, 0.5) 0%,
    rgba(18, 18, 18, 1) 95%
  );
`;

export const HeroTitle = styled.h1`
  color: white;
`;

export const Banner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: Url(/Images/poster.webp) repeat center / 70%;
  transform: rotate(10deg) scale(170%);
  filter: brightness(70%);
  z-index: 1;

  @media only ${(props) => props.theme.breakpoints.lg} {
    background: Url(/Images/poster.webp) repeat center / 90%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    background: Url(/Images/poster.webp) repeat center / 110%;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    background: Url(/Images/poster.webp) repeat center / 140%;
  }
`;

export const Form = styled.form`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  @media only ${(props) => props.theme.breakpoints.lg} {
    width: 65%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 2.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    display: block;

    & > div {
      width: 100% !important;
      margin: auto !important;
    }

    & > div > button {
      margin-top: 1rem;
      margin-inline: auto;
    }
  }
`;

export const Button = styled.button`
  ${(props) => `background: linear-gradient(
    135deg,
    ${props.theme.colors.accent3},
    ${props.theme.colors.accent2}
  );
  background: -webkit-linear-gradient(
    -45deg,
    ${props.theme.colors.accent3},
    ${props.theme.colors.accent2}
  );`}
  border: none;
  font-weight: 600;
  padding: 0.65rem 2rem;
  cursor: ${(props) =>
    props.show ? "pointer !important" : "default !important"};
  visibility: ${(props) =>
    props.show ? "visible !important" : "none !important"};
  opacity: ${(props) => (props.show ? "1 !important" : "0 !important")};
  transition: all 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 0.45rem 2rem;
  }
`;

export const UserInput = styled.input`
  border: none;
  box-shadow: none;
  border-radius: 0;
  height: 3rem;
  background-color: transparent;
  font-size: x-large;
  margin: auto;
  font-weight: 500;
  color: white;
  font-family: "Manrope", sans-serif;
  border-bottom: 1.75px solid;
  border-image-slice: 1;

  animation: 3.5s linear 0s alternate-reverse none infinite shift;
  -webkit-animation: 3.5s linear 0s alternate-reverse none infinite shift;
  -moz-animation: 3.5s linear 0s alternate-reverse none infinite shift;

  &::placeholder {
    color: #fff;
    font-weight: 500;
    font-family: "Manrope", sans-serif;
  }

  &:focus {
    background-color: transparent;
    box-shadow: none;
    color: white;
    border-color: white;
  }

  @keyframes shift {
    from {
      border-image-source: linear-gradient(
        90deg,
        rgb(51 51 51 / 0.1),
        rgb(255 255 255 / 1)
      );
    }

    to {
      border-image-source: linear-gradient(
        270deg,
        rgb(51 51 51 / 0.1),
        rgb(255 255 255 / 1)
      );
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 1.2rem;
    padding: 0.2rem;
  }
`;
