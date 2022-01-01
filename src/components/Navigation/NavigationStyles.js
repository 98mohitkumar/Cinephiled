import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  height: 4rem;
  width: 100%;
  padding: 0rem 5rem;
  justify-content: space-evenly;
  align-items: center;
  background: #121212;
  border-bottom: 2px solid;
  border-image-slice: 1;
  border-image-source: ${(props) => `linear-gradient(
    90deg,
    ${props.theme.colors.accent1},
    ${props.theme.colors.accent2},
    ${props.theme.colors.accent3},
    ${props.theme.colors.accent1}
  )`};

  a {
    color: white;
    padding: 1rem 2rem;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    &:hover {
      color: ${(props) => props.theme.colors.accent2};
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 0rem 1.75rem;
    font-size: 1.25rem;

    & > a {
      padding: 1rem 2rem;
    }
  }
`;
