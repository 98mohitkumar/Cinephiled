import { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp } from "utils/mixins";

export const ratingTagWrapperStyles = css`
  width: ${cssClamp({ maxSize: 44, minSize: 40 })};
  padding: 5px;
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
