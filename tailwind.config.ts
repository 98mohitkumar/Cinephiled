import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { colors } from "./src/tokens/colors";
import { borderRadiusTokens, breakpoints, transitionTimings, zIndexTokens } from "./src/tokens/misc";
import { tailwindSpacingTokens } from "./src/tokens/spacings";
import { tailwindFontSizeTokens } from "./src/tokens/typography";

const variants = ["xs", "sm", "md", "lg", "xl", "2xl"];

const config: Config = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    { pattern: /grid-cols-/, variants },
    { pattern: /col-span-/, variants }
  ],
  theme: {
    margin: {
      auto: "auto",
      ...tailwindSpacingTokens
    },
    padding: tailwindSpacingTokens,
    gap: tailwindSpacingTokens,
    fontSize: tailwindFontSizeTokens,
    colors,
    fontFamily: {
      manrope: "var(--manrope)",
      montserrat: "var(--montserrat)"
    },
    borderRadius: borderRadiusTokens,
    screens: breakpoints,
    zIndex: zIndexTokens,
    transitionTimingFunction: transitionTimings,
    extend: {
      gridTemplateColumns: {
        desktopAutoFitMedia: "repeat(auto-fill, minmax(200px, 1fr))",
        watchProviders: "repeat(auto-fill, minmax(min(55px, 20vw), 1fr))"
      },
      aspectRatio: {
        poster: "2/3",
        backdrop: "16/9"
      }
    }
  },
  plugins: [
    // ref: https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-9914554
    plugin(({ addVariant }) => {
      // detect hover
      addVariant("has-hover", "@media (hover: hover) and (pointer: fine)");
      addVariant("no-hover", "@media (hover: none) and (pointer: coarse)");

      // apply hover styles if the device has hover capabilities
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant("group-can-hover", "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }");
    })
  ]
};

export default config;
