import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

/** Spinner — loading indicator (shadcn newer API), a spinning Loader icon. */
function Spinner({ className, ...props }: React.HTMLAttributes<SVGSVGElement>) {
  return (
    <Loader2
      role="status"
      aria-label="Carregando"
      className={cn("size-4 animate-spin text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Spinner };
