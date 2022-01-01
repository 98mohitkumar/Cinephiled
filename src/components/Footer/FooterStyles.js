import styled from "styled-components";
export const FooterWrapper = styled.footer`
  width: 100%;
  height: auto;
  padding: 1rem 4rem;
  border-top: 2px solid;
  border-image-slice: 1;
  border-image-source: ${(props) => `linear-gradient(
    90deg,
    ${props.theme.colors.accent1},
    ${props.theme.colors.accent2},
    ${props.theme.colors.accent3},
    ${props.theme.colors.accent1}
  )`};

  @media only ${(props) => props.theme.breakpoints.ip} {
    padding: 1rem 2.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    gap: 1.25rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 0.75rem;
  }
`;

export const FooterBranding = styled.span`
  font-weight: bold;
  font-size: calc(1.3rem + 0.6vw);
  margin: 0rem 1rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin: 0rem;
  }
`;

export const FooterAttribute = styled.div`
  width: 6rem;
  height: 3rem;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 4.25rem;
    height: 2.5rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 3.5rem;
    height: 1.75rem;
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0rem 5rem;
  margin: 0 1rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin: 0rem;
    gap: 0rem 3rem;
  }
`;

export const SocialIcons = styled.a`
  transition: 0.3s ease-in-out;
  color: #ddd;
  &:hover {
    color: #01b4e4;
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.lg} {
    &:hover {
      color: #ddd;
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    & > svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > svg {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
`;
