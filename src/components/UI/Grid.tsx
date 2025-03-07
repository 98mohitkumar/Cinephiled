import React, { ComponentPropsWithRef, ReactNode, ElementType } from "react";

import { cn } from "utils/helper";

type ColCount =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 16
  | "desktopAutoFillMedia"
  | "watchProviders"
  | "customHeroDetailsGrid"
  | "peopleGrid"
  | "desktopAutoFillMediaBackdrop";

type ColumnCountProp = {
  xxs?: ColCount;
  xs?: ColCount;
  sm?: ColCount;
  md?: ColCount;
  lg?: ColCount;
  xl?: ColCount;
  "2xl"?: ColCount;
  "3xl"?: ColCount;
  "4xl"?: ColCount;
  "5xl"?: ColCount;
};

type GridProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  tag?: ElementType;
  colConfig?: ColumnCountProp;
};

const getGridCols = ({ xxs, xs, sm, md, lg, xl, "2xl": twoXl, "3xl": threeXl, "4xl": fourXl, "5xl": fiveXl }: ColumnCountProp) => {
  const colXxsString = xxs ? `grid-cols-${xxs}` : "";
  const colXsString = xs ? `xs:grid-cols-${xs}` : "";
  const colSmString = sm ? `sm:grid-cols-${sm}` : "";
  const colMdString = md ? `md:grid-cols-${md}` : "";
  const colLgString = lg ? `lg:grid-cols-${lg}` : "";
  const colXlString = xl ? `xl:grid-cols-${xl}` : "";
  const col2xlString = twoXl ? `2xl:grid-cols-${twoXl}` : "";
  const col3xlString = threeXl ? `3xl:grid-cols-${threeXl}` : "";
  const col4xlString = fourXl ? `4xl:grid-cols-${fourXl}` : "";
  const col5xlString = fiveXl ? `5xl:grid-cols-${fiveXl}` : "";
  return [colXxsString, colXsString, colSmString, colMdString, colLgString, colXlString, col2xlString, col3xlString, col4xlString, col5xlString].join(
    " "
  );
};

export const Grid = ({ children, className, colConfig, tag: Tag = "div", ref, ...props }: GridProps) => {
  const Element = Tag as React.ElementType;

  const colClasses = colConfig ? getGridCols(colConfig) : "grid-cols-12";

  return (
    <Element ref={ref} className={cn("grid gap-1632", colClasses, className)} {...props}>
      {children}
    </Element>
  );
};

// -------- GridCol -------- //

type GridColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 16 | "full";

type ColSizeConfig = {
  xxs?: GridColSize;
  xs?: GridColSize;
  sm?: GridColSize;
  md?: GridColSize;
  lg?: GridColSize;
  xl?: GridColSize;
  "2xl"?: GridColSize;
  "3xl"?: GridColSize;
  "4xl"?: GridColSize;
  "5xl"?: GridColSize;
};

type GridColProps = ComponentPropsWithRef<"div"> & {
  children: ReactNode;
  tag?: ElementType;
  colSizeConfig: ColSizeConfig;
};

const getColSpan = ({ xxs, xs, sm, md, lg, xl, "2xl": twoXl, "3xl": threeXl, "4xl": fourXl, "5xl": fiveXl }: ColSizeConfig) => {
  const colXxsString = xxs ? `col-span-${xxs}` : "";
  const colXsString = xs ? `xs:col-span-${xs}` : "";
  const colSmString = sm ? `sm:col-span-${sm}` : "";
  const colMdString = md ? `md:col-span-${md}` : "";
  const colLgString = lg ? `lg:col-span-${lg}` : "";
  const colXlString = xl ? `xl:col-span-${xl}` : "";
  const col2xlString = twoXl ? `2xl:col-span-${twoXl}` : "";
  const col3xlString = threeXl ? `3xl:col-span-${threeXl}` : "";
  const col4xlString = fourXl ? `4xl:col-span-${fourXl}` : "";
  const col5xlString = fiveXl ? `5xl:col-span-${fiveXl}` : "";
  return [colXxsString, colXsString, colSmString, colMdString, colLgString, colXlString, col2xlString, col3xlString, col4xlString, col5xlString].join(
    " "
  );
};

export const GridCol = ({ children, className, colSizeConfig, tag: Tag = "div", ref, ...props }: GridColProps) => {
  const Element = Tag as React.ElementType;

  const colSpanClasses = colSizeConfig ? getColSpan(colSizeConfig) : null;

  return (
    <Element ref={ref} className={cn(colSpanClasses, className)} {...props}>
      {children}
    </Element>
  );
};
