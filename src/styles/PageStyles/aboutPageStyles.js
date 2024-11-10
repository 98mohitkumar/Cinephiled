import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";
import { colors } from "tokens/colors";
import { transitionTimings, zIndexTokens } from "tokens/misc";

const aboutAnimation = keyframes`
  from {
    transform: scale(1.6);
  }
  to {
    transform: scale(1);
  }
`;

export const pageBackgroundStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .background {
    filter: brightness(50%);
    z-index: ${zIndexTokens[1]};
    animation: ${aboutAnimation} 2s ${transitionTimings["ease-in-out-quart"]} forwards;
  }

  &::before {
    content: "";
    inset: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: ${zIndexTokens[2]};
    background: ${hexToRgba(colors.black, 0.9)};
  }
`;
