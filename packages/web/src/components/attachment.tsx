import * as React from "react";
import { File, X } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button";

/**
 * Interpretation — not a canonical shadcn component.
 *
 * A token-driven "Attachment" chip for representing a file attachment:
 * a rounded bordered row with a file icon, the file name and optional size,
 * and an optional remove button.
 */
export interface AttachmentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: string;
  onRemove?: () => void;
}

const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  ({ className, name, size, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-md border border-border bg-info px-3 py-2 text-sm text-foreground",
          className
        )}
        {...props}
      >
        <File className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="truncate">{name}</span>
          {size ? (
            <span className="shrink-0 text-muted-foreground">{size}</span>
          ) : null}
        </div>
        {onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 rounded-md"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove attachment</span>
          </Button>
        ) : null}
      </div>
    );
  }
);
Attachment.displayName = "Attachment";

export { Attachment };
