import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  goToNPage,
  goToNextPage,
  goToPrevPage,
  selectLimit,
  selectMeta,
  selectPage,
  setDataLimit,
} from "@/redux/features/filter/filterSlice";
import { cn } from "@/lib/utils";

interface OrderDataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: OrderDataTablePaginationProps<TData>) {
  const dispatch = useAppDispatch();
  const meta = useAppSelector(selectMeta);
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);

  return (
    <div
      className={cn(
        meta?.total !== undefined && meta.total > limit
          ? "flex items-center justify-between px-2"
          : "hidden"
      )}
    >
      <div className="hidden md:flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="hidden md:block text-sm font-medium">Limit</p>
          <Select
            value={limit.toString()}
            onValueChange={(value) => {
              dispatch(setDataLimit(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20, 25, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {meta?.totalPage}
        </div>
        <div className="flex items-center space-x-2">
          {/* go to first page */}
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => dispatch(goToNPage(1))}
            disabled={Number(page) <= 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          {/* go to previous page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => dispatch(goToPrevPage())}
            disabled={Number(page) <= 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* got next page */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => dispatch(goToNextPage())}
            disabled={Number(page) >= Number(meta?.totalPage)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => dispatch(goToNPage(meta?.totalPage))}
            disabled={Number(page) >= Number(meta?.totalPage)}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
