import { MAX_WIDTH } from "globals/constants";
import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 500;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &.show-nav {
    transform: translateY(0%);
  }

  &.hide-nav {
    transform: translateY(-100%);
  }
`;

export const NavBar = styled.nav`
  display: flex;
  width: 100%;
  padding: 0.25rem 4.2vw;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(18 18 18 /0.95);
  z-index: 20;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: ${(props) => `linear-gradient(
    90deg,
    ${props.theme.colors.accent1},
    ${props.theme.colors.accent2},
    ${props.theme.colors.accent3},
    ${props.theme.colors.accent1}
  )`};
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 1.25rem;
    padding: 0rem 1.25rem;
  }
`;

export const Logo = styled.div`
  min-width: 50px;
  min-height: 30px;
  background: url("/navLogo.png") no-repeat center center / contain;

  @media only ${(props) => props.theme.breakpoints.sm} {
    min-height: 24px;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: -25px;

  .link {
    color: white;
    padding: 1rem 2rem;
    transition: color 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    @media ${(props) => props.theme.breakpoints.hover} {
      &:hover {
        color: ${(props) => props.theme.colors.accent2};
      }
    }
  }

  .active {
    color: ${(props) => props.theme.colors.accent2};
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    display: none;
  }
`;

export const MobileNav = styled.div`
  gap: 1rem;
  display: none;

  @media only ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    align-items: center;
  }
`;

export const Search = styled.div`
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.search-sm {
    padding: 0.5rem;
  }

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      color: ${(props) => props.theme.colors.accent2};
    }
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
  margin-left: 0.5rem;

  &::after,
  &::before {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    margin: auto;
    background: rgb(221, 221, 221);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.2s;
  }

  &::after {
    top: 13px;
  }

  &::before {
    bottom: 13px;
  }

  ${({ $active }) =>
    $active &&
    `
      &::after {
        transform: rotate(-45deg);
        top: 19px;
      }

      &::before {
        transform: rotate(45deg);
        bottom: 19px;
      }
    `}
`;

export const HamburgerMenu = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: none;
  top: 46px;
  left: 0;
  margin: auto;
  background-color: rgb(18 18 18 /0.95);
  backdrop-filter: blur(3px);
  z-index: -1;

  .menu-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .navlink {
      display: block;
      padding: 1rem 1.25rem;
      font-size: 2rem;
      font-weight: 600;
    }

    .active {
      color: ${(props) => props.theme.colors.accent2};
    }
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    display: block;
  }
`;

export const SearchModal = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  max-width: ${MAX_WIDTH}px;
  margin: auto;
  top: 70px;
  background: rgb(0 0 0 /0.9);
  backdrop-filter: blur(3px);

  @media only ${(props) => props.theme.breakpoints.sm} {
    top: 48px;
  }
`;
