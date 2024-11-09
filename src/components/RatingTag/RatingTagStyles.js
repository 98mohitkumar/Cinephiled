import { css } from "styled-components";
import { colors } from "tokens/colors";
import { cssClamp } from "utils/mixins";

export const ratingTagWrapperStyles = css`
  width: ${cssClamp({ minSize: 42, maxSize: 48 })};
  aspect-ratio: 1/1;
  position: absolute;
  border-radius: 50%;
  background-color: ${colors.black};
  display: grid;
  place-items: center;
  right: ${cssClamp({ minSize: 12, maxSize: 16 })};
  bottom: -22px;

  & > * {
    grid-area: 1 / 1;
  }
`;
