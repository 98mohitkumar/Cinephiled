import { css } from "styled-components";

import { theme } from "theme/theme";
import { hoverMediaQuery, transition } from "utils/mixins";

export const genreCardStyles = css`
  border-radius: ${theme.borderRadius.lg};
  padding: 24px;
  aspect-ratio: 1/0.5;
  position: relative;
  display: grid;
  place-items: center;
  transition: ${transition({
    property: "filter",
    duration: 0.25,
    timingFunction: "linear"
  })};
  background: ${`linear-gradient(200deg,${theme.colors.accentTertiary}, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`};
  overflow: hidden;

  &::after {
    content: "";
    inset: 0;
    background: linear-gradient(0deg, black 0%, transparent);
    opacity: 0.3;
    position: absolute;
    z-index: 1;
  }

  ${hoverMediaQuery()} {
    &:hover {
      filter: saturate(0);
    }
  }
`;
