import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp, hoverMediaQuery, transition } from "utils/mixins";

export const genreCardStyles = ({ backgroundColor, backgroundImage, backgroundBlendMode }) => css`
  display: grid;
  padding: ${theme.spacings.spacing2024};
  overflow: hidden;
  position: relative;
  place-items: end start;
  aspect-ratio: 1/0.5;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: ${backgroundColor};
    background-image: ${backgroundImage};
    background-blend-mode: ${backgroundBlendMode};
    transition: ${transition({ property: "transform", duration: 0.325, timingFunction: "snappy-out" })};
    transform: scale(1);
    transform-origin: 50px 50px;
  }

  ${hoverMediaQuery()} {
    &:hover {
      &::before {
        transform: scale(1.25);
      }
    }
  }

  .genre-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 20%;
    padding: ${theme.spacings.spacing2024};
    background-color: ${backgroundColor};
    background-image: ${backgroundImage};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: ${hexToRgba(theme.colors.white, 0.6)};
  }

  &::after {
    content: "";
    inset: 0;
    z-index: 5;
    position: absolute;
    background: url("/noise.svg"), linear-gradient(0deg, ${hexToRgba(theme.colors.black, 0.5)}, ${hexToRgba(theme.colors.white, 0.05)});
  }
`;

export const watchProvidersCard = css`
  display: flex;
  max-height: 500px;
  position: relative;
  align-items: center;

  .image-wrapper {
    position: relative;
    transform: rotate(-15deg);
    scale: 1.06;
    gap: ${cssClamp({ minSize: 4, maxSize: 10 })};
    min-width: 1400px;
    transition: ${transition({ property: "scale", duration: 0.325, timingFunction: "ease-in-out-quint" })};
  }

  &:after {
    content: "";
    inset: 0;
    background: ${`linear-gradient(90deg, ${theme.colors.neutral[950]}, transparent), linear-gradient(0deg, ${theme.colors.neutral[950]}, transparent)`};
    position: absolute;
    z-index: 1;
  }

  .CTA-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${theme.zIndex[100]};
    padding: ${theme.spacings.spacing2432};
  }

  ${hoverMediaQuery()} {
    &:hover {
      .image-wrapper {
        scale: 1.1;
      }
    }
  }
`;
