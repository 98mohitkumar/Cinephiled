import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  position: relative;
  height: 4rem;
  width: 100%;
  padding: 0rem 5rem;
  justify-content: space-evenly;
  align-items: center;
  background: #121212;

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

  a {
    color: white;
    padding: 1rem 2rem;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    &:hover {
      color: ${(props) => props.theme.colors.accent2};
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 3.5rem;
    gap: 0rem 1.75rem;
    font-size: 1.25rem;
    padding: 0rem 3rem;

    & > a {
      padding: 1rem 2rem;
    }
  }
`;
