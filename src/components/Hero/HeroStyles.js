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
  filter: brightness(70%);
  z-index: 1;
  animation: banner 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards;

  @media only ${(props) => props.theme.breakpoints.lg} {
    background: Url(/Images/poster.webp) repeat center / 90%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    background: Url(/Images/poster.webp) repeat center / 110%;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    background: Url(/Images/poster.webp) repeat center / 140%;
  }

  @keyframes banner {
    from {
      transform: scale(2.2);
      opacity: 0.5;
    }
    to {
      transform: scale(1.7) rotate(10deg);
      opacity: 1;
    }
  }
`;

export const Form = styled.form`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;

  .border-animated {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-radius: 1px;
      opacity: 0.8;
      background: rgb(255 255 255 / 0.5);
      background-image: linear-gradient(
        90deg,
        rgba(121, 121, 121, 0.4),
        rgba(255, 255, 255, 1),
        rgba(121, 121, 121, 0.4)
      );
      background-position: -1500px 0px;
      animation: shift 1.5s cubic-bezier(0.39, 0.58, 0.57, 1) 0s infinite;
      -moz-animation: shift 1.5s cubic-bezier(0.39, 0.58, 0.57, 1) 0s infinite;

      @keyframes shift {
        from {
          background-position: -700px 0;
        }
        to {
          background-position: 700px 0;
        }
      }

      @media only ${(props) => props.theme.breakpoints.sm} {
        animation-duration: 2s;
      }
    }
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    width: 65%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
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

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 85%;
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
  position: relative;
  border-radius: 0;
  height: 3rem;
  background-color: transparent;
  font-size: x-large;
  margin: auto;
  font-weight: 400;
  color: white;
  font-family: "Manrope", sans-serif;

  &::placeholder {
    color: #fff;
    font-weight: 400;
    font-family: "Manrope", sans-serif;
  }

  &:focus {
    background-color: transparent;
    box-shadow: none;
    color: white;
    border-color: white;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 1.2rem;
    padding: 0.2rem;
  }
`;
