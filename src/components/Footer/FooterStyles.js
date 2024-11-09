import styled, { css } from "styled-components";
import { colors } from "tokens/colors";
import { cssClamp, hoverMediaQuery, transition } from "utils/mixins";

export const footerWrapper = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${`linear-gradient(
    90deg,
    ${colors.accentTertiary},
    ${colors.accentPrimary},
    ${colors.accentSecondary},
    ${colors.accentTertiary}
  )`};
  }
`;

export const FooterAttribute = styled.div`
  width: ${cssClamp({ minSize: 48, maxSize: 64 })};
  aspect-ratio: 100/43;
  background: url("https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg")
    no-repeat center center / contain;
`;

export const footerLink = css`
  display: grid;
  place-items: center;

  ${hoverMediaQuery()} {
    &:hover {
      color: ${colors.accentPrimary};
    }
  }

  .footer-icon {
    transition: ${transition({ property: "color", duration: 0.3, timingFunction: "in-out" })};
    width: ${cssClamp({ minSize: 24, maxSize: 32 })};
    aspect-ratio: 1/1;
  }
`;
