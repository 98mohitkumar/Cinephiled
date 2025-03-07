// These sizings are used in clamp() function, viewport values are in rem
export const minViewportWidth = 30; // 480px
export const maxViewportWidth = 80; // 1280px
export const pixelsPerRem = 16;

// Media querie breakpoints
export const breakpoints = {
  xs: "30rem", // 480px
  "above-xs": "30.0625rem", // 481px
  sm: "40rem", // 640px
  "above-sm": "40.0625rem", // 641px
  md: "48rem", // 768px
  "above-md": "48.0625rem", // 769px
  lg: "64rem", // 1024px
  "above-lg": "64.0625rem", // 1025px
  xl: "80rem", // 1280px
  "above-xl": "80.0625rem", // 1281px
  "2xl": "96rem", // 1536px
  "above-2xl": "96.0625rem", // 1537px
  "3xl": "120rem", // 1920px
  "above-3xl": "120.0625rem", // 1921px
  "4xl": "135rem", // 2160px
  "above-4xl": "135.0625rem", // 2161px
  "5xl": "160rem" // 2560px
} as const;

export const tailwindMaxBreakpoints = Object.fromEntries(Object.entries(breakpoints).map(([key, value]) => [`max-${key}`, { max: value }])) as Record<
  `max-${keyof typeof breakpoints}`,
  { max: string }
>;

// border radius tokens
export const borderRadiusTokens = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px"
} as const;

// css easing tokens
export const transitionTimings = {
  in: "ease-in",
  out: "ease-out",
  "in-out": "ease-in-out",
  snap: "cubic-bezier(0,1,.5,1)",
  linear: "cubic-bezier(0.250, 0.250, 0.750, 0.750)",
  "ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
  "ease-in-cubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
  "ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
  "ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
  "ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
  "ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
  "ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
  "ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
  "ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
  "ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
  "ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
  "ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
  "ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
  "ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
  "ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
  "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
  "ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
  "ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
  "ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
  "ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
  "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
  "ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
} as const;

// z-index tokens
export const zIndexTokens = {
  "0": "0",
  "1": "1",
  "2": "2",
  "5": "5",
  "10": "10",
  "20": "20",
  "30": "30",
  "40": "40",
  "50": "50",
  "60": "60",
  "70": "70",
  "80": "80",
  "90": "90",
  "100": "100",
  modal: "1000",
  auto: "auto"
} as const;
