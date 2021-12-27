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
`;

export const Form = styled.form`
  width: 60%;
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
  padding: 0.65rem 1.5rem;
`;
