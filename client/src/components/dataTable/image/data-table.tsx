import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import TableSkeleton from "@/components/ui/table-skeleton";
import ImageDataTableToolbar from "../data-table-toolbar";
import DataTableHeader from "../data-table-header";
import { useDeleteManyImagesMutation } from "@/redux/features/image/image.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { DataTablePagination } from "../data-table-pagination";
import {
  setIsLoading,
  setIsOpen,
} from "@/redux/features/modal/alertModal.slice";

interface ImageDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
}

export function ImageDataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: ImageDataTableProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const [deleteManyImage] = useDeleteManyImagesMutation();
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  // delete images
  const onDelete = async (ids: string[]) => {
    dispatch(setIsLoading(true));
    try {
      const res = await deleteManyImage({ ids }).unwrap();
      if (res.success) {
        toast.success("Deleted successfully.", { duration: 2000 });
        // dispatch(onClose());
        dispatch(setIsOpen(false));
        dispatch(setIsLoading(false));
        setRowSelection({});
      }
    } catch (error) {
      toast.error(`Failed to delete.`, { duration: 2000 });

      // dispatch(onClose());
      dispatch(setIsOpen(false));
      dispatch(setIsLoading(false));
    }
  };

  const sortByItems = [
    {
      value: "createdAt",
      label: "Date",
    },
    {
      value: "file_name",
      label: "File name",
    },
    {
      value: "size",
      label: "File size",
    },
  ];

  return (
    <div className="space-y-4">
      <ImageDataTableToolbar sortByItems={sortByItems} />
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} fn={onDelete} />
          {isLoading ? (
            <TableSkeleton columnNo={5} rowNo={10} />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
