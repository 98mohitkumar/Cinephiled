import styled from "styled-components";

export const HeroDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 102%;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 4;
  background: linear-gradient(180deg, rgba(31, 31, 31, 0.5) 0%, rgba(18, 18, 18, 1) 95%);

  background: ${({ searchModal }) => searchModal && "transparent"};
`;

export const HeroTitle = styled.h1`
  color: white;
`;

export const Banner = styled.div`
  position: absolute;
  inset: 0;
  background: Url(/Images/poster.webp) repeat center / 70%;
  filter: brightness(70%);
  z-index: 1;
  transform: scale(2) rotate(5deg);
  will-change: transform;
  animation: hero-banner 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards;

  @media only ${(props) => props.theme.breakpoints.lg} {
    background: Url(/Images/poster.webp) repeat center / 90%;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    background: Url(/Images/poster.webp) repeat center / 140%;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    background: Url(/Images/poster.webp) repeat center / 200%;
  }

  @keyframes hero-banner {
    to {
      transform: scale(1.7) rotate(10deg);
    }
  }
`;

export const Form = styled.form`
  width: clamp(360px, 75vw, 800px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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

  .suggestions {
    position: absolute;
    width: 100%;
    background-color: rgb(221, 221, 221);
    max-height: 240px;
    overflow-y: scroll;
    border-radius: 4px;
    box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
      0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);

    ::-webkit-scrollbar {
      width: 4px;
    }

    & > a:last-child > div:last-child {
      border: none;
    }

    @media only ${(props) => props.theme.breakpoints.sm} {
      max-height: 200px;
    }
  }
`;

export const SearchCTA = styled.button`
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
  color: #121212;
  display: grid;
  place-items: center;
  align-self: center;
  padding: 0.65rem 2rem;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 0.35rem 1rem;
  }
`;

export const UserInput = styled.input`
  border: none;
  box-shadow: none;
  position: relative;
  border-radius: 0;
  background-color: transparent;
  font-size: 1.5rem;
  width: 100%;
  font-weight: 400;
  color: white;
  font-family: "Manrope", sans-serif;

  &::placeholder {
    color: #fff;
  }

  &:focus {
    background-color: transparent;
    box-shadow: none;
    color: white;
    border-color: white;
    outline-color: transparent;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 1.05rem;
  }
`;

export const SearchSlice = styled.div`
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #121212;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  transition: background-color 0.1s ease-in-out;

  .suggestion-title,
  .tag {
    color: black;
    margin: 0px;
    font-weight: 500;
    line-height: 1.2;
  }

  .suggestion-title {
    font-size: 1.1rem;

    @media only ${(props) => props.theme.breakpoints.xs} {
      font-size: 1rem;
    }
  }

  .tag {
    border: 1px solid #121212;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  @media only ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      background-color: rgb(0 0 0 / 0.1);
    }
  }
`;

export const Anchor = styled.a`
  &:focus-visible {
    border: none;
    outline-color: transparent;
  }

  &:focus > div {
    background-color: rgb(0 0 0 / 0.1);
  }
`;
