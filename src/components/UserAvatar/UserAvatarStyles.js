import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";

import { theme } from "theme/theme";
import { getUserAvatar } from "utils/helper";
import { cssClamp, hoverMediaQuery } from "utils/mixins";

export const avatar = css`
  width: ${cssClamp({ minSize: 30, maxSize: 34 })};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: ${({ $avatar }) => `url(${getUserAvatar($avatar)})`} center center / contain;
  cursor: pointer;
`;

export const popup = css`
  position: absolute;
  top: 60px;
  min-width: 160px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${hexToRgba(theme.colors.black, 0.8)};
  backdrop-filter: blur(2px);
  border: 1px solid ${theme.colors.neutral[800]};
`;

export const popupOption = css`
  padding: ${theme.spacings.spacing12} ${theme.spacings.spacing20};
  text-align: center;
  white-space: nowrap;
  font-size: ${theme.fontSize.p};
  transition: all 0.4s ease-in-out;

  ${hoverMediaQuery()} {
    &.logout:hover {
      background-color: ${hexToRgba(theme.colors.red[900], 0.4)};
    }

    &:hover {
      background-color: ${theme.colors.neutral[800]};
    }
  }
`;
