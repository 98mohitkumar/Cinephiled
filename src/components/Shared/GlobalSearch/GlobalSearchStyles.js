import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";

import { theme } from "theme/theme";
import { hoverMediaQuery, mediaQuery } from "utils/mixins";

export const searchStyles = css`
  width: min(100%, 840px);
  margin: auto;

  .border-animated {
    position: relative;
    height: 46px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      height: 1px;
      border-radius: 1px;
      opacity: 0.8;
      background: ${theme.colors.neutral[300]};
      background-image: linear-gradient(90deg, ${theme.colors.neutral[500]}, ${theme.colors.white}, ${theme.colors.neutral[500]});
      background-position: -1500px 0px;
      animation: shift 1.5s cubic-bezier(0.39, 0.58, 0.57, 1) infinite;

      @keyframes shift {
        from {
          background-position: -700px 0;
        }
        to {
          background-position: 700px 0;
        }
      }
    }
  }

  .suggestions {
    position: absolute;
    width: 100%;
    background-color: ${theme.colors.neutral[200]};
    max-height: 240px;
    overflow-y: scroll;
    border-radius: 4px;

    ::-webkit-scrollbar {
      width: 4px;
    }

    & > a:last-child > div:last-child {
      border: none;
    }

    ${mediaQuery({ breakpoint: "sm", type: "max" })} {
      max-height: 200px;
    }
  }
`;

export const userInput = css`
  width: 100%;
  border: none;
  box-shadow: none;
  position: relative;
  border-radius: 0;
  background-color: transparent;

  &::placeholder {
    color: ${theme.colors.neutral[200]};
  }

  &:focus-visible {
    border-radius: 4px;
    background-color: transparent;
    box-shadow: none;
    color: white;
    border-color: white;
    outline: 2px solid transparent;
  }
`;

export const searchCTA = css`
  display: grid;
  place-items: center;
  background: ${`linear-gradient(145deg, ${theme.colors.accentSecondary}, ${theme.colors.accentPrimary})`};
  color: ${theme.colors.black};
`;

export const searchItem = css`
  border-bottom: 1px solid ${theme.colors.black};
  transition: background-color 0.1s ease-in-out;

  ${hoverMediaQuery()} {
    &:hover {
      background-color: ${hexToRgba(theme.colors.black, 0.1)};
    }
  }

  &:focus {
    background-color: ${hexToRgba(theme.colors.black, 0.1)};
  }
`;
