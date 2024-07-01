import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowDownUp, ArrowUp, Check, Circle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Separator } from "../ui/separator";
import { TLabelValuePair } from "@/types";
import { FC } from "react";
import { setOrderBy, setSortBy } from "@/redux/features/filter/filterSlice";
import { useAppDispatch } from "@/redux/hooks";

// form schema
const FormSchema = z.object({
  sortBy: z.string(),
  orderBy: z.string(),
});

type TDataTableSortProps = {
  sortByItems: TLabelValuePair[];
};

const DateTableSort: FC<TDataTableSortProps> = ({ sortByItems }) => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const orders = [
    {
      label: "Asc",
      value: "asc",
      icon: <ArrowUp className="w-3 h-3" />,
    },
    {
      label: "Desc",
      value: "desc",
      icon: <ArrowDown className="w-3 h-3" />,
    },
  ];

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant={"outline"} size={"sm"} role="combobox">
                <ArrowDownUp className="h-3 w-3 shrink-0" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <FormField
                control={form.control}
                name="sortBy"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <p className="pl-2 py-1 text-sm font-semibold">Sort by</p>
                    <CommandGroup>
                      {sortByItems.map((item) => (
                        <CommandItem
                          className="flex items-center gap-2"
                          value={item.label}
                          key={item.value}
                          onSelect={() => {
                            form.setValue("sortBy", item.value);
                            dispatch(setSortBy(item.value));
                          }}
                        >
                          {field.value === item.value ? (
                            <span className="w-3 h-3 border-[3.5px] border-foreground rounded-full" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </FormItem>
                )}
              />

              <Separator />
              <FormField
                control={form.control}
                name="orderBy"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <CommandGroup>
                      {orders.map((item) => (
                        <CommandItem
                          onSelect={() => {
                            form.setValue("orderBy", item.value);
                            dispatch(setOrderBy(item.value));
                          }}
                          className="capitalize flex items-center gap-2 justify-between"
                          value={item.label}
                          key={item.value}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.label}
                          </div>
                          <Check
                            className={cn(
                              "mr-2 h-3 w-3",
                              item.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </FormItem>
                )}
              />
            </Command>
          </PopoverContent>
        </Popover>
      </form>
    </Form>
  );
};

export default DateTableSort;
