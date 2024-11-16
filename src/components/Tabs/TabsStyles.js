import styled, { css } from "styled-components";
import { colors } from "tokens/colors";
import { borderRadiusTokens, zIndexTokens } from "tokens/misc";
import { cssClamp, mediaQuery, transition } from "utils/mixins";

export const tabWrapperStyles = css`
  display: grid;
  margin-inline: auto;
  position: relative;
  grid-template-columns: ${({ $tabItemsCount }) => `repeat(${$tabItemsCount}, 1fr)`};
  width: ${cssClamp({ minSize: 400, maxSize: 630 })};
  border: 4px solid ${colors.neutral[200]};
  background: ${colors.neutral[200]};
  border-radius: ${borderRadiusTokens["2xl"]};

  ${mediaQuery({ breakpoint: "xs", type: "max" })} {
    width: 100%;
  }
`;

export const activeHighlighter = css`
  z-index: ${zIndexTokens[1]};
  height: 100%;
  position: absolute;
  background: ${colors.black};
  border-radius: ${borderRadiusTokens.xl};
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
  color: ${colors.black};
  z-index: ${zIndexTokens[2]};
  transition: ${transition({ property: "color", duration: 0.4, timingFunction: "ease-in-out-quart" })};

  &.active {
    color: ${colors.white};
  }
`;

export const TabContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow-x: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.9);

  &::-webkit-scrollbar {
    display: none;
  }

  /* for firefox */
  scrollbar-width: none;

  @media only ${({ theme }) => theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;

export const ActiveTabIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.accent2};
  z-index: 4;
  animation: pop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
  border-radius: 4px 4px 0px 0px;

  @keyframes pop {
    0% {
      transform: scalex(0%);
    }
    100% {
      transform: scalex(100%);
    }
  }
`;

export const TabSelector = styled.div`
  padding: 1rem 2rem;
  width: ${({ $count }) => `${100 / $count}%`};
  display: grid;
  place-items: center;
  color: ${({ $active }) => ($active ? "white" : "#ababab")};
  font-weight: 600;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  min-width: 120px;
  user-select: none;

  min-width: max-content;
`;
