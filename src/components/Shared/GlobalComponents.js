import hexToRgba from "hex-to-rgba";
import styled, { css } from "styled-components";

import { theme } from "theme/theme";
import { breakpointAsNumber } from "utils/helper";
import { hoverMediaQuery, transition, cssClamp, mediaQuery } from "utils/mixins";

export const mediaDetailsWrapper = css`
  min-height: ${cssClamp({ minSize: 400, maxSize: 700, minViewport: breakpointAsNumber("lg"), maxViewport: breakpointAsNumber("3xl") })};

  &.no-min-height {
    min-height: unset;
  }

  &.blank {
    min-height: ${cssClamp({ minSize: 300, maxSize: 450 })};
  }

  ${mediaQuery({ type: "max", breakpoint: "lg" })} {
    min-height: auto;
  }
`;

export const GenreTag = styled.div`
  display: grid;
  place-items: center;
  padding: ${theme.spacings.spacing6} ${theme.spacings.spacing16};
  border-radius: ${theme.borderRadius["3xl"]};
  background-color: ${hexToRgba(theme.colors.neutral[600], 0.75)};
  transition: ${transition({ duration: 0.325, property: "background-color", timingFunction: "in-out" })};

  ${hoverMediaQuery({ canHover: true })} {
    &:hover {
      background-color: ${theme.colors.neutral[800]};
    }
  }
`;

export const mediaLogo = ({ aspectRatio }) => css`
  max-height: 160px;
  aspect-ratio: ${aspectRatio};
  max-width: 480px;
`;

export const TMDBCredit = styled.div`
  width: ${cssClamp({ minSize: 48, maxSize: 64 })};
  aspect-ratio: 100/43;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;
`;

export const reviewStyles = css`
  blockquote {
    font-style: italic;
    margin: 0;
    opacity: 0.8;
    padding: 0 1em;
    border-left: 0.25em solid ${theme.colors.neutral[100]};
  }

  .content-wrapper {
    word-break: break-word;
  }
`;
