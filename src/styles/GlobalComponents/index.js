import styled from "styled-components";
import { spacingTokens } from "tokens/spacings";
import { cssClamp } from "utils/mixins";

// redundant
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
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;

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
    color: #dc2626;
    background: rgb(127 29 29 / 0.2);
    border: 1px solid #dc2626;

    &:hover {
      background-color: rgb(127 29 29 / 0.4);
    }
  }

  ${({ loading }) => loading && "pointer-events: none"};

  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
    padding: 10px 16px;
  }

  &.mediaCTA {
    font-size: 0.95rem;
    height: auto;
    padding: 10px;
  }
`;

// redundant
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
  padding: 64px 4.2vw;

  @media only ${({ theme }) => theme.breakpoints.lg} {
    padding: 40px 32px;
  }

  @media only ${({ theme }) => theme.breakpoints.ip} {
    padding: 32px;
  }

  @media only ${({ theme }) => theme.breakpoints.xs} {
    padding: 30px 20px;
  }

  &.person-details {
    min-height: auto;
  }
`;

export const HeroBgContainer = styled.div`
  inset: 0;
  z-index: -1;
  min-height: 400px;
  isolation: isolate;

  @media only ${({ theme }) => theme.breakpoints.ip} {
    bottom: 45%;
  }

  @media only ${({ theme }) => theme.breakpoints.xs} {
    bottom: 60%;
  }
`;

export const HeroBg = styled.div`
  inset: 0;
  overflow: hidden;

  img {
    animation: backdrop 4s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  }

  @keyframes backdrop {
    from {
      opacity: 0;
      transform: scale(1.4);
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

  @media only ${({ theme }) => theme.breakpoints.ip} {
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

  @media only ${({ theme }) => theme.breakpoints.lg} {
    grid-template-columns: 280px 1fr;
  }

  @media only ${({ theme }) => theme.breakpoints.ip} {
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

  @media only ${({ theme }) => theme.breakpoints.ip} {
    font-size: 18px;
  }
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

  @media only ${({ theme }) => theme.breakpoints.ip} {
    padding: 0rem;
    grid-template-columns: 192px;
    place-items: flex-end flex-start;
    gap: 1.5rem;
  }

  @media only ${({ theme }) => theme.breakpoints.xs} {
    gap: 1.5rem;
  }
`;
export const SocialMediaLinksWrapper = styled.div`
  width: 17rem;
  height: 45px;
  color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  gap: 3rem;
  transition: color 0.2s ease-in-out;

  @media only ${({ theme }) => theme.breakpoints.ip} {
    justify-content: flex-start;
    width: fit-content;
    gap: 3rem;
  }

  @media only ${({ theme }) => theme.breakpoints.xs} {
    gap: 2.5rem;
  }

  a.link:hover {
    color: ${({ theme }) => theme.colors.accent2};
  }
`;

export const LoaderContainer = styled.div`
  position: fixed;
  z-index: 9999;
  background: #121212;
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;

  &.small {
    width: 100px;
    position: static;
    background: transparent;
  }

  .loading-wrapper {
    --uib-size: 50px;
    --uib-color: white;
    --uib-speed: 1.5s;
    --dot-size: calc(var(--uib-size) * 0.14);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
    animation: smoothRotate calc(var(--uib-speed) * 1.8) linear infinite;
  }

  .dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    width: 100%;
    animation: rotate var(--uib-speed) ease-in-out infinite;
  }

  .dot::before {
    content: "";
    height: var(--dot-size);
    width: var(--dot-size);
    border-radius: 50%;
    background-color: var(--uib-color);
    transition: background-color 0.3s ease;
  }

  .dot:nth-child(2),
  .dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.835 * 0.5);
  }

  .dot:nth-child(3),
  .dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.668 * 0.5);
  }

  .dot:nth-child(4),
  .dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.501 * 0.5);
  }

  .dot:nth-child(5),
  .dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.334 * 0.5);
  }

  .dot:nth-child(6),
  .dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.167 * 0.5);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    65%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes smoothRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SeasonExpandedContainer = styled.div`
  width: clamp(350px, 90vw, 1400px);
  padding: 3rem 4.2vw;
  margin-bottom: auto;

  @media only ${({ theme }) => theme.breakpoints.xs} {
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

  @media only ${({ theme }) => theme.breakpoints.ip} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  &.episodesBox:not(:last-of-type) {
    margin-bottom: 80px;

    @media only ${({ theme }) => theme.breakpoints.ip} {
      margin-bottom: 50px;
    }
  }
`;

export const SeasonShowcaseImg = styled.div`
  min-width: 15rem;
  aspect-ratio: 2/3;
  border-radius: 12px;
  box-shadow:
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
  overflow: hidden;
  align-self: flex-start;

  @media only ${({ theme }) => theme.breakpoints.ip} {
    width: 12rem;
  }
`;

export const SeasonEpisodesWrapper = styled.div`
  width: 100%;
  padding-top: 4rem;

  @media only ${({ theme }) => theme.breakpoints.sm} {
    padding-top: 3rem;
  }
`;

export const SeasonCommonOverview = styled.p`
  font-size: 1.15rem;
  margin-top: 10px;
  margin-bottom: 0px;

  @media only ${({ theme }) => theme.breakpoints.xs} {
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
  box-shadow:
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
    rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
`;

export const TrWrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  margin: 0.75rem 0rem;
  gap: 1rem 1.5rem;

  @media only ${({ theme }) => theme.breakpoints.xs} {
    gap: 1rem 1.25rem;
  }
`;

export const Pill = styled.div`
  width: 50px;
  height: 27px;
  border-radius: 20px;
  background-color: rgb(221 221 221);
  color: #121212;
  font-family: ${({ theme }) => theme.fonts.montserrat};
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only ${({ theme }) => theme.breakpoints.sm} {
    width: 45px;
    height: 25px;
  }

  &.info {
    width: auto;
    padding-left: 12px;
    padding-right: 6px;
    line-height: 0.9;
    font-family: ${({ theme }) => theme.fonts.manrope};
  }
`;

export const EpisodeInfoWrapper = styled.div`
  padding: 2rem 4.2vw;
  margin-bottom: auto;

  @media only ${({ theme }) => theme.breakpoints.xs} {
    padding: 6.5vw 1.25rem;
  }
`;

export const EpisodeShowCaseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3rem;
  align-items: flex-start;

  @media only ${({ theme }) => theme.breakpoints.ip} {
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
    box-shadow:
      rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
      rgba(0, 0, 0, 0.12) 0px 1px 10px 0px,
      rgba(0, 0, 0, 0.2) 0px 2px 4px -1px;
  }
`;

// redundant
export const LayoutContainer = styled.section`
  width: 100%;
  padding-inline: ${spacingTokens.spacing2064};
`;

// redundant
export const ModulesWrapper = styled.div`
  width: 100%;
  padding: 0px 4.2vw 32px;

  @media only ${({ theme }) => theme.breakpoints.xs} {
    padding: 0rem 1.25rem 1.25rem;
  }
`;

export const TMDBCredit = styled.div`
  width: ${cssClamp({ minSize: 48, maxSize: 64 })};
  aspect-ratio: 100/43;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;
`;
