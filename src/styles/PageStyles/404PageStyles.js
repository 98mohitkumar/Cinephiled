import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";

const textGradient = keyframes`
  to {
    filter: hue-rotate(360deg);
    -webkit-filter: hue-rotate(360deg);
  }
`;

export const Error404 = css`
  text-align: center;
  background: ${`linear-gradient(
    90deg,
    ${theme.colors.accentPrimary},
    ${theme.colors.accentSecondary}
  )`};
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textGradient} 4s alternate-reverse linear infinite;
`;
