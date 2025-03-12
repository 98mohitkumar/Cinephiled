import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp } from "utils/mixins";

export const NetwrokDetailsWrapper = css`
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  height: ${cssClamp({ minSize: 400, maxSize: 500 })};
  background: ${`linear-gradient(180deg, ${hexToRgba(theme.colors.black, 0.5)} 0%, ${theme.colors.black} 95%)`};

  & > * {
    grid-area: 1 / 1;
  }

  .logo-wrapper {
    position: relative;
    width: ${cssClamp({ minSize: 150, maxSize: 200 })};
    aspect-ratio: var(--aspectRatio);
  }
`;
