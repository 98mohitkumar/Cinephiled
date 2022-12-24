import styled from 'styled-components';
export const FooterWrapper = styled.footer`
  position: relative;
  width: 100%;
  height: auto;
  padding: 1rem 4.2vw;
  background-color: rgb(18 18 18 /0.95);

  &::after {
    content: '';
    position: absolute;
    top: 0;
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

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1rem 1.25em;
  }
`;

export const FooterBranding = styled.span`
  font-weight: 600;
  font-size: calc(1.1rem + 0.6vw);
  margin: 0rem 1rem 0rem 0rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin: 0rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1.35rem;
  }
`;

export const FooterAttribute = styled.div`
  width: 4.25rem;
  height: 2.15rem;
  background: url('https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg')
    no-repeat center center / contain;

  @media only ${(props) => props.theme.breakpoints.ip} {
    width: 4rem;
    height: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 3rem;
    height: 1.5rem;
  }
`;

export const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0rem 5rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 0rem 3rem;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 0rem 2.5rem;
  }
`;

export const SocialIcons = styled.a`
  display: grid;
  place-items: center;
  transition: 0.3s ease-in-out;
  color: #ddd;
  cursor: pointer;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      color: #01b4e4;
    }
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    & > svg {
      width: 1.75rem;
      height: 1.75rem;
    }
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    & > svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;
