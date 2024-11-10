import { css } from "styled-components";
import { colors } from "tokens/colors";

export const ratingTagWrapperStyles = css`
  width: 44px;
  aspect-ratio: 1/1;
  position: absolute;
  border-radius: 50%;
  background-color: ${colors.black};
  display: grid;
  place-items: center;
  right: 14px;
  bottom: -22px;

  & > * {
    grid-area: 1 / 1;
  }
`;
