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
  background: Url(/Images/poster.png) repeat center / 70%;
  transform: rotate(10deg) scale(170%);
  filter: brightness(50%);
  z-index: 1;

  @media only ${(props) => props.theme.breakpoints.sm} {
    background: Url(/Images/poster.png) repeat center / 140%;
  }
`;

export const Form = styled.form`
  width: 60%;

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
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
  margin: auto;
  border: none;
  font-weight: 600;
  padding: 0.65rem 2rem;
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
  height: 4rem;
  background-color: transparent;
  font-size: x-large;
  margin: auto;
  font-weight: 500;
  color: white;
  font-family: "Manrope", sans-serif;
  border-bottom: 1px solid #fff;
  transition: background-color 0.75s ease-in-out;

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

  @media only ${(props) => props.theme.breakpoints.md} {
    font-size: 1.2rem;
    padding: 0.2rem;
  }
`;
