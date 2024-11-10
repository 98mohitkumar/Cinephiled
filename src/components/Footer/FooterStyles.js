import { css } from "styled-components";
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
