import { cssClamp } from "../../utils/mixins";

const spacings = {
  static: [0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  responsive: [
    { min: 16, max: 20, key: 1620 },
    { min: 16, max: 24, key: 1624 },
    { min: 16, max: 32, key: 1632 },
    { min: 16, max: 40, key: 1640 },
    { min: 16, max: 48, key: 1648 },
    { min: 16, max: 64, key: 1664 },
    { min: 16, max: 80, key: 1680 },
    { min: 16, max: 96, key: 1696 },

    { min: 20, max: 24, key: 2024 },
    { min: 20, max: 32, key: 2032 },
    { min: 20, max: 40, key: 2040 },
    { min: 20, max: 48, key: 2048 },
    { min: 20, max: 64, key: 2064 },
    { min: 20, max: 80, key: 2080 },
    { min: 20, max: 96, key: 2096 },

    { min: 24, max: 32, key: 2432 },
    { min: 24, max: 40, key: 2440 },
    { min: 24, max: 48, key: 2448 },
    { min: 24, max: 64, key: 2464 },
    { min: 24, max: 80, key: 2480 },
    { min: 24, max: 96, key: 2496 },

    { min: 32, max: 40, key: 3240 },
    { min: 32, max: 48, key: 3248 },
    { min: 32, max: 64, key: 3264 },
    { min: 32, max: 80, key: 3280 },
    { min: 32, max: 96, key: 3296 },

    { min: 40, max: 48, key: 4048 },
    { min: 40, max: 64, key: 4064 },
    { min: 40, max: 80, key: 4080 },
    { min: 40, max: 96, key: 4096 },

    { min: 48, max: 64, key: 4864 },
    { min: 48, max: 80, key: 4880 },
    { min: 48, max: 96, key: 4896 },

    { min: 64, max: 80, key: 6480 },
    { min: 64, max: 96, key: 6496 },

    { min: 80, max: 96, key: 8096 }
  ]
} as const;

const staticTokens = Object.fromEntries(spacings.static.map((s) => [s, `${s}px`])) as Record<(typeof spacings.static)[number], string>;

const responsiveTokens = Object.fromEntries(
  spacings.responsive.map(({ min, max }) => [`${min}${max}`, cssClamp({ minSize: min, maxSize: max })])
) as Record<`${(typeof spacings.responsive)[number]["key"]}`, string>;

const tailwindSpacingTokens = {
  ...staticTokens,
  ...responsiveTokens
};

const spacingTokens = Object.fromEntries(Object.entries(tailwindSpacingTokens).map(([key, value]) => [`spacing${key}`, value])) as Record<
  `spacing${keyof typeof tailwindSpacingTokens}`,
  string
>;

export { tailwindSpacingTokens, spacingTokens };
