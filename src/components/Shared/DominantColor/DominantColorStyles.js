import { css } from "styled-components";

import { theme } from "theme/theme";

export const colorOverlayStyles = css`
  background-image: linear-gradient(90deg, #ccbdb4, #392a28d6);
  background-image: ${({ $palette, $angle }) => `linear-gradient(${$angle || "90deg"}, ${$palette?.[0]}, ${$palette?.[1] + "8e"})`};
`;

export const tintedColorOverlayStyles = css`
  background-image: ${({ $angle }) => `linear-gradient(${$angle || "180deg"}, #ccbdb463, #392a28d6, ${theme.colors.black})`};
  background-image: ${({ $palette, $angle }) => `linear-gradient(${$angle || "180deg"}, ${$palette?.[0] + "94"}, ${theme.colors.black})`};
`;
