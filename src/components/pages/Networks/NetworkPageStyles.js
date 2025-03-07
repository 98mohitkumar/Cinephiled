import { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp, mediaQuery } from "utils/mixins";

export const PostersGrid = css`
  display: grid;
  position: relative;
  width: 100%;
  margin-bottom: auto;
  grid-template-columns: ${({ $colCount }) => `repeat(${$colCount}, minmax(130px, 205px))`};
  justify-content: center;
  gap: ${theme.spacings.spacing12};
  max-height: 35vh;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 0%, transparent);
  pointer-events: none;
  user-select: none;
  transform: scale(1.01);

  &::before {
    content: "";
    inset: 0;
    opacity: 0.5;
    position: absolute;
    z-index: ${theme.zIndex[1]};
    background: ${`linear-gradient(200deg,${theme.colors.accentTertiary}, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`};
  }

  &:not(.alt-grid) {
    .poster-wrapper:not(:nth-child(odd)) {
      transform: translateY(-100px);
    }
  }

  ${mediaQuery({ breakpoint: "sm", type: "max" })} {
    grid-template-columns: repeat(4, minmax(80px, 1fr));
  }
`;

export const NetwrokDetailsWrapper = css`
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;

  & > * {
    grid-area: 1 / 1;
  }

  .logo-wrapper {
    width: ${cssClamp({ minSize: 150, maxSize: 200 })};
    position: relative;
    aspect-ratio: var(--aspectRatio);
  }
`;
