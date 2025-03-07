import styled, { css, keyframes } from "styled-components";

import { theme } from "theme/theme";
import { breakpointAsNumber } from "utils/helper";
import { cssClamp, mediaQuery, transition } from "utils/mixins";

export const tabWrapperStyles = css`
  display: grid;
  margin-inline: auto;
  position: relative;
  grid-template-columns: ${({ $tabItemsCount }) => `repeat(${$tabItemsCount}, 1fr)`};
  max-width: 100%;
  width: min(
    ${({ $tabItemsCount }) => cssClamp({ minSize: 210 * $tabItemsCount, maxSize: 320 * $tabItemsCount, maxViewport: breakpointAsNumber("3xl") })},
    800px
  );
  border: 4px solid ${theme.colors.neutral[200]};
  background: ${theme.colors.neutral[200]};
  border-radius: ${theme.borderRadius["2xl"]};

  ${mediaQuery({ breakpoint: "xs", type: "max" })} {
    width: 100%;
  }
`;

export const activeHighlighter = css`
  z-index: ${theme.zIndex[1]};
  height: 100%;
  position: absolute;
  background: ${theme.colors.black};
  border-radius: ${theme.borderRadius.xl};
  width: ${({ $tabItemsCount }) => `${100 / $tabItemsCount}%`};
  transform: ${({ $activeItemIndex }) => `translateX(${$activeItemIndex <= 0 ? 0 : $activeItemIndex * 100}%)`};
  transition: ${transition({ property: "transform", duration: 0.325, timingFunction: "ease-in-out-quart" })};
`;

export const tabItemStyles = css`
  display: grid;
  place-items: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: ${theme.colors.black};
  z-index: ${theme.zIndex[2]};
  padding: ${cssClamp({ minSize: 10, maxSize: 16, maxViewport: breakpointAsNumber("3xl") })};

  &,
  & svg {
    transition: ${transition({ property: "color", duration: 0.4, timingFunction: "ease-in-out-quart" })};
  }

  &.active {
    color: ${theme.colors.white};
  }
`;

export const TabContainer = styled.div`
  width: ${`min(100%, ${theme.breakpoints.xl})`};

  &::-webkit-scrollbar {
    display: none;
  }

  /* for firefox */
  scrollbar-width: none;
`;

const tabAnimationKeyframes = keyframes`
  0% {
    transform: scalex(0%);
    opacity: 0;
  }
  100% {
    transform: scalex(100%);
    opacity: 1;
  }
`;

export const ActiveTabIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: 0;
  background: ${theme.colors.accentPrimary};
  z-index: 4;
  border-radius: 4px 4px 0px 0px;
  animation: ${tabAnimationKeyframes} 0.25s ${theme.transitionTimings["ease-in-out-quart"]} forwards;
`;
