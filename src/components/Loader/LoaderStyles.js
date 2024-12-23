import { css } from "styled-components";

import { theme } from "theme/theme";

export const loaderStyles = css`
  position: fixed;
  z-index: 9999;
  background: #121212;
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;

  &.small {
    position: static;
    background: transparent;

    .blob {
      --border-width: 1vmin;
      height: 15vmin;
    }
  }

  --aqua: #7fdbff;
  --blue: #0074d9;
  --navy: #001f3f;
  --teal: #39cccc;
  --green: #2ecc40;
  --olive: #3d9970;
  --lime: #01ff70;

  --yellow: #ffdc00;
  --orange: #ff851b;
  --red: #ff4136;
  --fuchsia: #f012be;
  --purple: #b10dc9;
  --maroon: #85144b;

  --white: #ffffff;
  --silver: #dddddd;
  --gray: #aaaaaa;
  --black: #111111;

  .stack {
    display: grid;
    grid-template-areas: "stack";
  }

  .blobs {
    display: grid;
    grid-template-areas: "stack";
    position: relative;
    animation: spin infinite 1.75s ${theme.transitionTimings["ease-in-out-back"]};
    grid-area: stack;
  }

  .blob {
    --border-radius: 115% 140% 145% 110% / 125% 140% 110% 125%;
    --border-width: 2.25vmin;

    aspect-ratio: 1;
    display: block;
    grid-area: stack;
    background-size: calc(100% + var(--border-width) * 2);
    background-repeat: no-repeat;
    background-position: center;
    border: var(--border-width) solid transparent;
    border-radius: var(--border-radius, 50%);
    mask-image: linear-gradient(transparent, transparent), linear-gradient(black, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
    mix-blend-mode: screen;
    height: 35vmin;
    filter: blur(1vmin);

    &:nth-child(1) {
      background-color: var(--blue);
      background-image: linear-gradient(var(--blue), var(--teal), var(--blue));
      rotate: 30deg;
      scale: 1.03;
    }

    &:nth-child(2) {
      background-color: var(--red);
      background-image: linear-gradient(var(--red), var(--orange), var(--red));
      rotate: 60deg;
      scale: 0.95;
    }

    &:nth-child(3) {
      background-color: var(--olive);
      background-image: linear-gradient(var(--olive), var(--lime), var(--olive));
      rotate: 90deg;
      scale: 0.97;
    }

    &:nth-child(4) {
      background-color: var(--purple);
      background-image: linear-gradient(var(--purple), var(--maroon), var(--purple));
      rotate: 120deg;
      scale: 1.02;
    }
  }

  @keyframes spin {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
`;
