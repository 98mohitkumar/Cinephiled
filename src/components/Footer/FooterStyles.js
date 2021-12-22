import styled from "styled-components";
export const FooterWrapper = styled.footer`
  width: 100%;
  height: 6rem;
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
`;

export const FooterAttribute = styled.div`
  width: 6rem;
  height: 3rem;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;
`;

export const SocialIconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 2rem;
`;

export const SocialIcons = styled.a`
  transition: 0.3s ease-in-out;
  color: #ddd;
  &:hover {
    color: #01b4e4;
    cursor: pointer;
  }
`;
