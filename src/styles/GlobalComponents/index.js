import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 500px;

  .overflow-wrapper {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 400px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1.25rem;
  line-height: 1.2;
  border-radius: 8px;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  background: rgb(221, 221, 221);
  color: #121212;
  white-space: nowrap;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: rgb(221, 221, 221, 0.9);
  }

  &.secondary {
    background-color: transparent;
    border: 1px solid rgb(81 81 81 / 0.8);
    color: rgb(221, 221, 221);

    &:hover {
      background-color: rgb(221, 221, 221, 0.25);
    }
  }

  &.danger {
    color: rgb(220 38 38);
    background: rgb(127 29 29 / 0.2);
    border: 1px solid #dc2626;

    &:hover {
      background-color: rgb(127 29 29 / 0.4);
    }
  }

  ${({ loading }) => loading && "pointer-events: none"};

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 1rem;
    padding: 10px 16px;
  }

  &.mediaCTA {
    font-size: 0.95rem;
    height: auto;
    padding: 10px;
  }
`;

export const AboutBackground = styled.div`
  position: absolute;
  inset: 0;
  filter: brightness(60%);
  z-index: -1;

  animation: about 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards;

  &.loginPage {
    filter: unset;
    animation: loginPage 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  }

  @keyframes about {
    from {
      transform: scale(1.6);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes loginPage {
    from {
      transform: scale(1.3);
    }
    to {
      transform: scale(1);
    }
  }
`;

export const AboutContainer = styled.div`
  padding: 0rem 5vw;
  background-color: rgb(18 18 18 /0.95);
  flex-grow: 1;
  position: relative;

  h1 {
    margin: 28px 0px;
  }

  .bg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    margin: auto;
    overflow: hidden;
    z-index: -1;
  }
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

  &:not(.index-page) {
    min-height: 80vh;
    display: grid;
    place-items: center;
  }
`;

export const HeroDetailsContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 64px 4.2vw;

  @media only ${(props) => props.theme.breakpoints.lg} {
    padding: 40px 32px;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 32px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 30px 20px;
  }

  &.person-details {
    min-height: auto;
  }
`;

export const HeroBgContainer = styled.div`
  inset: 0;
  z-index: -1;
  overflow: hidden;

  @media only ${(props) => props.theme.breakpoints.ip} {
    bottom: 320px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    bottom: 50%;
  }
`;

export const HeroBg = styled.div`
  inset: 0;
  animation: backdrop 4s cubic-bezier(0.77, 0, 0.18, 1) forwards;

  @keyframes backdrop {
    from {
      opacity: 0;
      transform: scale(1.1);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const HeroImg = styled.div`
  width: 17rem;
  aspect-ratio: 1/1.54;
  border-radius: 12px;
  box-shadow: 0 0 2rem rgb(12 12 12 /0.4);
  overflow: hidden;
  animation: heroImg 1.5s cubic-bezier(0.77, 0, 0.18, 1) forwards;

  &.no-shadow {
    box-shadow: none;
  }

  @keyframes heroImg {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 12rem;
  }
`;

export const DetailsHeroWrap = styled.div`
  display: grid;
  grid-template-columns: 17rem 1fr;
  min-height: 35rem;
  gap: 0rem 3rem;

  &.no-grid {
    display: block;
    min-height: auto;
    margin-top: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: 280px 1fr;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const FactsFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  & > :nth-child(1) {
    font-weight: normal;
  }

  & > :nth-child(2) {
    font-weight: bold;
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    font-size: 18px;
  }
`;

export const NoDataText = styled.p`
  font-size: clamp(1.25rem, 2.8vw, 2rem);
  color: rgb(163 163 163);
`;

export const BadQuery = styled.h1`
  font-weight: bold;
  font-size: calc(2rem + 4vw);
  text-align: center;
`;

export const HeroImgWrapper = styled.div`
  width: 100%;
  height: max-content;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 1.75rem 0rem;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 0rem;
    grid-template-columns: 192px;
    place-items: flex-end flex-start;
    gap: 1.5rem;

    & > div:first-child {
      grid-column: 1 / span 2;

      @media only ${(props) => props.theme.breakpoints.sm} {
        grid-column: 1 / 2;
      }
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 1.5rem;
  }
`;
export const SocialMediaLinksWrapper = styled.div`
  width: 17rem;
  height: 45px;
  color: #ebebeb;
  display: ${(props) => (props.notShow ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  gap: 3rem;
  transition: color 0.2s ease-in-out;

  @media only ${(props) => props.theme.breakpoints.ip} {
    justify-content: flex-start;
    width: fit-content;
    gap: 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 2.5rem;
  }

  a.link:hover {
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

export const AboutCreditsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 26px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 80%;
  }
`;

export const Loader = styled.div`
  width: 12vw;
  aspect-ratio: 1/1;
  position: absolute;
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;
  background: Url(/Images/Loader.svg) no-repeat center center / contain;

  &.small {
    width: 100px;
    position: static;
  }
`;

export const SeasonExpandedContainer = styled.div`
  width: clamp(350px, 90vw, 1400px);
  padding: 3rem 4.2vw;
  margin-bottom: auto;

  @media only ${(props) => props.theme.breakpoints.xs} {
    width: 100%;
    padding: 1.25rem;
  }
`;

export const SeasonShowcaseWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
  align-items: center;

  @media only ${(props) => props.theme.breakpoints.ip} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  &.episodesBox:not(:last-of-type) {
    margin-bottom: 80px;

    @media only ${(props) => props.theme.breakpoints.ip} {
      margin-bottom: 50px;
    }
  }
`;

export const SeasonShowcaseImg = styled.div`
  width: 15rem;
  aspect-ratio: 2/3;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
  overflow: hidden;
  align-self: flex-start;

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 12rem;
  }
`;

export const SeasonEpisodesWrapper = styled.div`
  width: 100%;
  padding-top: 4rem;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding-top: 3rem;
  }
`;

export const SeasonCommonOverview = styled.p`
  font-size: 1.15rem;
  margin-top: 10px;
  margin-bottom: 0px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1rem;
  }

  &.clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }
`;

export const EpisodeImg = styled.div`
  min-width: 15rem;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  align-self: flex-start;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
`;

export const TrWrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  margin: 0.75rem 0rem;
  gap: 1rem 1.5rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 1rem 1.25rem;
  }
`;

export const Pill = styled.div`
  width: 50px;
  height: 27px;
  border-radius: 20px;
  background-color: rgb(221 221 221);
  color: #121212;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 45px;
    height: 25px;
  }

  &.info {
    width: auto;
    padding-left: 12px;
    padding-right: 6px;
    line-height: 0.9;
    font-family: "Manrope", sans-serif;
  }
`;

export const EpisodeInfoWrapper = styled.div`
  padding: 2rem 4.2vw;
  margin-bottom: auto;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 6.5vw 1.25rem;
  }
`;

export const EpisodeShowCaseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  align-items: flex-start;

  @media only ${(props) => props.theme.breakpoints.ip} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .image-wrapper {
    position: relative;
    min-width: 20rem;
    aspect-ratio: 1.776 / 1;
    border-radius: 12px;
    overflow: hidden;
    align-self: flex-start;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
  }
`;

export const LayoutContainer = styled.section`
  width: 100%;
  padding: 32px 4.2vw;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1.25rem;

    &.index-page {
      padding: 0px 20px 20px 20px;
    }
  }
`;

export const ModulesWrapper = styled.div`
  width: 100%;
  padding: 0px 4.2vw 32px;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0rem 1.25rem 1.25rem;
  }
`;
