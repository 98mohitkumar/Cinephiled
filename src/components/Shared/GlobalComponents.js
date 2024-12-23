import hexToRgba from "hex-to-rgba";
import styled, { css } from "styled-components";

import { theme } from "theme/theme";
import { breakpointAsNumber } from "utils/helper";
import { hoverMediaQuery, transition, cssClamp, mediaQuery } from "utils/mixins";

export const mediaDetailsWrapper = css`
  min-height: ${cssClamp({ minSize: 400, maxSize: 700, minViewport: breakpointAsNumber("lg"), maxViewport: breakpointAsNumber("3xl") })};

  ${mediaQuery({ type: "max", breakpoint: "lg" })} {
    min-height: auto;
  }
`;

export const GenreTag = styled.div`
  display: grid;
  place-items: center;
  padding: ${theme.spacings.spacing4} ${theme.spacings.spacing16};
  border-radius: ${theme.borderRadius["3xl"]};
  border: 1px solid ${theme.colors.neutral[100]};
  background-color: ${hexToRgba(theme.colors.neutral[700], 0.75)};
  transition: ${transition({ duration: 0.325, property: "background-color", timingFunction: "in-out" })};

  ${hoverMediaQuery({ canHover: true })} {
    &:hover {
      background-color: ${theme.colors.neutral[900]};
    }
  }
`;
