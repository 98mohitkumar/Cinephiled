import hexToRgba from "hex-to-rgba";
import { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp } from "utils/mixins";

export const heroWrapper = css`
  width: 100%;
  height: ${cssClamp({ minSize: 400, maxSize: 500 })};
`;

export const heroSearchWrapper = css`
  width: 100%;
  height: calc(100% + 5px);
  background: ${`linear-gradient(180deg, ${hexToRgba(theme.colors.black, 0.5)} 0%, ${theme.colors.black} 95%)`};
`;
