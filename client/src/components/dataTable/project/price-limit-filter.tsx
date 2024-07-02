import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Command, CommandItem } from "@/components/ui/command";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = useState(initialValue);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Price
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandItem className="p-4">
              <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn(
                  "relative flex w-full touch-none select-none mb-6 items-center",
                  className
                )}
                {...props}
              >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
                  <SliderPrimitive.Range className="absolute h-full bg-primary" />
                </SliderPrimitive.Track>
                {localValues.map((value, index) => (
                  <React.Fragment key={index}>
                    <div
                      className="absolute text-center"
                      style={{
                        left: `calc(${
                          ((value - min) / (max - min)) * 100
                        }% + 0px)`,
                        top: `10px`,
                      }}
                    >
                      <span className="text-sm">
                        {formatLabel ? formatLabel(value) : value}
                      </span>
                    </div>
                    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
                  </React.Fragment>
                ))}
              </SliderPrimitive.Root>
            </CommandItem>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
