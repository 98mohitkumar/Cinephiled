import { maxViewportWidth, minViewportWidth, pixelsPerRem, breakpoints, transitionTimings } from "../tokens/misc";

type CssClampArgs = {
  minSize: number;
  maxSize: number;
  minViewport?: number;
  maxViewport?: number;
};

// ---- css clamp ---- //
export const cssClamp = ({ minSize, maxSize, minViewport = minViewportWidth, maxViewport = maxViewportWidth }: CssClampArgs) => {
  // screen sizes in rems
  const minScreenWidth = minViewport / pixelsPerRem;
  const maxScreenWidth = maxViewport / pixelsPerRem;

  // min and max sizes in rems
  const minValue = minSize / pixelsPerRem;
  const maxValue = maxSize / pixelsPerRem;

  // interpolation slope and y-axis intersection
  const slope = (maxValue - minValue) / (maxScreenWidth - minScreenWidth);
  const yAxisIntersection = -minScreenWidth * slope + minValue;

  return `clamp(${minValue}rem, ${yAxisIntersection.toFixed(5)}rem + ${(slope * 100).toFixed(5)}vw, ${maxValue}rem)`;
};

// ---- media queries ---- //
type MediaQueryArgs = {
  breakpoint: keyof typeof breakpoints;
  type: "min" | "max";
};

export const mediaQuery = (
  { breakpoint, type }: MediaQueryArgs = {
    breakpoint: "sm",
    type: "min"
  }
) => {
  return `@media only screen and (${type}-width: ${breakpoints[breakpoint]})`;
};

export const hoverMediaQuery = (
  { canHover }: { canHover?: boolean } = {
    canHover: true
  }
) => {
  if (canHover) {
    return "@media (hover: hover) and (pointer: fine)";
  }

  return "@media not all and (hover: hover), not all and (pointer: fine)";
};

// ---- transitions ---- //
type Transition = {
  property: string;
  duration: number;
  timingFunction?: keyof typeof transitionTimings;
  delay?: number;
};

type TransitionProps = Transition | Array<Transition>;

export const transition = (args: TransitionProps) => {
  if (Array.isArray(args)) {
    return args
      .map(({ property, duration, timingFunction = "out", delay = 0 }) => {
        return `${property} ${duration}s ${transitionTimings[timingFunction]} ${delay}s`;
      })
      .join(", ");
  }

  const { property, duration, timingFunction = "out", delay = 0 } = args;
  return `${property} ${duration}s ${transitionTimings[timingFunction]} ${delay}s`;
};
