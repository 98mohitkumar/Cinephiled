import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";
import { colors } from "tokens/colors";
import { transitionTimings, zIndexTokens } from "tokens/misc";

export const hero = css`
  width: 100%;
  height: calc(100% + 5px);
  background: ${`linear-gradient(180deg, ${hexToRgba(colors.black, 0.5)} 0%, ${colors.black} 95%)`};
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
  z-index: ${zIndexTokens[1]};
  transform: translateY(-150px) scale(1.5) rotate(3deg);
  will-change: transform;
  animation: ${heroBannerAnimation} 2s ${transitionTimings["ease-in-out-quart"]} forwards;
`;
