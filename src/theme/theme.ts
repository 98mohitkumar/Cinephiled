import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config";

import { colors } from "./tokens/colors";
import { borderRadiusTokens, breakpoints, transitionTimings, zIndexTokens } from "./tokens/misc";
import { spacingTokens } from "./tokens/spacings";
import { fontSizeTokens } from "./tokens/typography";
const { theme: tailwindTheme } = resolveConfig(tailwindConfig);

const theme = {
  fontSize: fontSizeTokens,
  spacings: spacingTokens,
  colors,
  breakpoints,
  borderRadius: borderRadiusTokens,
  transitionTimings: transitionTimings,
  zIndex: zIndexTokens,
  fonts: {
    manrope: "var(--manrope)",
    montserrat: "var(--montserrat)"
  }
} as const;

export { tailwindTheme, theme };
