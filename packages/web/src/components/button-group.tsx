import * as React from "react";

import { cn } from "../lib/utils";

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        orientation === "horizontal"
          ? "[&>*]:rounded-none [&>*]:first:rounded-l-md [&>*]:last:rounded-r-md [&>*:not(:first-child)]:-ml-px"
          : "[&>*]:rounded-none [&>*]:first:rounded-t-md [&>*]:last:rounded-b-md [&>*:not(:first-child)]:-mt-px",
        className
      )}
      {...props}
    />
  )
);
ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
