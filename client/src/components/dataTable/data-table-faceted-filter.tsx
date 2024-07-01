/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/hooks";
import { TFilter } from "@/redux/features/filter/filterSlice";

interface DataTableFacetedFilterProps {
  addFilter: ActionCreatorWithPayload<any, string>;
  removeFilter: ActionCreatorWithPayload<any, string>;
  clearFilter: ActionCreatorWithoutPayload;
  title?: string;
  options: TFilter[];
  selectedValues: TFilter[];
}

export function DataTableFacetedFilter({
  title,
  options,
  selectedValues,
  addFilter,
  removeFilter,
  clearFilter,
}: DataTableFacetedFilterProps) {
  //invoked hooks
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) =>
                      selectedValues.find(
                        (value) => value?.value === option.value
                      )
                    )
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues?.find(
                  (value) => value.value === option.value
                );

                return (
                  <CommandItem
                    key={option?.value}
                    onSelect={() => {
                      if (isSelected) {
                        dispatch(removeFilter(isSelected));
                      } else {
                        dispatch(addFilter(option));
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => dispatch(clearFilter())}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
