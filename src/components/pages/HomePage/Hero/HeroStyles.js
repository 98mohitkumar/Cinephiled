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
    transform: translateY(-150px) scale(1.1) rotate(7deg);
  }
`;

export const heroBanner = css`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  filter: brightness(70%);
  z-index: ${theme.zIndex[1]};
  transform: translateY(-150px) scale(1.5) rotate(3deg);
  will-change: transform;
  animation: ${heroBannerAnimation} 2s ${theme.transitionTimings["ease-in-out-quart"]} forwards;
`;
