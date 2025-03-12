import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";

export const hero = css`
  width: 100%;
  height: calc(100% + 5px);
  background: ${`linear-gradient(180deg, ${hexToRgba(theme.colors.black, 0.5)} 0%, ${theme.colors.black} 95%)`};
`;

const heroBannerAnimation = keyframes`
  to {
    transform: translate(-70px, -325px) scale(1.2) rotateZ(-15deg);
  }
`;

const slideInRight = keyframes`
  to {
    transform: translateX(-150px);
  }
`;

const slideInLeft = keyframes`
  to {
    transform: translateX(0);
  }
`;

export const heroBanner = css`
  inset: 0;
  position: absolute;
  will-change: transform;
  filter: brightness(80%);
  z-index: ${theme.zIndex[1]};
  transform: translate(-70px, -325px) scale(1.6) rotateZ(-15deg);
  animation: ${heroBannerAnimation} 1.25s 0.325s ${theme.transitionTimings["ease-out-quint"]} forwards;
  object-position: center;

  .backdrop-wrapper {
    min-width: 260px;
    will-change: transform;
  }

  .backdrops-row:nth-child(even) {
    animation: ${slideInLeft} 1.25s 0.325s ${theme.transitionTimings["ease-out-quint"]} forwards;
  }

  .backdrops-row:nth-child(odd) {
    transform: translateX(150px);
    animation: ${slideInRight} 1.25s 0.325s ${theme.transitionTimings["ease-out-quint"]} forwards;
  }
`;
