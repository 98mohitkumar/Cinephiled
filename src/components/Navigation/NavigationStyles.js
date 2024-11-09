import * as hexToRgba from "hex-to-rgba";
import styled, { css } from "styled-components";
import { MAX_WIDTH } from "globals/constants";
import { colors } from "tokens/colors";
import { spacingTokens } from "tokens/spacings";
import { hoverMediaQuery, mediaQuery, transition } from "utils/mixins";

export const headerStyles = css`
  top: 0;
  width: 100%;
  z-index: 500;
  position: sticky;
  transition: ${transition({ property: "transform", duration: 0.3, timingFunction: "in-out" })};

  &.show-nav {
    transform: translateY(0%);
  }

  &.hide-nav {
    transform: translateY(-100%);
  }
`;

export const navBarStyles = css`
  background-color: ${hexToRgba(colors.black, 0.95)};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: ${`linear-gradient(
    90deg,
    ${colors.accentTertiary},
    ${colors.accentPrimary},
    ${colors.accentSecondary},
    ${colors.accentTertiary}
  )`};
  }
`;

export const Logo = styled.div`
  min-width: 50px;
  min-height: 30px;
  background: url("/navLogo.png") no-repeat center center / contain;

  ${mediaQuery({ breakpoint: "sm", type: "max" })} {
    min-height: 24px;
  }
`;

export const navLinksStyles = css`
  .link {
    color: white;
    padding: ${spacingTokens.spacing16} ${spacingTokens.spacing32};
    transition: ${transition({ property: "color", duration: 0.35, timingFunction: "in-out" })};

    ${hoverMediaQuery()} {
      &:hover {
        color: ${colors.accentPrimary};
      }
    }
  }

  .active {
    color: ${colors.accentPrimary};
  }
`;

export const HamburgerIcon = styled.div`
  min-width: 32px;
  min-height: 40px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: ${spacingTokens.spacing8};

  &::after,
  &::before {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    margin: auto;
    background: ${colors.neutral[200]};
    transition: ${transition({ property: "all", duration: 0.3, timingFunction: "ease-in-expo", delay: 0.2 })};
  }

  &::after {
    top: 13px;
  }

  &::before {
    bottom: 13px;
  }

  &.active {
    &::after {
      transform: rotate(-45deg);
      top: 19px;
    }

    &::before {
      transform: rotate(45deg);
      bottom: 19px;
    }
  }
`;

export const hamburgerMenu = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 56px;
  left: 0;
  margin: auto;
  background-color: ${hexToRgba(colors.black, 0.95)};
  backdrop-filter: blur(3px);
  z-index: -1;

  .active {
    color: ${colors.accentPrimary};
  }
`;

export const searchOverlayBackdrop = css`
  width: 100%;
  height: 100vh;
  position: fixed;
  max-width: ${MAX_WIDTH}px;
  margin: auto;
  background: ${hexToRgba(colors.black, 0.9)};
  backdrop-filter: blur(3px);
`;
