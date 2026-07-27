import * as React from "react";

import { cn } from "../lib/utils";

/**
 * Interpretation — not a canonical shadcn component.
 *
 * A chat "Bubble" component. A user bubble aligns to the right with
 * primary colors; an assistant bubble aligns to the left with muted colors.
 */
export interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: "user" | "assistant";
}

const Bubble = React.forwardRef<HTMLDivElement, BubbleProps>(
  ({ className, role = "assistant", children, ...props }, ref) => {
    const isUser = role === "user";

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full",
          isUser ? "justify-end" : "justify-start",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "max-w-[80%] px-4 py-2 text-sm",
            isUser
              ? "rounded-2xl bg-primary text-primary-foreground"
              : "rounded-2xl bg-muted text-foreground"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
Bubble.displayName = "Bubble";

export { Bubble };
