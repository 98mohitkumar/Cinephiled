import styled from "styled-components";

export const HeroInfoWrapper = styled.div`
  color: white;
  height: 100%;
  width: 100%;
`;

export const HeroInfoTitle = styled.h1`
  font-weight: bold;
  font-size: 2.5rem;
  margin-top: 0rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1.75rem;
    line-height: 1.5;
  }
`;

export const Span = styled.span`
  &.movieCastHead,
  &.toast-message {
    font-size: 18px;

    @media only ${(props) => props.theme.breakpoints.sm} {
      font-size: 16px;
    }
  }

  &.movieCastName {
    font-size: 1rem;
    font-weight: 400;

    @media only ${(props) => props.theme.breakpoints.sm} {
      font-size: 14px;
    }
  }

  &.genre {
    font-weight: 600;
    padding-top: clamp(1.5rem, 4vw, 2rem);
    padding-bottom: clamp(2rem, 4.25vw, 2.5rem);
  }

  &.credit {
    color: white;
    text-decoration: underline;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  }

  &.rating-option {
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.9;
      text-decoration: underline;
    }
  }

  &.episode-count {
    font-size: 14px;
    opacity: 0.8;
  }

  &.network {
    text-decoration: underline dotted;
    text-underline-offset: 0.3rem;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const ReleaseDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const GenreWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  max-width: 88vw;
  width: fit-content;
  gap: 1rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    order: 3;
    gap: 0.5rem 1rem;
  }

  & .sep::after {
    display: none;
  }
`;

export const Rounded = styled.div`
  border: 2px solid white;
  border-radius: 20px;
  padding: 0.05rem 0.9rem;

  @media only ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      color: #121212;
      background-color: white;
      cursor: pointer;
      transition: 0.3s ease-out;
      user-select: none;
    }
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-weight: 500 !important;
    font-size: 20px;
    border: none;
    padding: 0;
    position: relative;
    text-decoration: underline;

    &::after {
      content: ",";
      position: absolute;
      right: -6px;
      bottom: 0;
    }
  }
`;

export const Divider = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  display: inline-block;
  background-color: white;

  @media only ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }
`;

export const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(0deg, #121212 14%, rgba(21, 21, 21, 0.5) 100%);
  inset: 0;
  z-index: -1;

  &:not(.list) {
    @media only ${(props) => props.theme.breakpoints.ip} {
      bottom: 20rem;
    }

    @media only ${(props) => props.theme.breakpoints.xs} {
      bottom: 50%;
    }
  }
`;

export const RtoR = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: fit-content;
  gap: 1rem;

  .tvSpan {
    margin-right: 1rem;
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    & > span,
    & > div > span {
      font-size: 1rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin: 1.25rem 0rem !important;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    margin: 0.8rem 0rem !important;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: flex-start;
    & > span,
    & > div > span {
      font-size: 20px;
    }
  }
`;

export const RatingWrapper = styled.div`
  margin: 1rem 0rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > span:first-child {
      font-size: 4.5rem !important;
      font-weight: 600 !important;
    }
  }
`;

export const Overview = styled.p`
  font-size: 20px;
  font-weight: 500;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 18px;
  }
`;

export const CreditsWrapper = styled.div`
  display: grid;
  place-items: start;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  gap: 48px;
  margin-top: 32px;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 18px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 32px;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Credits = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const FactsWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  place-items: start;
  grid-template-columns: repeat(4, max-content);
  gap: 2rem 5rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 18px;
    gap: 2rem 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 2rem 6rem;
    padding: 1rem;
    grid-template-columns: repeat(2, max-content);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 2rem;
    padding: 0rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FactsFieldSet = styled.fieldset`
  padding: 1rem;
  margin: 1rem auto;
  border: 2px solid #fff;
  border-radius: 20px;
  max-width: max-content;

  @media only ${(props) => props.theme.breakpoints.sm} {
    min-width: 100%;
    border: none;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 1.25rem;
  }
`;

export const FactsLegend = styled.legend`
  width: max-content;
  padding: 0rem 1rem;
  float: none;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 0rem 1rem;
    font-size: 2.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0;
  }
`;

export const Tagline = styled.span`
  font-weight: 400;

  @media only ${(props) => props.theme.breakpoints.lg} {
    font-size: 18px;
  }
`;

export const Light = styled.div`
  width: 40px;
  height: 40px;
  background: url(/Images/lightsOut.png) no-repeat center center / 40%;
  background-color: white;
  border-radius: 20px;
  margin-top: 1rem;
  cursor: pointer;
`;

export const MovieEaster = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgb(18 18 18 /1);
  z-index: 10;

  ${(props) =>
    !props.show
      ? ` animation: hideEaster 1s ease-in-out forwards;

@keyframes hideEaster{
  from {
    background-color: rgb(18 18 18 /1);
    z-index: 10;
  }

  to {
    background-color: rgb(18 18 18 /0);
    z-index: -1;
  }
}`
      : ` animation: showEaster 0.5s ease-in-out forwards;

@keyframes showEaster{
  from {
    background-color: rgb(18 18 18 /0);
    z-index: -1;
  }

  to {
    background-color: rgb(18 18 18 /1);
    z-index: 10;
  }
}`};
`;

export const LightsInOut = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  margin: 0 auto;
  border-radius: 50px;
  background: url(/Images/lightsIn.png) no-repeat center center / 50%;
  background-color: #313131;
  ${(props) =>
    props.show
      ? `box-shadow: 0px 0px 25px rgb(255 255 255 /0.8);  
      opacity: 0;
      animation: hideLight 0s 0.5s ease-in-out forwards;

@keyframes hideLight{
  from {
    z-index: -1;
  }

  to {
    opacity: 1;
    z-index: 11;
  }
}`
      : "display: none"};
  inset: 22rem 0 0 0;
  cursor: pointer;

  @media only ${(props) => props.theme.breakpoints.xs} {
    inset: 24rem 0 0 0;
  }
`;

export const EasterText = styled.span`
  position: absolute;
  color: white;
  z-index: 11;
  inset: 17rem 0 0 0;
  height: max-content;
  text-align: center;
  font-weight: 500;
  display: ${(props) => (props.show ? "inline" : "none")};

  ${(props) =>
    props.show &&
    ` animation: showText 0s 0.5s ease-in-out forwards;
    opacity: 0;

@keyframes showText{
  from {
    z-index: -1;
  }

  to {
    opacity: 1;
    z-index: 11;
  }
}`};
`;
