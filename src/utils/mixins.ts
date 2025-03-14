import { maxViewportWidth, minViewportWidth, pixelsPerRem, breakpoints, transitionTimings } from "../theme/tokens/misc";

type CssClampArgs = {
  minSize: number;
  maxSize: number;
  minViewport?: number;
  maxViewport?: number;
  convertToRem?: boolean;
};

export const rem = (value: number) => value / pixelsPerRem;
export const px = (value: number) => value * pixelsPerRem;

/* 
minSize and maxSize are the values of css properties, can be in px or rem
minViewport and maxViewport are the viewport values, that are defined in rem in tokens

when convertToRem is true, the values are converted to rem while breakpoints are in already in rem, when it's false the viewport values are converted to px
*/

// ---- css clamp ---- //
export const cssClamp = ({
  minSize,
  maxSize,
  minViewport = minViewportWidth,
  maxViewport = maxViewportWidth,
  convertToRem = false
}: CssClampArgs) => {
  const minValue = convertToRem ? rem(minSize) : minSize;
  const maxValue = convertToRem ? rem(maxSize) : maxSize;

  const minViewportValue = convertToRem ? minViewport : px(minViewport);
  const maxViewportValue = convertToRem ? maxViewport : px(maxViewport);

  const slope = (maxValue - minValue) / (maxViewportValue - minViewportValue);
  const yAxisIntersection = minValue - slope * minViewportValue;

  return `clamp(${Math.min(minValue, maxValue)}${convertToRem ? "rem" : "px"}, calc(${yAxisIntersection.toFixed(5)}${convertToRem ? "rem" : "px"} + ${(slope * 100).toFixed(5)}vw), ${Math.max(maxValue, minValue)}${convertToRem ? "rem" : "px"})`;
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
