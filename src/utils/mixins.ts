import { maxViewportWidth, minViewportWidth, pixelsPerRem, breakpoints, transitionTimings } from "../theme/tokens/misc";

type CssClampArgs = {
  minSize: number;
  maxSize: number;
  minViewport?: number;
  maxViewport?: number;
};

// ---- css clamp ---- //
export const cssClamp = ({ minSize, maxSize, minViewport = minViewportWidth, maxViewport = maxViewportWidth }: CssClampArgs) => {
  const rem = (value: number) => value / pixelsPerRem;

  const minScreenWidth = rem(minViewport);
  const maxScreenWidth = rem(maxViewport);

  const minValue = rem(minSize);
  const maxValue = rem(maxSize);

  const slope = (maxValue - minValue) / (maxScreenWidth - minScreenWidth);
  const yAxisIntersection = minValue - slope * minScreenWidth;

  return `clamp(${Math.min(minValue, maxValue)}rem, calc(${yAxisIntersection.toFixed(5)}rem + ${(slope * 100).toFixed(5)}vw), ${Math.max(maxValue, minValue)}rem)`;
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
