import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DatePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          icon={<CalendarIcon className="h-4 w-4" />}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
