import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";
import { mediaQuery } from "utils/mixins";

export const hero = css`
  width: 100%;
  height: calc(100% + 5px);
  background: ${`linear-gradient(180deg, ${hexToRgba(theme.colors.black, 0.5)} 0%, ${theme.colors.black} 95%)`};
  backdrop-filter: blur(1px);
`;

const heroBannerAnimation = keyframes`
  to {
    transform:  translateY(-250px) skewY(-15deg) scale(1.4) rotateZ(20deg) translateX(10%);
  }
`;

export const heroBanner = css`
  position: absolute;
  inset: 0;
  filter: brightness(80%);
  z-index: ${theme.zIndex[1]};
  transform: translateY(-250px) scale(1.8) rotateZ(5deg) translateX(10%);
  will-change: transform;
  animation: ${heroBannerAnimation} 2s ${theme.transitionTimings["ease-in-out-quart"]} forwards;

  // to create masonary effect
  .poster-wrapper:nth-child(2),
  .poster-wrapper:nth-child(3n - 1) {
    transform: translateY(-100px);
  }

  ${mediaQuery({ breakpoint: "xs", type: "min" })} {
    .poster-wrapper:nth-child(2),
    .poster-wrapper:nth-child(3n - 1) {
      transform: none;
    }

    .poster-wrapper:nth-child(even) {
      transform: translateY(-100px);
    }
  }
`;
