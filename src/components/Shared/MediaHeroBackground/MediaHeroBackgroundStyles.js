import { css } from "styled-components";

import { theme } from "theme/theme";
import { mediaQuery } from "utils/mixins";

export const heroBackgroundStyles = css`
  --gradient-direction: 90deg;

  z-index: -2;
  inset: 0;
  height: 100%;
  max-height: 600px;
  min-width: 50%;
  position: absolute;
  margin-left: auto;
  aspect-ratio: 16 / 9;

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  &:before {
    content: "";
    z-index: 1;
    inset: 0;
    left: -20px;
    position: absolute;
    background: linear-gradient(
      var(--gradient-direction),
      #121212,
      rgba(18, 18, 18, 0.991) 6.67%,
      rgba(18, 18, 18, 0.964) 13.33%,
      rgba(18, 18, 18, 0.918) 20%,
      rgba(18, 18, 18, 0.853) 26.67%,
      rgba(18, 18, 18, 0.768) 33.33%,
      rgba(18, 18, 18, 0.668) 40%,
      rgba(18, 18, 18, 0.557) 46.67%,
      rgba(18, 18, 18, 0.443) 53.33%,
      rgba(18, 18, 18, 0.332) 60%,
      rgba(18, 18, 18, 0.232) 66.67%,
      rgba(18, 18, 18, 0.147) 73.33%,
      rgba(18, 18, 18, 0.082) 80%,
      rgba(18, 18, 18, 0.036) 86.67%,
      rgba(18, 18, 18, 0.009) 93.33%,
      rgba(18, 18, 18, 0)
    );
  }

  &:after {
    content: "";
    z-index: 1;
    inset: 0;
    bottom: -2px;
    position: absolute;
    background: ${`linear-gradient(0deg, ${theme.colors.black}, transparent 25%)`};
  }

  ${mediaQuery({ type: "max", breakpoint: "lg" })} {
    position: relative;

    &::after {
      display: none;
    }

    &:before {
      --gradient-direction: 0deg;
      left: 0;
      bottom: -10px;
    }
  }

  // this is the alternate UI when there is no backdrop available
  &.no-backdrop {
    --gradient-direction: 0deg;

    margin-left: unset;
    aspect-ratio: unset;
    width: 100%;

    ${mediaQuery({ type: "max", breakpoint: "lg" })} {
      position: absolute;
    }
  }
`;
