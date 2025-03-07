import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";

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
  flex: 1;

  .background {
    filter: brightness(50%);
    z-index: ${theme.zIndex[1]};
    animation: ${aboutAnimation} 2s ${theme.transitionTimings["ease-in-out-quart"]} forwards;
  }

  &::before {
    content: "";
    inset: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: ${theme.zIndex[2]};
    background: ${hexToRgba(theme.colors.black, 0.9)};
  }
`;
