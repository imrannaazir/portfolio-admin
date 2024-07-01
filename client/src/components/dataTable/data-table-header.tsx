import { Table, flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { FC, useEffect } from "react";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { cn } from "@/lib/utils";
import {
  setIsOpen,
  setOnConfirm,
} from "@/redux/features/modal/alertModal.slice";

type TDataTableHeaderProps<TData> = {
  table: Table<TData>;
  fn: (arg: string[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableHeader: FC<TDataTableHeaderProps<any>> = ({ table, fn }) => {
  const dispatch = useAppDispatch();
  const selectedRows = table.getSelectedRowModel().rows;
  const isSelected = selectedRows.length ? true : false;
  const idsToDelete = selectedRows.map((item) => item.original._id);

  // handle on open

  const onOpen = () => {
    dispatch(setIsOpen(true));
  };

  useEffect(() => {
    dispatch(setOnConfirm(() => fn(idsToDelete)));
  }, [dispatch, fn, idsToDelete]);

  return (
    <TableHeader className=" ">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="  relative">
          {headerGroup.headers.map((header, i) => {
            return (
              <TableHead
                className={cn(
                  i < 2
                    ? "opacity-100"
                    : isSelected
                    ? "opacity-0"
                    : "opacity-100"
                )}
                key={header.id}
              >
                {isSelected && i === 1 ? (
                  <div
                    className={cn(
                      i === 1 && isSelected ? "opacity-100" : "opacity-0"
                    )}
                  >{`${selectedRows.length} selected`}</div>
                ) : (
                  <div>
                    {" "}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                )}
              </TableHead>
            );
          })}
          <div className={cn(isSelected ? "block" : "hidden")}>
            <div className="absolute top-1.5 right-2">
              {" "}
              <Button
                onClick={onOpen}
                className="py-1"
                variant={"destructive"}
                size={"sm"}
              >
                Delete
              </Button>
            </div>
          </div>
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default DataTableHeader;

/* 


 selectedRows.length ? (
            <TableRow key={headerGroup.id} className="">
              <TableHead key={headerGroup.headers[0].id}>
                {headerGroup.headers[0].isPlaceholder
                  ? null
                  : flexRender(
                      headerGroup.headers[0].column.columnDef.header,
                      headerGroup.headers[0].getContext()
                    )}
              </TableHead>
              <TableHead>{`${selectedRows.length} selected`}</TableHead>
              {columnArr.map((item) => (
                <TableHead key={item}></TableHead>
              ))}
              <TableHead className="text-end">
                <Button
                  onClick={() => dispatch(onOpen(true))}
                  className="py-1"
                  variant={"destructive"}
                  size={"sm"}
                >
                  Delete
                </Button>
              </TableHead>
            </TableRow>
          ) : (*/
