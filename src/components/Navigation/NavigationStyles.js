import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 500;
`;

export const NavBar = styled.nav`
  display: flex;
  width: 100%;
  padding: 0.25rem 4.2vw;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(18 18 18 /0.95);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 20;

  &.show-nav {
    transform: translateY(0%);
  }

  &.hide-nav {
    transform: translateY(-100%);
  }

  &::after {
    content: '';
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
  background: url('/navLogo.png') no-repeat center center / contain;
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;

  .link {
    color: white;
    padding: 1rem 2rem;
    transition: all 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);

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
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.search-sm {
    padding: 0.5rem 1rem;
  }

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      color: ${(props) => props.theme.colors.accent2};
    }
  }
`;

export const HamburgerIcon = styled.div`
  min-width: 35px;
  min-height: 40px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    margin: auto;
    background: rgb(221, 221, 221);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    top: 12px;
  }

  &::before {
    bottom: 12px;
  }

  ${({ active }) =>
    active &&
    `
      &::after {
        transform: rotate(-225deg);
        top: 19px;
      }

      &::before {
        transform: rotate(-135deg);
        bottom: 19px;
      }
    `}
`;

export const HamburgerMenu = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: none;
  top: 62px;
  left: 0;
  margin: auto;
  background-color: rgb(18 18 18 /0.95);
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
