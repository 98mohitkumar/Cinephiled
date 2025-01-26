import { css } from "styled-components";

import { theme } from "theme/theme";

export const ratingTagWrapperStyles = css`
  width: 44px;
  aspect-ratio: 1/1;
  position: absolute;
  border-radius: 50%;
  background-color: ${theme.colors.black};
  display: grid;
  place-items: center;
  right: 14px;
  bottom: -22px;
  z-index: ${theme.zIndex[10]};

  & > * {
    grid-area: 1 / 1;
  }
`;
