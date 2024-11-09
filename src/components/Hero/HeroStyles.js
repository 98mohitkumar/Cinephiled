import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";
import { colors } from "tokens/colors";
import { transitionTimings, zIndexTokens } from "tokens/misc";

export const hero = css`
  width: 100%;
  height: calc(100% + 5px);
  background: ${`linear-gradient(180deg, ${hexToRgba(colors.black, 0.5)} 0%, ${colors.black} 95%)`};
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
  animation: hero-banner 2s ${transitionTimings["ease-in-out-quart"]} forwards;

  @keyframes hero-banner {
    to {
      transform: translateY(-150px) scale(1.1) rotate(7deg);
    }
  }
`;
