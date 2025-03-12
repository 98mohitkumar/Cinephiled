import hexToRgba from "hex-to-rgba";
import styled, { css, keyframes } from "styled-components";

import { theme } from "theme/theme";
import { breakpointAsNumber } from "utils/helper";
import { hoverMediaQuery, transition, cssClamp, mediaQuery } from "utils/mixins";

export const mediaDetailsWrapper = css`
  min-height: ${cssClamp({ minSize: 400, maxSize: 700, minViewport: breakpointAsNumber("lg"), maxViewport: breakpointAsNumber("3xl") })};

  &.no-min-height {
    min-height: unset;
  }

  &.blank {
    min-height: ${cssClamp({ minSize: 300, maxSize: 450 })};
  }

  ${mediaQuery({ type: "max", breakpoint: "lg" })} {
    min-height: auto;
  }
`;

export const GenreTag = styled.div`
  display: grid;
  place-items: center;
  padding: ${theme.spacings.spacing6} ${theme.spacings.spacing16};
  border-radius: ${theme.borderRadius["3xl"]};
  background-color: ${hexToRgba(theme.colors.neutral[600], 0.75)};
  transition: ${transition({ duration: 0.325, property: "background-color", timingFunction: "in-out" })};

  ${hoverMediaQuery({ canHover: true })} {
    &:hover {
      background-color: ${theme.colors.neutral[800]};
    }
  }
`;

export const mediaLogo = ({ aspectRatio }) => css`
  max-height: 160px;
  aspect-ratio: ${aspectRatio};
  max-width: 480px;
`;

export const TMDBCredit = styled.div`
  width: ${cssClamp({ minSize: 48, maxSize: 64 })};
  aspect-ratio: 100/43;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;
`;

export const reviewStyles = css`
  blockquote {
    font-style: italic;
    margin: 0;
    opacity: 0.8;
    padding: 0 1em;
    border-left: 0.25em solid ${theme.colors.neutral[100]};
  }

  .content-wrapper {
    word-break: break-word;
  }
`;

const heroBannerAnimation = keyframes`
  to {
    transform: translate(-70px, -325px) scale(1.2) rotateZ(-15deg);
  }
`;

const slideInLeft = keyframes`
  to {
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  to {
    transform: translateX(-150px);
  }
`;

export const heroBanner = css`
  inset: 0;
  position: absolute;
  will-change: transform;
  filter: brightness(80%);
  z-index: ${theme.zIndex[1]};
  transform: translate(-70px, -325px) scale(1.4) rotateZ(-15deg);
  animation: ${heroBannerAnimation} 1.25s 0.35s ${theme.transitionTimings["ease-out-quint"]} forwards;
  object-position: center;

  .backdrop-wrapper {
    min-width: 260px;
    will-change: transform;
  }

  .backdrops-row:nth-child(even) {
    transform: translateX(-200px);
    animation: ${slideInLeft} 1.25s 0.25s ${theme.transitionTimings["ease-out-quint"]} forwards;
  }

  .backdrops-row:nth-child(odd) {
    transform: translateX(50px);
    animation: ${slideInRight} 1.25s 0.25s ${theme.transitionTimings["ease-out-quint"]} forwards;
  }
`;

export const productionHeroWrapper = css`
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;
  height: ${cssClamp({ minSize: 400, maxSize: 500 })};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: ${theme.zIndex[5]};
    bottom: -2px;
    background: ${`linear-gradient(180deg, ${hexToRgba(theme.colors.black, 0.5)} 0%, ${theme.colors.black} 95%)`};
  }

  & > * {
    grid-area: 1 / 1;
  }

  .logo-wrapper {
    position: relative;
    width: ${cssClamp({ minSize: 200, maxSize: 250 })};
    aspect-ratio: var(--aspectRatio);
  }
`;
