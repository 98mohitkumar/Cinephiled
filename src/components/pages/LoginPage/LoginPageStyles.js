import hexToRgba from "hex-to-rgba";
import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";

export const LoginCardStyles = css`
  width: min(500px, 100%);
`;

const backgroundAnimation = keyframes`
  from {
    transform: scale(1.6);
  }
  to {
    transform: scale(1);
  }
`;

export const pageWrapperStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 1;

  .background {
    filter: brightness(50%);
    z-index: ${theme.zIndex[1]};
    animation: ${backgroundAnimation} 1.5s ${theme.transitionTimings["ease-in-out-quint"]} forwards;
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
