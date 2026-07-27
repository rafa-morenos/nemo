import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Nemo Field — follows the shadcn/ui Field API (Field, FieldLabel,
 * FieldDescription, FieldError, FieldGroup, FieldSet, FieldLegend,
 * FieldSeparator, FieldContent, FieldTitle). Form-field layout primitives,
 * token-driven with Nemo variables.
 */
const fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
  variants: {
    orientation: {
      vertical: "flex-col [&>*]:w-full",
      horizontal: "flex-row items-center [&>[data-slot=field-label]]:flex-auto",
      responsive:
        "flex-col [&>*]:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>[data-slot=field-label]]:flex-auto",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {}

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
);
Field.displayName = "Field";

const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-6",
        className
      )}
      {...props}
    />
  )
);
FieldGroup.displayName = "FieldGroup";

const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    data-slot="field-set"
    className={cn("flex flex-col gap-3", className)}
    {...props}
  />
));
FieldSet.displayName = "FieldSet";

const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    data-slot="field-legend"
    className={cn("mb-3 text-sm font-medium", className)}
    {...props}
  />
));
FieldLegend.displayName = "FieldLegend";

const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1.5 leading-snug", className)}
      {...props}
    />
  )
);
FieldContent.displayName = "FieldContent";

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="field-label"
    className={cn(
      "flex w-fit items-center gap-2 text-sm font-medium leading-snug text-foreground",
      "has-[[disabled]]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

const FieldTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
);
FieldTitle.displayName = "FieldTitle";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="field-description"
    className={cn(
      "text-sm font-normal leading-normal text-muted-foreground",
      "[&>a]:underline [&>a]:underline-offset-4",
      className
    )}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    errors?: Array<{ message?: string } | undefined>;
  }
>(({ className, children, errors, ...props }, ref) => {
  const content =
    children ??
    (errors && errors.length > 0
      ? errors.length === 1
        ? errors[0]?.message
        : (
            <ul className="ml-4 flex list-disc flex-col gap-1">
              {errors.map((error, index) =>
                error?.message ? <li key={index}>{error.message}</li> : null
              )}
            </ul>
          )
      : null);

  if (!content) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="alert"
      data-slot="field-error"
      className={cn("text-sm font-normal text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
});
FieldError.displayName = "FieldError";

const FieldSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t" aria-hidden />
      {children ? (
        <span className="relative mx-auto block w-fit bg-background px-2">
          {children}
        </span>
      ) : null}
    </div>
  )
);
FieldSeparator.displayName = "FieldSeparator";

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldSeparator,
  FieldContent,
  FieldTitle,
  fieldVariants,
};
