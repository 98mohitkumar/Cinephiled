import React, { ComponentPropsWithoutRef, forwardRef, ReactNode, ElementType } from "react";
import { cn, matches } from "utils/helper";

export const LayoutContainer = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("mx-auto w-full px-1664", className)} {...props}>
      {children}
    </div>
  );
});

LayoutContainer.displayName = "LayoutContainer";

// -------- FlexBox -------- //

type FlexBoxProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  tag: ElementType;
  wrap?: "wrap" | "sm" | "max-sm" | "md" | "max-md" | "lg" | "max-lg" | "xl" | "max-xl" | "no-wrap";
};

export const FlexBox = forwardRef<HTMLElement, FlexBoxProps>(({ children, wrap, tag: Tag = "div", className, ...props }, ref) => {
  const Element = Tag as React.ElementType;

  return (
    <Element
      ref={ref}
      className={cn(
        "flex",
        {
          "flex-wrap": matches("wrap", wrap),
          "sm:flex-wrap": matches("sm", wrap),
          "max-sm:flex-wrap": matches("max-sm", wrap),
          "md:flex-wrap": matches("md", wrap),
          "max-md:flex-wrap": matches("max-md", wrap),
          "lg:flex-wrap": matches("lg", wrap),
          "max-lg:flex-wrap": matches("max-lg", wrap),
          "xl:flex-wrap": matches("xl", wrap),
          "max-xl:flex-wrap": matches("max-xl", wrap),
          "2xl:flex-wrap": matches("2xl", wrap),
          "max-2xl:flex-wrap": matches("max-2xl", wrap),
          "flex-nowrap": matches("no-wrap", wrap)
        },
        className
      )}
      {...props}>
      {children}
    </Element>
  );
});

FlexBox.displayName = "FlexBox";

// -------- Grid -------- //
type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | number;

type ColumnCountProp = {
  xxs?: ColCount;
  xs?: ColCount;
  sm?: ColCount;
  md?: ColCount;
  lg?: ColCount;
  xl?: ColCount | string;
  "2xl"?: ColCount | string;
};

type GridProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  tag?: ElementType;
  colConfig?: ColumnCountProp;
};

const getGridCols = ({ xxs, xs, sm, md, lg, xl, "2xl": twoXl }: ColumnCountProp) => {
  const colXxsString = xxs ? `grid-cols-${xxs}` : "";
  const colXsString = xs ? `xs:grid-cols-${xs}` : "";
  const colSmString = sm ? `sm:grid-cols-${sm}` : "";
  const colMdString = md ? `md:grid-cols-${md}` : "";
  const colLgString = lg ? `lg:grid-cols-${lg}` : "";
  const colXlString = xl ? `xl:grid-cols-${xl}` : "";
  const col2xlString = twoXl ? `2xl:grid-cols-${twoXl}` : "";

  return [colXxsString, colXsString, colSmString, colMdString, colLgString, colXlString, col2xlString].join(" ");
};

export const Grid = forwardRef<HTMLElement, GridProps>(({ children, className, colConfig, tag: Tag = "div", ...props }, ref) => {
  const Element = Tag as React.ElementType;

  const colClasses = colConfig ? getGridCols(colConfig) : "grid-cols-12";

  return (
    <Element ref={ref} className={cn("grid gap-1632", colClasses, className)} {...props}>
      {children}
    </Element>
  );
});

Grid.displayName = "Grid";

// -------- GridCol -------- //

type GridColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | number | "full";

type ColSizeConfig = {
  xxs?: GridColSize;
  xs?: GridColSize;
  sm?: GridColSize;
  md?: GridColSize;
  lg?: GridColSize;
  xl?: GridColSize;
  "2xl"?: GridColSize;
};

type GridColProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  tag?: ElementType;
  colSizeConfig?: ColSizeConfig;
};

const getColSpan = ({ xxs, xs, sm, md, lg, xl, "2xl": twoXl }: ColSizeConfig) => {
  const colXxsString = xxs ? `col-span-${xxs}` : "";
  const colXsString = xs ? `xs:col-span-${xs}` : "";
  const colSmString = sm ? `sm:col-span-${sm}` : "";
  const colMdString = md ? `md:col-span-${md}` : "";
  const colLgString = lg ? `lg:col-span-${lg}` : "";
  const colXlString = xl ? `xl:col-span-${xl}` : "";
  const col2xlString = twoXl ? `2xl:col-span-${twoXl}` : "";

  return [colXxsString, colXsString, colSmString, colMdString, colLgString, colXlString, col2xlString].join(" ");
};

export const GridCol = forwardRef<HTMLElement, GridColProps>(({ children, className, colSizeConfig, tag: Tag = "div", ...props }, ref) => {
  const Element = Tag as React.ElementType;

  const colSpanClasses = colSizeConfig ? getColSpan(colSizeConfig) : "col-span-full";

  return (
    <Element ref={ref} className={cn(colSpanClasses, className)} {...props}>
      {children}
    </Element>
  );
});

GridCol.displayName = "GridCol";
