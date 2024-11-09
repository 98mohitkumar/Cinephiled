import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";
import { colors } from "tokens/colors";
import { spacingTokens } from "tokens/spacings";
import { fontSizeTokens } from "tokens/typography";
import { hoverMediaQuery, mediaQuery } from "utils/mixins";

export const avatar = css`
  width: 34px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ $avatar }) =>
      $avatar.type === "tmdb"
        ? `url(https://www.themoviedb.org/t/p/w100_and_h100_face${$avatar.src})`
        : `url(https://api.dicebear.com/6.x/bottts/svg?seed=${$avatar.src})`}
    center center / contain;

  ${mediaQuery({ breakpoint: "sm", type: "max" })} {
    width: 30px;
  }
`;

export const popup = css`
  position: absolute;
  top: 60px;
  min-width: 160px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${hexToRgba(colors.black, 0.8)};
  backdrop-filter: blur(2px);
  border: 1px solid ${colors.neutral[800]};
`;

export const popupOption = css`
  padding: ${spacingTokens.spacing12} ${spacingTokens.spacing20};
  text-align: center;
  white-space: nowrap;
  font-size: ${fontSizeTokens.p};
  transition: all 0.4s ease-in-out;

  ${hoverMediaQuery()} {
    &.logout:hover {
      background-color: ${hexToRgba(colors.red[900], 0.4)};
    }

    &:hover {
      background-color: ${colors.neutral[800]};
    }
  }
`;
